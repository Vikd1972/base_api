const Sequelize = require("sequelize");
const express = require("express");
const app = express();

app.use(express.json());

const user = require("./route/user");

const sequelize = new Sequelize("user2db", "user2", "root1234", {
  dialect: "postgres",
  host: "localhost",
  define: {
    timestamps: false,
  },
});

app.use("/api/user", user);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, function () {
      console.log("Сервер ожидает подключения...");
    });
  })
  .catch((err) => console.log(err));

  