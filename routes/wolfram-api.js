const express = require('express');
const config = require('../config');
const router = express.Router();

router.post(`/`, (req, res) => {
  const WolframAlphaAPI = require('wolfram-alpha-api');
  const waApi = WolframAlphaAPI(config.apiKey);

  const userquery = req.body;
  console.log(userquery);

  waApi
    .getSpoken(userquery)
    .then(answer => {
      res.send(answer);
      console.log(answer);
    })
    .catch(error => {
      console.log(error);
      return waApi.getSimple(userquery)
        .then(url => {
          res.send(url);
          console.log(url);
        })
        .catch(error => {
          console.log(error);
          res.send(`Sorry, I don't understand what you said.`);
        });
    });
});
module.exports = router;