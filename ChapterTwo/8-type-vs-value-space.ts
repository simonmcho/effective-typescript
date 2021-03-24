// ITEM 8 - KNOW HOW TO TELL WHETHER SYMBOL IS IN TYPE SPACE OR VALUE SPACE
interface Cylinder {
  radius: number;
  height: number;
}

const Cylinder = (radius: number, height: number) => ({ radius, height });

// Remember JS run time operator operates on VALUES, as TYPES DO NOT EXIST!
function item8calcVolume(shape: unknown) {
  if (shape instanceof Cylinder) { // Cylinder here refers to const Cylinder, not interface Cylinder
    return shape.radius;
  }
}

// If a symbol disappears in the ts playground, probably in type space
// The interface Cylinder can be a class...available in runtime

interface Item8Person {
  first: string;
  last: string;
}

const p: Item8Person = {
  first: 'Jane',
  last: 'Jacobs',
};

function item8email(p: Item8Person, subject: string, body: string) {
  return 'hello';
}

// There are operators or keywords that mean different things in type vs value context
type T1 = typeof p; // returns "Item8Person"
type T2 = typeof item8email; // Type is (p: Item8Person, subject: string, body: string) => string
const v1 = typeof p; // returns object
const v2 = typeof item8email; // returns "function"

