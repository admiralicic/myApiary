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
    res.status(200).json(hive.inspections);
};

module.exports.read = function (req, res) {
    var hive = req.hive;
    res.status(200).json(hive.inspections.id(req.params.inspectionId));
};

module.exports.update = function (req, res) {
    var hive = req.hive;
    var inspection = hive.inspections.id(req.params.inspectionId);
    
    inspection.date = req.body.date;
    inspection.description = req.body.description;
    inspection.type = req.body.type;
    inspection.broodFrames = req.body.broodFrames;
    inspection.foodFrames = req.body.foodFrames;
    inspection.pollenFrames = req.body.pollenFrames;

    hive.save(function (err, hive) {
        if (err) {
            return res.status(400).json(err);
        }
        res.status(201).json(hive.inspections.id(inspection.id));
    });
};

module.exports.delete = function (req, res) {
    var hive = req.hive;
    hive.inspections.id(req.params.inspectionId).remove();
    hive.save(function (err, hive) {
        if (err) {
            return res.status(400).json(err);
        }

        res.status(200).json({ message: 'Inspection removed' });
    });
};

