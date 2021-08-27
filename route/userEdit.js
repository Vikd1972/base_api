const express = require("express");
const crypto = require("crypto");
const router = express.Router();

const User = require("../model/user");

router.post("/", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const olduseremail = req.body.oldemail;
  const userfullname = req.body.fullname;
  const useremail = req.body.email;
  const userdob = req.body.dob;
  let userid = null;

  User.findOne({ where: { email: olduseremail } })
    .then((user) => {
      res.send("user changed");
      userid = user.id;
      User.update(
        { fullname: userfullname, email: useremail, dob: userdob },
        { where: { id: userid } }
      ).then((res) => {
        console.log(res);
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
