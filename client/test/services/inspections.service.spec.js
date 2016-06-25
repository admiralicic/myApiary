describe('service : inspectionService', function () {
    var hive = {
        "_id": "574eb48b26ddcb8e5a178fa9",
        "regNo": "AA0003",
        "queenYear": "2015",
        "location": "Tuzla",
        "__v": 3,
        "owner": "57418100c8bb4042090fd992",
        "note": "Just a note",
        "extractions": [],
        "inspections": [
            "574ecace26ddcb8e5a178fab",
            "57529e84f16e8d44190a6458",
            "57529f2274bcb080195eb6bd"
        ]
    };

    var inspection = {
        "_id": "574ecace26ddcb8e5a178fab",
        "date": "2016-01-13",
        "description": "Test first inspection",
        "type": "Regular",
        "broodFrames": 4,
        "foodFrames": 5,
        "pollenFrames": 2,
        "hive": "574eb48b26ddcb8e5a178fa9",
        "__v": 0,
        "isDeleted": false
    }; 

    var $httpBackend;
    var inspectionService;

    beforeEach(module('apiaryApp'));
    beforeEach(inject(function (_$httpBackend_, _inspectionService_) {
        inspectionService = _inspectionService_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
    })

    describe('list', function () {
        it('should return list of inspections for given hive', function () {
            var result;
            $httpBackend.expectGET('/api/hives/' + hive._id + '/inspections')
                .respond(200, hive.inspections);
            inspectionService.list(hive._id).then(function (response) {
                result = response;
            })
            $httpBackend.flush();
            expect(result).to.eql(hive.inspections);
        });

        it('should handle error', function () {
            var result;
            $httpBackend.expectGET('/api/hives/' + hive._id + '/inspections')
                .respond(400);
            
            inspectionService.list(hive._id).catch(function () {
                result = 'Error';
            });
            $httpBackend.flush();
            expect(result).to.equal('Error');
        });
    });

    describe('create', function () {
        it('should create inspection', function () {
            var result;
            $httpBackend.expectPOST('/api/hives/' + hive._id + '/inspections', inspection)
                .respond(200, inspection);
            inspectionService.create(inspection, hive).then(function (response) {
                result = response;
            });
            $httpBackend.flush();
            expect(result).to.eql(inspection);
        })
    })
});