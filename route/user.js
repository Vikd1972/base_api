const express = require("express");
const Sequelize = require("sequelize");
const router = express.Router();

const User = require("../model/user");


router.post("/search", (req, res) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (user === null) {
      return res.status(400).send({
        message: "User not found.",
      });
    } else {
      return res.status(201).send({
        message: "User found",
      });
    }
  });
});


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

router.post("/edit", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const usern = req.body.fullname;
  const usere = req.body.email;
  const userd = req.body.dob;

  User.findOne({ email: req.body.oldemail }, function (err, user) {
    if (user === null) {
      return res.status(400).send({
        message: "User not found.",
      });
    } else {
      userid = user.id;
    }
  });

  User.update(
    { fullname: usern, email: usere, dob: userd },
    { where: { id: userid } }
  )
    .then(() => {
      res.redirect("/users");
    })
    .catch((err) => console.log(err));
});


router.post("/delete", (req, res) => {
  const usere = req.body.email;
  User.destroy({ where: { email: usere } })
    .then(() => {
      res.redirect("/users");
    })
    .catch((err) => console.log(err));
});


router.post("/users", (req, res) => {
  User.findAll({ raw: true })
    .then((users) => {
      console.log(users);
    })
    .catch((err) => console.log(err));
});

module.exports = router;