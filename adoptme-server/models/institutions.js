const { model, Schema } = require("mongoose");

const Institution = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      inmutable: true,
    },
    password: {
      type: String,
    },
    web_URL: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    information: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    enabled: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt properties
);

module.exports = model("Insitution", Institution);
