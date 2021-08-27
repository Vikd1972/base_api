const express = require("express");
const router = express.Router();

const middleware = require("../middleware/middleware");

const User = require("../model/user");

router.use("/", middleware.checkToken, (req, res) => {
  User.findAll({ raw: true })
    .then((users) => {
      res.json(users);
      return;
    })
    .catch((err) => console.log(err));
});

module.exports = router;
