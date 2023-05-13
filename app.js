const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");

const postRouter = require('./routes/postRoutes');

const app = express();

const MongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(MongoURL, {
    })
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h2>Welcome!!2</h2>");
});


app.use("api/v1/posts", postRouter)
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
