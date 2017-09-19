const axios = require('axios');


const baseUri = 'https://congress.api.sunlightfoundation.com';


class Congress {
  constructor(zip) {
    this.zip = zip;
  }

  getLegislators() {
    return axios.get(`${baseUri}/legislators/locate?zip=${this.zip}`)
      .then((res) => {
        const reps = res.data.results;

        const newReps = reps.map((rep) => {
          return {
            zip: this.zip,
            id: rep.bioguide_id,
            chamber: rep.chamber,
            fullName: `${rep.title} ${rep.first_name} ${rep.last_name}`,
            party: rep.party,
            phone: rep.phone,
            state: rep.state,
          }
        })

        return newReps;
      })
      .catch((err) => {
        console.log(err);
      })
  }
}




module.exports = Congress;
