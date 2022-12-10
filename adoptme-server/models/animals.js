const { model, Schema } = require("mongoose");
const User = require("./users");
const Institution = require("./institutions");

const Animal = new Schema(
  {
    animal_name: {
      type: String,
      required: true,
    },
    specie: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    bornDate: {
      type: Date,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    photo: {
      type: String,
      default: "",
    },
    danger: {
      type: Boolean,
      default: false,
    },
    sterile: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
      default: "",
    },
    adopted: {
      type: Boolean,
      required: true,
      default: false,
    },
    adoptionDate: {
      type: Date,
      default: "",
    },
    institution: {
      type: Schema.Types.ObjectId,
      ref: Institution,
      required: true,
    },
    /* user: {
      type: Schema.Types.ObjectId,
      ref: User,
      default: null,
    }, */
    enabled: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt properties
);

module.exports = model("Animals", Animal);
