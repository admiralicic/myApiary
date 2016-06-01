var mongoose = require('mongoose');

var Hive = mongoose.model('Hive');


module.exports.create = function (req, res) {
    Hive.create(req.body, function (err, hive) {
        if (err) {
            return res.status(400).json(err);
        }
        res.status(201).json(hive);
    });
};

module.exports.list = function (req, res) {
    Hive.find({}, function (err, hives) {
        if (err) {
            return res.status(404).json(err);
        }
        res.status(200).json(hives);
    })
};

module.exports.read = function (req, res) {
    res.status(200).json(req.hive);
};

module.exports.update = function (req, res) {
    var hive = req.hive;

    hive.reqNo = req.body.regNo;
    hive.location = req.body.location;
    hive.queenYear = req.body.queenYear;
    hive.isDeleted = req.body.isDeleted;
    hive.note = req.body.note;

    hive.save(function (err, hive) {
        if (err) {
            return res.status(400).json(err);
        } 
        res.status(200).json(hive);
    });
};

module.exports.delete = function (req, res) {
    var hive = req.hive;
    
    hive.isDeleted = true;
    hive.save();
    
    res.status(200).json(hive);
};

module.exports.findById = function (req, res, next, id) {
    Hive.findById(id).populate('inspections').exec(function (err, hive) {
        if (err) {
            return res.status(404).json(err);
        } else if (!hive) {
            return res.status(404).json('Hive not found');
        }
        req.hive = hive;
        next();
    });
};