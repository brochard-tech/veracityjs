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
});