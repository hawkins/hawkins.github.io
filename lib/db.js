const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const mongo_user = process.env.MONGO_USER;
const mongo_pass = process.env.MONGO_PASS;

mongoose.connect(
  `mongodb://${mongo_user}:${mongo_pass}@ds141108.mlab.com:41108/hawkins-is`,
  {
    useMongoClient: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500
  }
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

const postSchema = mongoose.Schema({
  id: String,
  title: String,
  date: String,
  link: String,
  summary: String,
  categories: [String]
});

const projectSchema = mongoose.Schema({
  id: Number,
  title: String,
  date: String,
  link: String,
  description: String,
  motive: String,
  learned: String
});

const Post = mongoose.model("posts", postSchema);
const Project = mongoose.model("projects", projectSchema);

module.exports = {
  db,
  Post,
  Project
};
