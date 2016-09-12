var should      = require('chai').should(),
    Veracity    = require('./../lib/veracity');


describe('error preventing', function () {
    var data = {
        data: true
    };

    var validator = [
        {name: 'data', type: Veracity.Type.Boolean, required: true}
    ];


    it('should return true if there is no data', function () {
        Veracity.validate().should.equal(true);
    });

    it('should return true if there a validator and no data', function () {
        Veracity.validate(null, validator).should.equal(true);
    });

    it('should return true if there is no validator', function () {
        Veracity.validate(data).should.equal(true);
    });

    it('sould return true if data is not an object and no validator', function () {
        Veracity.validate(1).should.equal(true);
    });
});

describe('test with a non object data', function () {
    it('should pass with integer validation', function () {
        Veracity.validate(1, Veracity.Type.Integer).should.equal(true);
        Veracity.validate(1.5, Veracity.Type.Integer).should.equal(false);
    });

    it('should pass with float validation', function () {
        Veracity.validate(1.5, Veracity.Type.Float).should.equal(true);
        Veracity.validate(1, Veracity.Type.Float).should.equal(false);
    });

    it('should pass with boolean validation', function () {
        Veracity.validate(false, Veracity.Type.Boolean).should.equal(true);
        Veracity.validate(true, Veracity.Type.Boolean).should.equal(true);
        Veracity.validate(1, Veracity.Type.Boolean).should.equal(false);
    });

    it('should pass with string validation', function () {
        Veracity.validate('string', Veracity.Type.String).should.equal(true);
        Veracity.validate('1', Veracity.Type.String).should.equal(true);
        Veracity.validate({}, Veracity.Type.String).should.equal(false);
    });

    it('should pass with array validation', function () {
        Veracity.validate([], Veracity.Type.Array).should.equal(true);
        Veracity.validate(['toto', 1], Veracity.Type.Array).should.equal(true);
        Veracity.validate({}, Veracity.Type.Array).should.equal(false);
    });

    it('should pass with object validation', function () {
        Veracity.validate({}, Veracity.Type.Object).should.equal(true);
        Veracity.validate(new function() { this.toto = 1 }, Veracity.Type.Object).should.equal(true);
        Veracity.validate(function () { this.toto = 2}, Veracity.Type.Object).should.equal(false);
    });
});

describe('test with types requiring parameters', function () {
    it('should pass with object waterfalling validation', function () {
        Veracity.validate({}, Veracity.Type.Object).should.equal(true);

        Veracity.validate({ data: 1}, Veracity.Type.Object([
            {name: 'data', type: Veracity.Type.Integer}
        ])).should.equal(true);

        Veracity.validate({}, Veracity.Type.Object([
            {name: 'data', type: Veracity.Type.Integer}
        ])).should.equal(true);

        Veracity.validate({}, Veracity.Type.Object([
            {name: 'data', type: Veracity.Type.Integer, required: true}
        ])).should.equal(false);
    });

    it('should pass with regex validation', function () {
        Veracity.validate('price[5][68]', Veracity.Type.Regex(/price\[(\d+)\]\[(\d+)\]/gi)).should.equal(true);
        Veracity.validate('price[5][68]', Veracity.Type.Regex(/priced/gi)).should.equal(false);
        Veracity.validate('price[5][68]', Veracity.Type.Regex).should.equal(false);
    });
    
    it('should pass with value among values passed in parameters validation', function () {
        Veracity.validate(5, Veracity.Type.AmongValues([1, 5, 3])).should.equal(true);
        Veracity.validate(5, Veracity.Type.AmongValues([1, '5', 3])).should.equal(false);
        Veracity.validate(5, Veracity.Type.AmongValues([1, 2, 3])).should.equal(false);
        Veracity.validate(5, Veracity.Type.AmongValues([Veracity.Type.Integer])).should.equal(false);
        Veracity.validate(5, Veracity.Type.AmongValues).should.equal(false);
    });
    
    it('should pass with type among types passed in parameters validation', function () {
        Veracity.validate(5, Veracity.Type.AmongTypes([Veracity.Type.Integer, Veracity.Type.String])).should.equal(true);
        Veracity.validate(5, Veracity.Type.AmongTypes([Veracity.Type.Float, Veracity.Type.String])).should.equal(false);
        Veracity.validate(5, Veracity.Type.AmongTypes([5])).should.equal(false);
        Veracity.validate(5, Veracity.Type.AmongTypes).should.equal(false);
    });
});

describe('the last test of all types in one validation', function () {
    Veracity.validate({
        integer: 1,
        float: 1.5,
        string: 'test',
        array: [1, 5],
        object: { data: 1 },
        objectWaterfall: { float: 1, integer: 1.5 },
        amongValues: 3,
        amongTypes: '3',
        regex: 'price'

    }, [
        {name: 'integer', type: Veracity.Type.Integer, required: true},
        {name: 'float', type: Veracity.Type.Float, required: true},
        {name: 'string', type: Veracity.Type.String, required: true},
        {name: 'array', type: Veracity.Type.Array, required: true},
        {name: 'object', type: Veracity.Type.Object, required: true},
        {name: 'objectWaterfall', type: Veracity.Type.Object([
            {name: 'float', type: Veracity.Type.Integer, required: true},
            {name: 'integer', type: Veracity.Type.Float, required: true}
        ]), required: true},
        {name: 'amongValues', type: Veracity.Type.AmongValues([1, 2, 3]), required: true},
        {name: 'amongTypes', type: Veracity.Type.AmongTypes([Veracity.Type.Integer, Veracity.Type.Float, Veracity.Type.String]), required: true},
        {name: 'regex', type: Veracity.Type.Regex(/price/gi), required: true}

    ]).should.equal(true);


});