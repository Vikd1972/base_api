const express = require("express");
const crypto = require("crypto");
const router = express.Router();

const User = require("../model/user");

router.delete("/", (req, res) => {
  User.destroy({ where: { email: req.body.email } })
    .then(() => {
      res.send("user deleted");
      return;
    })
    .catch((err) => console.log(err));
});

module.exports = router;
