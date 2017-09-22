const axios = require('axios');


const baseUri = 'https://congress.api.sunlightfoundation.com';

function filterRep(reps) {
  return reps.map((rep) => {
    return {
      zip: this.zip,
      id: rep.bioguide_id,
      chamber: rep.chamber,
      fullName: `${rep.title} ${rep.first_name} ${rep.last_name}`,
      party: rep.party,
      phone: rep.phone,
      state: rep.state_name,
      img: `https://theunitedstates.io/images/congress/225x275/${rep.bioguide_id}.jpg`
    }
  })
}


class Congress {
  constructor(zip) {
    this.zip = zip;
  }

  getLegislators() {
    return axios.get(`${baseUri}/legislators/locate?zip=${this.zip}`)
      .then((res) => {
        const reps = res.data.results;

        const newReps = filterRep(reps);

        return newReps;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getProfile(id) {
    return axios.get(`${baseUri}/legislators?bioguide_id=${id}`)
      .then((res) => {
        const data = res.data.results;
        const newData = filterRep(data);

        return newData;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getBills(id) {
    return axios.get(`${baseUri}/votes?fields=bill,voter_ids&vote_type=passage&order=voted_at&voter_ids.${id}__exists=true`)
      .then((res) => {
        const data = res.data.results;
        const firstFiveBills = data.slice(0,5);

        return firstFiveBills;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getMemberDetails(id) {
    return axios.all([this.getProfile(id), this.getBills(id)])
      .then((res) => {
        return {
          profile: res[0],
          bills: res[1],
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
}




module.exports = Congress;
