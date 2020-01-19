const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LabelSchema = new Schema({
    labelName:{
        type: String,
        isRequired: true
    }
});

module.exports = Label = mongoose.model('labels',LabelSchema);