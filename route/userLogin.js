const express = require("express");
const crypto = require("crypto");
const router = express.Router();

const User = require("../model/user");

const secretWord = "SeCrEdWoRd";
  
router.post("/", (req, res) => {
  const userFullName = req.body.fullname;
  const userPassword = req.body.password;

  User.findOne({ where: { fullname: userFullName } })
    .then((user) => {
      const userHash = crypto
        .pbkdf2Sync(userPassword, user.email, 1000, 64, `sha512`)
        .toString(`hex`);
      if (user.hash === userHash) {
        const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "jwt" })).toString("base64");
        const payload = Buffer.from(JSON.stringify(user.email)).toString("base64");
        const signature = crypto.createHmac("SHA256", secretWord).update(`${header}.${payload}`).digest("base64");
        const token = `${header}.${payload}.${signature}`;
        res.json(token);
      } else {
        res.send("wrong password");
      }
    })
    .catch((err) => res.send("user not found"));
});

module.exports = router;
