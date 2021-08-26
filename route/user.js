const { response } = require("express");
const express = require("express");
//const Sequelize = require("sequelize");
const router = express.Router();

const User = require("../model/user");

router.post("/create", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const usern = req.body.fullname;
  const usere = req.body.email;
  const userd = req.body.dob;

  User.create({ fullname: usern, email: usere, dob: userd })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

router.delete("/delete", (req, res) => {
  const usere = req.body.email;
  User.destroy({ where: { email: usere } })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

router.put("/search", (req, res) => {
  const usere = req.body.email;
  User.findOne({ where: { email: usere } })
    .then((user) => {
      if (!user) return;
    })
    .catch((err) => console.log(err));
});

router.post("/edit", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const oldusere = req.body.oldemail;
  const usern = req.body.fullname;
  const usere = req.body.email;
  const userd = req.body.dob;
  let userid = null;

  User.findOne({ where: { email: oldusere } })
    .then((user) => {
      if (!user) return;
      userid = user.id;
      User.update(
        { fullname: usern, email: usere, dob: userd },
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
      console.log(users);
      return;
    })
    .catch((err) => console.log(err));
});

module.exports = router;
