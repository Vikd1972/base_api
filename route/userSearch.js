const express = require("express");
const router = express.Router();

const middleware = require("../middleware/middleware");

const  db  = require("../models");
const { User } = db;

router.put("/", middleware.checkToken, (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      res.json(user);
      return;
    })
    .catch((err) => console.log(err));
});

module.exports = router;
