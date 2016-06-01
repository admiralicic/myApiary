var mongoose = require('mongoose');

var inspectionSchema = new mongoose.Schema({
    date: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    broodFrames: { type: Number },
    foodFrames: { type: Number },
    pollenFrames: { type: Number },
    hive: { type: mongoose.Schema.Types.ObjectId, ref: 'Hive'},
    isDeleted: { type: Boolean, default: false }
});

mongoose.model('Inspection', inspectionSchema);