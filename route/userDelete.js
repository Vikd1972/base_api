const express = require("express");
const router = express.Router();

const middleware = require("../middleware/middleware");

const db  = require("../models");
const { User } = db;

router.delete("/", (req, res) => {
  User.destroy({ where: { email: req.body.email } })
    .then(() => {
      res.send("user deleted");
      return;
    })
    .catch((err) => console.log(err));
});

module.exports = router;
