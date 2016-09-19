# Veracity JS - Synopsis
Veracity JS is a plugin for validating your javascript object and ensuring you that the object you have received is consistent with what you want. 

## Installation
Veracity JS doesn't require anything. Just add the script into your app like this :
  
**Basic usage**
```javascript
    var Veracity = require('veracityjs')
```
**ES6**
```javsacript
    import Veracity from "veracityjs"
```

## How to use it
To use it, you must follow this pattern :
```javascript
    Veracity.validate(<your data>, <your validation pattern>);
```

## Example
**Basic example**
```javascript
    var data = {
        test: 1
    };
    
    Veracity.validate(data, [
      {name: 'test', type: Veracity.Type.Integer, required: true}
    ];      // It will return true
    
```

You don't have to pass an object, you can just pass a variable and test its type
```javascript
    var test = "string test";
    
    Veracity.validate(test, Veracity.Type.String);  // It will return true
    Veracity.validate(test, Veracity.Type.Integer); // It will return false
```

Here is a complete example for testing all types and all parameters
```javascript
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

    ]); // It will return true
```


## Validation Pattern parameters
| Parameters | State | Explication |
|------------|-------|-------------|
| name | required | The name of property of the data to test |
| type | required | A type |
| required | optional | if this is required, the validation won't pass if the property doesn't exist |


## List of types
| Type | Parameters | Explication|
|------|------------|------------|
| Veracity.Type.Integer | / | Test if the property is an integer (it won't pass if it is a float) |
| Veracity.Type.Float | / | Test if the property is a float (it won't pass if it is an integer) |
| Veracity.Type.Boolean | / | Test if the property is a boolean (even if a boolean is 'false') |
| Veracity.Type.String | / | Test if the property is a string |
| Veracity.Type.Array | / | Test if the property is an array (it will pass if it is an empty array) |
| Veracity.Type.Object | Array of types (optional) | Test if the property is an object (you can validate all object properties with the optional parameters) |
| Veracity.Type.Regex | Regular Expression (REQUIRED) | Test if the property match with the regular expression passed by paramaters) |
| Veracity.Type.AmongValues | Array of values (REQUIRED) | Test if the property match with one of values contained in array passed by parameters) |
| Veracity.Type.AmongTypes | Array of types (REQUIRED) | Test if the property type match with one of types contained in array passed by parameters) |


## Example
To run test, juste use :
```
npm test
```

## License
This plugin is licensed under Creative Commons Attribution 4.0 International License.