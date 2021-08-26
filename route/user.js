//const { response } = require("express");
const express = require("express");
const router = express.Router();

const User = require("../model/user");

router.post("/create", (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const { fullname, email, dob } = req.body;

  User.create({ fullname, email, dob })
    .then((user) => {
      res.send("user added");
      return;
    })
    .catch((err) => console.log(err));
});

router.delete("/delete", (req, res) => {
  User.destroy({ where: { email: req.body.email } })
    .then(() => {
      res.send("user deleted");
      return;
    })
    .catch((err) => console.log(err));
});

router.put("/search", (req, res) => {
  const useremail = req.body.email;
  User.findOne({ where: { email: useremail } })
    .then((user) => {
      res.json(user);
      return;
    })
    .catch((err) => console.log(err));
});

router.post("/edit", (req, res) => {
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

router.get("/", (req, res) => {
  User.findAll({ raw: true })
    .then((users) => {
      res.json(users);
      return;
    })
    .catch((err) => console.log(err));
});

module.exports = router;
