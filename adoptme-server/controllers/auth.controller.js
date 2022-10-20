const mongoose = require("mongoose");

const signup = async (req, res) => {
    return res.status(201).json("Account created correctly")
}

module.exports = {signup}