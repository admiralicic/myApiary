var mongoose = require('mongoose');

var Hive = mongoose.model('Hive');
var User = mongoose.model('User');


module.exports.create = function (req, res) {

    var newHive = new Hive({
        regNo: req.body.regNo.toUpperCase(),
        queenYear: req.body.queenYear,
        location: req.body.location,
        note: req.body.note,
        owner: req.payload._id
    });

    newHive.save(function (err, hive) {
        if (err) {
            return res.status(400).json(err);
        }
        res.status(201).json(hive);
    });
};

module.exports.list = function (req, res) {
    Hive.find({ owner: req.payload._id, isDeleted: { $not: { $eq: true } } })
        .sort('regNo').exec(function (err, hives) {
        if (err) {
            return res.status(404).json(err);
        }
        res.status(200).json(hives);
    });
};

module.exports.read = function (req, res) {
    if (req.payload._id === req.hive.owner.toString()) {
        return res.status(200).json(req.hive);
    } else {
        res.status(400).json({ message: 'Not found' });
    }
};

module.exports.update = function (req, res) {
    var hive = req.hive;
    
    hive.regNo = req.body.regNo.toUpperCase();
    hive.location = req.body.location;
    hive.queenYear = req.body.queenYear;
    hive.isDeleted = req.body.isDeleted;
    hive.note = req.body.note;
    //hive.owner = req.payload._id;

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