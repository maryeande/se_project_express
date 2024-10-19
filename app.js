const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/users");
const routes = require("./routes");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());
app.use(routes);
app.use("/", indexRouter);
app.use((req, res, next) => {
  req.user = {
    _id: "66f834a444b70efb67967b89",
  };
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
