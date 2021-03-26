// ITEM 11 - LIMITS OF EXCESS PROP CHECKING

// Object literal assignment cannot be done with type checking:
interface Room11 {
  numDoors: number;
  width: number;
}

const r11: Room11 = {
  numDoors: 3,
  width: 500,
  name: 'hi',
}; // even though error in compiile time, can still produce js code and const r11 is assignable

// You can do this:
const r11Again = {
  numDoors: 3,
  width: 500,
  name: 'hi',
}

const r11Assignable: Room11 = r11Again; // Since this type (numDoors, width, name) has a subset of Room11, it passes type checker



