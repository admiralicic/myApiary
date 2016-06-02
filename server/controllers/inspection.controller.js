var mongoose = require('mongoose');

var Hive = mongoose.model('Hive');
var Inspection = mongoose.model('Inspection');

module.exports.create = function (req, res) {
    var hive = req.hive;

    var newInspection = new Inspection({
        date: req.body.date,
        description: req.body.description,
        type: req.body.type,
        broodFrames: req.body.broodFrames,
        foodFrames: req.body.foodFrames,
        pollenFrames: req.body.pollenFrames,
        hive: hive._id
    });

    newInspection.save(function (err, inspection) {
        if (err) {
            return res.status(400).json(err);
        }

        //  Hive.findById(hive.id, function (err, hive) {
        hive.inspections.push(inspection._id);
        hive.save(function (err, hive) {
            if (err) {
                return res.status(400).json(err);
            }
            res.status(200).json(inspection);
        });

        // });    
    });
};

module.exports.list = function (req, res) {
    var hive = req.hive;
    // res.status(200).json(hive.inspections);

    Inspection.find({ hive: hive._id, isDeleted: false }, function (err, inspections) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.status(200).json(inspections);
    });
};

module.exports.read = function (req, res) {
    Inspection.findById(req.params.inspectionId)
        .populate('hive')
        .exec(function (err, inspection) {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            res.status(200).json(inspection);
        });
};

module.exports.update = function (req, res) {
    Inspection.findById(req.params.inspectionId, function (err, inspection) {

        if (err) {
            return res.status(400).json({ message: err.message });
        }

        inspection.date = req.body.date;
        inspection.description = req.body.description;
        inspection.type = req.body.type;
        inspection.broodFrames = req.body.broodFrames;
        inspection.foodFrames = req.body.foodFrames;
        inspection.pollenFrames = req.body.pollenFrames;

        res.status(200).json(inspection);
    });
};

module.exports.delete = function (req, res) {

    Inspection.findById(req.params.inspectionId, function (err, inspection) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        inspection.isDeleted = true;
        inspection.save(function (err, inspection) {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            res.status(200).json(inspection);
        });
    });
};

