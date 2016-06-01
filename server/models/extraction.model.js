var mongoose = require('mongoose');

var extractionSchema = new mongoose.Schema({
    date: { type: String, required: true },
    type: { type: String, required: true },
    quantity: { type: Number, required: true },
    note: {type: String },
    isDeleted: { type: Boolean, default: false }
});

mongoose.model('Extraction', extractionSchema);