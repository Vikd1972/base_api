const express = require("express");
const router = express.Router();

const middleware = require("../middleware/middleware");
const db = require("../models");
const { User } = db;

router.post("/", middleware.checkToken, (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const oldUserEmail = req.body.oldemail;
  const { fullname, email, dob } = req.body;

  User.findOne({ where: { email: oldUserEmail } })
    .then((user) => {
      res.send("user changed");
      return User.update({ fullname, email, dob }, { where: { id: user.id } });
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
