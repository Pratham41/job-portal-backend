const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
require("./config/db");
const path = require("path");
const userRoute = require("./routes/user");
const jobRoute = require("./routes/job");
const uploadRoute = require("./routes/upload");


const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/apply", uploadRoute);


let port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
