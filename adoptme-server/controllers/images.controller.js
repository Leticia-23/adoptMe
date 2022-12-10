const mongoose = require("mongoose");

const Grid = require("gridfs-stream");

const imageHelper = require("../helpers/images.helper");

let gfs;

const conn = mongoose.connection;
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
});
