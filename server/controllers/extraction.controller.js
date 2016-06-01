var mongoose = require('mongoose');

var Hive = mongoose.model('Hive');
var Extraction = mongoose.model('Extraction');

module.exports.create = function (req, res) {
    var hive = req.hive;

    var extraction = new Extraction({
        date: req.body.date,
        type: req.body.type,
        quantity: req.body.quantity,
        note: req.body.note,
        hive: hive._id
    });

    extraction.save(function (err, extraction) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        hive.extractions.push(extraction);
        hive.save(function (err, hive) {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            res.status(200).json(extraction);
        });

    });
};

module.exports.list = function (req, res) {
    Extraction.find({ hive: req.hive._id }, function (err, extractions) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.status(200).json(extractions);
    });
};

module.exports.read = function (req, res) {
    Extraction.findById(req.params.extractionId, function (err, extraction) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.status(200).json(extraction);
    });
};

module.exports.update = function (req, res) {
    Extraction.findById(req.params.extractionId, function (err, extraction) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        if (extraction) {
            extraction.date = req.body.date;
            extraction.type = req.body.type;
            extraction.quantity = req.body.quantity;
            extraction.note = req.body.note;

            extraction.save(function (err, extraction) {
                if (err) {
                    return res.status(400).json({ message: err.message });
                }
                res.status(200).json(extraction);
            });
        }
    });
};

module.exports.delete = function (req, res) {
    Extraction.findById(req.params.extractionId, function (err, extraction) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        extraction.isDeleted = true;
        extraction.save(function (err, extraction) {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            res.status(200).json(extraction);
        });
    });
};




//   date: { type: String, required: true },
//     type: { type: String, required: true },
//     quantity: { type: Number, required: true },
//     note: {type: String }