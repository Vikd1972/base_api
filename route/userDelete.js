const express = require("express");
const router = express.Router();

const middleware = require("../middleware/middleware");

const User = require("../model/user");

router.delete("/", middleware.checkToken, (req, res) => {
  User.destroy({ where: { email: req.body.email } })
    .then(() => {
      res.send("user deleted");
      return;
    })
    .catch((err) => console.log(err));
});

module.exports = router;
