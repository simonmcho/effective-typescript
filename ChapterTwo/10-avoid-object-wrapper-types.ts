// ITEM 10 - AVOID OBJECT WRAPPER TYPES

// Take the `String` object example. In JS, you can do the below:
const string10 = 'what';
const string10Object = new String('what');

// JS allows static class methods to occur on primitives:
string10.charAt(3); // t

// But under the hood, it actually creates a String object, calls the method, then throws the method away
// So if you try this, you will lose the property assignment:
string10.someProp = 'got it';
console.log(string10.someProp) // someProp is undefined

// In TS, don't mix up primitive and the Object Wrapper types
function isGreeting(phrase: String) {
  return [
    'hello',
    'bye'
  ].includes(phrase); // type String is not assignable to parameter of type 'string'
};

// string is assignable to String, but String is not assignable to string

