const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const token = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
});

const Token = mongoose.model("token", token);

module.exports = Token;