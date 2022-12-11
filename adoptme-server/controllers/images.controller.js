/* MongoDB */

/* const mongoose = require("mongoose");

const Grid = require("gridfs-stream");

const imageHelper = require("../helpers/images.helper");

let gfs;

const conn = mongoose.connection;
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
});
 */

/* Imgbb */
const imgbbUploader = require("imgbb-uploader");

require("dotenv").config({ path: "./config.env" });
const apiKey = process.env.IMGBB_KEY;

const uploadImage = async (req, res) => {
  const file = req.file;

  imgbbUploader(apiKey, file.path)
    .then((response) => {
      return res.status(201).json(response);
    })
    .catch((error) => {
      return res.status(500).json({ error: error });
    });
};

module.exports = { uploadImage };
