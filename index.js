require("dotenv").config();
const express = require("express");
const path = require("path");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const apiRouter = require("./routers/apiRouter");
const clientRouter = require("./routers/clientRouter");
const PORT = process.argv[2] === '8888' ? 8888 : 3000;
const link = `http://localhost:${PORT}/`;

const url = `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@userauth.srq6zlv.mongodb.net/UserAuth?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", apiRouter);
app.use(compression());
app.use(express.static(path.join(process.cwd(), "public")));
app.use("/", clientRouter);

const start = async () => {
  try {
    await mongoose
      .connect(url, { dbName: "Auth" })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
start();

app.listen(3000, () => {
  console.log('\x1b[36m%s\x1b[0m', '\nExpress server has been started at the port ', PORT);
  console.log(`\n    Link to the site \x1b[35m${link}\x1b[0m`);
});
