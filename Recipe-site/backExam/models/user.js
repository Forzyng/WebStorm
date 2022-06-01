const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// установка схемы
const user = new Schema({
    //id: {
    //    type: Schema.Types.ObjectId,
    //    required: true,
    //},
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String
    },
    login: {
        type: String,
        required: true,
    },
    description: String,
    isVerify: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: '/default_avatar.webp'
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Users", user)