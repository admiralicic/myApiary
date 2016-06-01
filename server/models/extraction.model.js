var mongoose = require('mongoose');

var extractionSchema = new mongoose.Schema({
    date: { type: String, required: true },
    type: { type: String, required: true },
    quantity: { type: Number, required: true },
    note: {type: String }
});

mongoose.model('Extraction', extractionSchema);