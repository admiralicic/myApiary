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
router.get('/:hiveId',auth, hivesCtrl.read);
router.put('/:hiveId',auth, hivesCtrl.update);
router.delete('/:hiveId',auth, hivesCtrl.delete);

router.get('/:hiveId/inspections',auth, inspectionsCtrl.list);
router.post('/:hiveId/inspections',auth, inspectionsCtrl.create);
router.get('/:hiveId/inspections/:inspectionId',auth, inspectionsCtrl.read);
router.put('/:hiveId/inspections/:inspectionId',auth, inspectionsCtrl.update);
router.delete('/:hiveId/inspections/:inspectionId',auth, inspectionsCtrl.delete);

router.get('/:hiveId/extractions',auth, extractionsCtrl.list);
router.post('/:hiveId/extractions',auth, extractionsCtrl.create);
router.get('/:hiveId/extractions/:extractionId',auth, extractionsCtrl.read);
router.put('/:hiveId/extractions/:extractionId',auth, extractionsCtrl.update);
router.delete('/:hiveId/extractions/:extractionId',auth, extractionsCtrl.delete);

router.param('hiveId', hivesCtrl.findById);

module.exports = router;
