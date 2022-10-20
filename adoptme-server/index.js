const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());

const routes = require("./routes");

// Use mongoose and the .env file to connect to the database.
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db Connected"));

// API Routes
app.use("/api", routes);

app.all("*", (req, res) => {
  res
    .status(404)
    .json({ error: `The method ${req.method} ${req.url} is not defined.` });
});

// Server on
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
