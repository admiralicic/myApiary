describe('service: hiveService', function () {
    var hive = {
        _id: "574eb48b26ddcb8e5a178fa9",
        regNo: "AA0003",
        queenYear: "2015",
        location: "Tuzla",
        owner: "57418100c8bb4042090fd992",
        note: "Just a note",
        extractions: [],
        inspections: []
    };
    var hives = [
        {
            _id: "574eb4ed26ddcb8e5a178faa",
            regNo: "AA0001",
            queenYear: "2015",
            location: "Grabovica",
            owner: "57418100c8bb4042090fd992",
            note: "Adding a note for testing purpose\n\nmulti line test",
            extractions: [],
            inspections: []
        },
        {
            _id: "574fd459f5cdf4648a5311f9",
            regNo: "AA0002",
            queenYear: "2015",
            location: "Grabovica",
            owner: "57418100c8bb4042090fd992",
            extractions: [],
            inspections: []
        }];

    var $httpBackend;
    var hiveService;

    beforeEach(module('apiaryApp'));

    beforeEach(inject(function (_$httpBackend_, _hiveService_) {
        $httpBackend = _$httpBackend_;
        hiveService = _hiveService_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('list', function () {
        it('should return list of hives', function () {
            var responseData;
            $httpBackend.expectGET('/api/hives').respond(200, hives);
            hiveService.list().then(function (response) {
                responseData = response;
            });
            $httpBackend.flush();
            expect(responseData).to.eql(hives);
        });

        it('should handle error', function () {
            var responseData;
            $httpBackend.expectGET('/api/hives').respond(400, hives);
            hiveService.list().then(function (response) {
                responseData = response;
            }).catch(function () {
                responseData = 'Error';
            })
            $httpBackend.flush();
            expect(responseData).to.equal('Error');
        })
    });

    describe('detail', function () {
        it('should return hive by id', function () {
            var responseData;
            $httpBackend.expectGET('/api/hives/' + hive._id).respond(200, hive);
            hiveService.detail(hive._id).then(function (response) {
                responseData = response;
            });
            $httpBackend.flush();
            expect(responseData).to.eql(hive);
        });

        it('should handle error', function () {
            var response;
            $httpBackend.expectGET('/api/hives/' + hive._id).respond(400);
            hiveService.detail(hive._id).then(function (response) {
                responseData = response;
            }, function () {
                responseData = 'Error';
            });
            $httpBackend.flush();
            expect(responseData).to.equal('Error');
        });
    });

    describe('create', function () {
        it('should create a hive', function () {
            $httpBackend.expectPOST('/api/hives').respond(200);
            hiveService.create(hive);
            expect($httpBackend.flush).not.to.throw();
        });

        it('should handle error', function () {
            var response;
            $httpBackend.expectPOST('/api/hives').respond(400);
            hiveService.create(hive).catch(function () {
                responseData = 'Error';
            });
            $httpBackend.flush();
            expect(responseData).to.equal('Error');
        });
    });


    describe('update', function () {
        it('should update a hive', function () {
            $httpBackend.expectPUT('/api/hives/' + hive._id).respond(200);
            hiveService.update(hive);
            expect($httpBackend.flush).not.to.throw();
        });

        it('should handle error', function () {
            var response;
            $httpBackend.expectPUT('/api/hives/' + hive._id).respond(400);
            hiveService.update(hive).catch(function () { 
                responseData = 'Error';
            });
            $httpBackend.flush();
            expect(responseData).to.equal('Error');
        });
    });

    describe('delete', function () {
        it('should delete a hive', function () {
            $httpBackend.expectDELETE('/api/hives/' + hive._id).respond(200);
            hiveService.deleteHive(hive);
            expect($httpBackend.flush).not.to.throw();
        });

        it('should handle error', function () {
            var response;
            $httpBackend.expectDELETE('/api/hives/' + hive._id).respond(400);
            hiveService.deleteHive(hive).catch(function () {
                response = 'Error';
            });
            $httpBackend.flush();
            expect(response).to.equal('Error');
        });
    });

});