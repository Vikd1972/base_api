const Sequelize = require("sequelize");
const express = require("express");
const app = express();

app.use(express.json());

const userCreate = require("./route/userCreate");
app.use("/api/user/create", userCreate);
const userDelete = require("./route/userDelete");
app.use("/api/user/delete", userDelete);
const userSearch = require("./route/userSearch");
app.use("/api/user/search", userSearch);
const userEdit = require("./route/userEdit");
app.use("/api/user/edit", userEdit);
const userLogin = require("./route/userLogin");
app.use("/api/user/login", userLogin);
const user = require("./route/user");
app.use("/api/user", user);

const sequelize = new Sequelize("user2db", "user2", "root1234", {
  dialect: "postgres",
  host: "localhost",
  define: {
    timestamps: false,
  },
});

sequelize
  .sync()
  .then(() => {
    app.listen(3000, function () {
      console.log("Server waiting for connection...");
    });
  })
  .catch((err) => console.log(err));

  