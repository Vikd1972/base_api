const Sequelize = require("sequelize");
const express = require("express");
const app = express();

app.use(express.json());

const userCreate = require("./route/userCreate");
const userDelete = require("./route/userDelete");
const userSearch = require("./route/userSearch");
const userEdit = require("./route/userEdit");
const user = require("./route/user");

const sequelize = new Sequelize("user2db", "user2", "root1234", {
  dialect: "postgres",
  host: "localhost",
  define: {
    timestamps: false,
  },
});
app.use("/api/user/create", userCreate);
app.use("/api/user/delete", userDelete);
app.use("/api/user/search", userSearch);
app.use("/api/user/edit", userEdit);
app.use("/api/user", user);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, function () {
      console.log("Server waiting for connection...");
    });
  })
  .catch((err) => console.log(err));

  