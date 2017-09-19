const express = require('express');
const router = express.Router();
const Congress = require('../api/api.js');


function filterCongress(reps) {
  const congress = {
    house: [],
    senate: [],
  };

  reps.forEach((rep) => {
    (rep.chamber === 'house') ? congress.house.push(rep) : congress.senate.push(rep)
  });

  return congress;
}



router.get('/:zip', (req, res, next) => {
  const zip = req.params.zip;
  const congress = new Congress(zip);

  congress.getLegislators()
    .then((reps) => {
      const filteredCongress = filterCongress(reps);

      res.render('legislators', {
        zip: zip,
        house: filteredCongress.house,
        senate: filteredCongress.senate,
      });
    })
    .catch((err) => {
      console.log(err);
    })

});



module.exports = router;
