const express = require("express");
const router = express.Router();

const middleware = require("../middleware/middleware");

const User = require("../model/user");

router.post("/", middleware.checkToken, (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const oldUserEmail = req.body.oldemail;
  const { fullname, email, dob } = req.body;
  let userid = null;

  User.findOne({ where: { email: oldUserEmail } })
    .then((user) => {
      res.send("user changed");
      userid = user.id;
      User.update(
        { fullname, email, dob },
        { where: { id: userid } }
      ).then((res) => {
        console.log(res);
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
