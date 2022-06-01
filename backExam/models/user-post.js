const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// установка схемы
const userPost = new Schema({
    //id: {
    //    type: Schema.Types.ObjectId,
    //    ref: "Users",
    //    required: true,
    //},
    userID: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    description: String,
    photo: String,
    ingredients: {
        type: String,
        required: true,
    },
    steps: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: Date
});

module.exports = mongoose.model("userPosts", userPost)