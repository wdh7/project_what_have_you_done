const express = require('express');
const router = express.Router();
const Congress = require('../api/api.js');


router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const congress = new Congress();

  congress.getMemberDetails(id)
    .then((data) => {
      res.render('profile', {
        profile: data.profile[0],
        bills: data.bills,
      });
    })
    .catch((err) => {
      console.log(err);
    })
});


module.exports = router;
