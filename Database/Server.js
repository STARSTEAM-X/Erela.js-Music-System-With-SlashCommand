const mongoose = require("mongoose");

const Server = new mongoose.Schema({
    guildname: String,
    guildid: String,
    guildicon: String,
    memberCount: String,
    ownerId: String,
    CreatedAt: {
        type: String,
        default: ''
    },
    UpdatedAt: {
        type: String,
        default: ''
    }
});
module.exports = mongoose.model("Server", Server);