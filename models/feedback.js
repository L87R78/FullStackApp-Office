const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedBackSchema= new Schema ({
    user: {
        type: String,
    },
    feedback: {
        type: String,
    }
}, {
    timesTamps: true,
})

const feedBack = mongoose.model('feedback', feedBackSchema);
module.exports = feedBack;