//const { response } = require("express");
const express = require("express");
const crypto = require("crypto");
const router = express.Router();

const User = require("../model/user");

router.get("/", (req, res) => {
  User.findAll({ raw: true })
    .then((users) => {
      res.json(users);
      return;
    })
    .catch((err) => console.log(err));
});

module.exports = router;
