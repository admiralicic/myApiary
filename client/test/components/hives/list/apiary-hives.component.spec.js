describe('component: apiaryHives', function () {
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
            _id: "574eb48b26ddcb8e5a178fa9",
            regNo: "AA0003",
            queenYear: "2015",
            location: "Tuzla",
            __v: 3,
            owner: "57418100c8bb4042090fd992",
            note: "Just a note",
            extractions: [],
            inspections: [
                "574ecace26ddcb8e5a178fab",
                "57529e84f16e8d44190a6458",
                "57529f2274bcb080195eb6bd"
            ]
        },
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
        }
    ];

    var inspections = [
        {
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
        },
        {
            "_id": "57529e84f16e8d44190a6458",
            "date": "2016-01-13",
            "description": "Second inspection",
            "type": "Regular",
            "broodFrames": 4,
            "foodFrames": 5,
            "pollenFrames": 2,
            "hive": "574eb48b26ddcb8e5a178fa9",
            "__v": 0,
            "isDeleted": false
        },
        {
            "_id": "57529f2274bcb080195eb6bd",
            "date": "2016-05-25",
            "description": "Third ispection",
            "type": "Regular",
            "broodFrames": 3,
            "foodFrames": 6,
            "pollenFrames": 6,
            "hive": "574eb48b26ddcb8e5a178fa9",
            "note": "Some observation during inspection",
            "__v": 0,
            "isDeleted": false
        }
    ];

    var $componentController;
    var component;
    var authentication;
    var stub;
    var stubHives;
    var stubInspectons;
    var hiveService;
    var inspectionService;

    beforeEach(function () {
        module('apiaryApp');
        inject(function (_$componentController_, _$q_, $rootScope, _$location_,
            _authentication_, _hiveService_, _inspectionService_) {
            scope = $rootScope.$new();
            $q = _$q_;
            $componentController = _$componentController_;
            authentication = _authentication_;
            hiveService = _hiveService_;
            inspectionService = _inspectionService_;
            $location = _$location_;

            stub = sinon.stub(authentication, 'isLoggedIn');
            stubHives = sinon.stub(hiveService, 'list', function () { return $q.when(hives); });
            stubInspections = sinon.stub(inspectionService, 'list', function () { return $q.when(inspections) });
            component = $componentController('apiaryHives');
        });
    });

    afterEach(function () {
        stub.restore();
        stubHives.restore();
        stubInspections.restore();
    });

    describe('when logged in', function () {
        beforeEach(function () {
            stub.returns(true);
            component.$onInit();
            scope.$apply();
        });
        
        it('should be defined', function () {
            expect(component).to.be.defined;
        });

        it('should be logged in', function () {
            expect(component.isLoggedIn).to.equal(true);
        });
        
        it('should load hives', function () {
            expect(stubHives.called).to.be.true;
            expect(component.hives.length).to.equal(hives.length);
        });

        it('should select first hive from the list', function () {
            expect(component.selected._id).to.equal(hives[0]._id);
        });

        it('should load inspections for selected hive', function () {
            component.select(hives[0]);
            expect(component.inspections.length).to.equal(inspections.length);
            expect(component.inspections[0].hive).to.equal(hives[0]._id);
            expect(component.inspections[1].hive).to.equal(hives[0]._id);
            expect(component.inspections[2].hive).to.equal(hives[0]._id);
        });
    });

    describe('when not logged in', function () {
        beforeEach(function () {
            stub.returns(false);
            component.$onInit();
            scope.$apply();
        });

        it('should redirect to home page if user not logged in', function () {
            expect($location.path()).to.equal('/home');
        });
    });

});