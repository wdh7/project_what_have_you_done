const axios = require('axios');


const baseUri = 'https://congress.api.sunlightfoundation.com';


class Congress {
  constructor(zip) {
    this.zip = zip;
  }

  getLegislators() {
    axios.get(`${baseUri}/legislators/locate?zip=${this.zip}`)
      .then((res) => {
        console.log(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}




module.exports = Congress;
