var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

var hivesCtrl = require('../controllers/hive.controller');
var inspectionsCtrl = require('../controllers/inspection.controller');
var extractionsCtrl = require('../controllers/extraction.controller');

router.get('/', auth, hivesCtrl.list);
router.post('/', auth, hivesCtrl.create);
router.get('/:hiveId', hivesCtrl.read);
router.put('/:hiveId', hivesCtrl.update);
router.delete('/:hiveId', hivesCtrl.delete);

router.get('/:hiveId/inspections', inspectionsCtrl.list);
router.post('/:hiveId/inspections', inspectionsCtrl.create);
router.get('/:hiveId/inspections/:inspectionId', inspectionsCtrl.read);
router.put('/:hiveId/inspections/:inspectionId', inspectionsCtrl.update);
router.delete('/:hiveId/inspections/:inspectionId', inspectionsCtrl.delete);

router.get('/:hiveId/extractions', extractionsCtrl.list);
router.post('/:hiveId/extractions', extractionsCtrl.create);
router.get('/:hiveId/extractions/:extractionId', extractionsCtrl.read);
router.put('/:hiveId/extractions/:extractionId', extractionsCtrl.update);
router.delete('/:hiveId/extractions/:extractionId', extractionsCtrl.delete);

router.param('hiveId', hivesCtrl.findById);

module.exports = router;
