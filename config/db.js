const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on("error", (err) => {
  console.log(err);
  process.exit(1);
});

connection.on("connected", () =>
  console.log("Mongo DB Connection Successfull")
);
