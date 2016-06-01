var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var hiveSchema = new mongoose.Schema({
    regNo: { type: String, required: true, unique: true },
    queenYear: String,
    location: String,
    inspections: [{ type: ObjectId, ref: 'Inspection' }],
    extractions: [{ type: ObjectId, ref: 'Extraction' }],
    isDeleted: Boolean,
    note: String
});

mongoose.model('Hive', hiveSchema);