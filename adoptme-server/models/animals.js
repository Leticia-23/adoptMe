const { model, Schema } = require("mongoose");
const User = require("./users");
const Institution = require("./institutions");

const Animal = new Schema(
  {
    animal_name: String,
    specie: String,
    breed: String,
    sex: {
      type: String,
      enum: ["Male", "Female"],
    },
    bornDate: Date,
    size: String,
    color: String,
    photo: String,
    danger: Boolean,
    sterile: Boolean,
    description: String,
    adopted: {
      type: Boolean,
      required: true,
      default: false,
    },
    adoptionDate: Date,
    institution: {
      type: Schema.Types.ObjectId,
      ref: Institution,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    enabled: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt properties
);

module.exports = model("Animals", Animal);
