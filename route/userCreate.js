const express = require("express");
const crypto = require("crypto");
const router = express.Router();

const User = require("../model/user");

router.post("/", (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const userFullName = req.body.fullname;
  const userEmail = req.body.email;
  const userDob = req.body.dob;
  const password = req.body.password;
  let userToken = "";

  const useToken = () => {
    const header = Buffer.from(
        JSON.stringify({ alg: 'HS256', typ: 'jwt' })
      ).toString('base64');
    const payload = Buffer.from(JSON.stringify(userEmail)).toString(
        'base64'
      );
    const signature = crypto
      .createHmac("SHA256", password)
      .update(`${header}.${payload}`)
      .digest("base64");
    userToken = `${header}.${payload}.${signature}`;
  };
  useToken();

  User.create({
    fullname: userFullName,
    email: userEmail,
    dob: userDob,
    token: userToken,
  })
    .then((user) => {
      res.send("user added");
      return;
    })
    .catch((err) => console.log(err));
});

module.exports = router;
