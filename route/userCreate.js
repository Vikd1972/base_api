const express = require("express");
const crypto = require("crypto");
const router = express.Router();

const User = require("../model/user");

router.post("/", (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const { fullname, email, dob } = req.body;
  const password = req.body.password;
  const userHash = crypto
    .pbkdf2Sync(password, email, 1000, 64, `sha512`)
    .toString(`hex`);
  

  User.create({
    fullname,
    email,
    dob,
    hash: userHash,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
    .then((user) => {
      res.send("user added");
      return;
    })
    .catch((err) => console.log(err));
});

module.exports = router;
