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
  console.log("req: ", req);
  const file = req.file;
  console.log("file: ", file);

  console.log("api_key: ", apiKey);

  imgbbUploader(apiKey, file.path)
    .then((response) => {
      console.log(response);
      return res.status(201).json(response);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error: error });
    });
};

module.exports = { uploadImage };
