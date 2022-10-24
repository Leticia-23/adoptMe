const { model, Schema } = require("mongoose");
const User = require("./users");
const Institution = require("./institutions");

const Animal = new Schema({
  _id: String,
  id: Number,
  name: String,
  specie: String,
  breed: String,
  sex: {
    type: String,
    enum: ["Macho", "Hembra"],
  },
  bornDate: Date,
  size: String,
  color: String,
  photo: String,
  danger: Boolean,
  sterile: Boolean,
  adopted: Boolean,
  adoptionDate: Date,
  institution: {
    type: Schema.Types.ObjectId,
    ref: Institution,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
  description: String,

  registered_date: {
    type: Date,
    default: new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
  },
});

module.exports = model("Animals", Animal);
