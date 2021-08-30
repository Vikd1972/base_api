const express = require("express");
const router = express.Router();

const middleware = require("../middleware/middleware");

const User = require("../model/user");

router.use("/", (req, res) => {
  User.findAll({ raw: true })
    .then((users) => {
      console.log(users)
        res.json(users);
      return;
    })
    .catch((err) => console.log(err));
});

module.exports = router;
