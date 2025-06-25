const mongoose = require('mongoose')

const Chat_Schema = mongoose.Schema({
    userA: {
        _id: {type: String, required: true},
        name: {type: String, required: true},
        checked: {type: Boolean, required: true}
    },
    userB: {
        _id: {type: String, required: true},
        name: {type: String, required: true},
        checked: {type: Boolean, required: true}
    },
    messages: [{
        sender: {type: String, required: true},
        text: {type: String, required: true},
        sentWhen: {type: Date, default: Date.now}
    }],
    lastUpdated: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Chat', Chat_Schema)