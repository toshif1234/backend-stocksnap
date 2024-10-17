const express = require('express');
const router = express.Router();
const userService = require('./login.service');


router.post('/', checkLogin);

module.exports = router;

// route functions
function checkLogin(req, res, next) {   
    // console.log(req.body);
    userService.checkLogin(req.body)   
    .then(user => res.json(user))   
    .catch(next);   
  }
  