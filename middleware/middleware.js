const crypto = require("crypto");

const User = require("../model/user");
const secretWord = "SeCrEdWoRd";

exports.checkToken = (req, res, next) => {
  User.findOne({ where: { fullname: "Admin" } })
    .then((user) => {
     
      const header = Buffer.from(
        JSON.stringify({ alg: "HS256", typ: "jwt" })
      ).toString("base64");
      const payload = Buffer.from(JSON.stringify(user.email)).toString(
        "base64"
      );
      const signature = crypto
        .createHmac("SHA256", secretWord)
        .update(`${header}.${payload}`)
        .digest("base64");
      const token = `${header}.${payload}.${signature}`;
      if (token === req.headers.authorization.split(" ")[1]) {
        return next();
      } else {
        res.send("authentication error");
      }
    })
    .catch((err) => res.send("authentication error"));
};
