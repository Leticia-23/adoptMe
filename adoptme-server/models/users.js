const { model, Schema } = require("mongoose");

const User = new Schema(
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
    biography: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
      required: true,
    },
    enabled: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt properties
);

module.exports = model("User", User);
