const express = require("express");
const crypto = require("crypto");
const router = express.Router();

const User = require("../model/user");

router.put("/", (req, res) => {
  const useremail = req.body.email;
  User.findOne({ where: { email: useremail } })
    .then((user) => {
      res.json(user);
      return;
    })
    .catch((err) => console.log(err));
});

module.exports = router;
