const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");

const app = express();

// const MongoURL =

const connectWithRetry = () => {
  mongoose
    .connect(
      "mongodb+srv://jayabrata:<12345>@cluster0.essrb2c.mongodb.net/@172.22.0.2/?authSource=admin", //2:10:20
      {
        useNewUrlParams: true,
        UseUnifiedTopology: true,
        useFindAndModify: false,
      }
    )
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
  //.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@{MONGO_IP}:${MONGO_PORT}/?authSource=admin`);
};

connectWithRetry();

app.get("/", (req, res) => {
  res.send("<h2>Welcome!!2</h2>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
