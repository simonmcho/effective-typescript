// ITEM 7 - THINK OF TYPES AS SETS OF VALUES
// For example, think of `number` type as a set of possible values (or enums?):
// number types - [...-3, -2, -1.5, -1.1, -1, 0, 1, 2, 3, 4, 5...]

// Depending on strictNullChecks, null and undefined may/may not be part of the set

// Smallest set - the type `never` is the smallest set, which is an empty set
// 2nd Smallest set - unit types (or literal types):
type A = 'A';
type B = 'B';
type Twelve = 12;

// Form 2 or 3 values by union unit types:
type AB = 'A' | 'B';
type AB_AGAIN = A | B;
type AB12 = 'A' | 'B' | 12;

const chapterTwoA: AB = 'A';
const chapterTwoC: AB = 'C'; // not "assignable" means the value is not a member of the type

// Almost all type checker is testing whether one set is a subset of another
const ab12: AB12 = 'A'; // OK, 'A' is a subset of { 'A', 'B', 12 }

// This helps you think about operations on types:
interface Person {
  name: string;
  age: number;
}
interface Lifespan {
  birth: Date;
  death?: Date;
}
type PersonSpan = Person & Lifespan; // INTERSECTION OF 2 TYPES

const personSpan: PersonSpan = {
  name: 'Alan',
  age: 23,
  birth: new Date('1912/06/23'),
  death: new Date('1954/06/07'),
}; // OK

// A value could have MORE than these 3 types and still belong to PersonSpan type!
// General rule: Values in an intersection type contain the union of properties in each of its constituents

type K = keyof Person;
const correctKeyOfPerson: K = 'name';
const incorrectKeyOfPerson: K = 'names';

// ANother use case...
const someLife: Lifespan = {
  birth: new Date('1912/06/23'),
  death: new Date('1954/06/07'),
}

// Here, you can't guarantee `key` arg is a key of Person
const updateAge = (person: Person, key: 'string') => {
  return {
    ...person,
    [key]: person[key] + 1,
  };
} ;

// Better way...kind of
const updateAgeBetter = (person:Person, key: keyof Person['age']) => {
  return {
    ...person,
    [key]: person[key] + 1,
  };
};

type KThing = keyof (Person | Lifespan); // Type is never

// TS can't guarantee that a key belongs to a value in a union type, so keyof for union is empty set (never)
// Re-read page 109. Understanding intuition of keys belonging to a union type...
// keyof (A&B) = (keyof A) | (keyof B)
// keyof (A|B) = (keyof A) & (keyof B)

// More common way to write PersonSpan type is with `extends`:
interface PersonSpanCommonWay extends Person {
  birth: Date;
  deat?: Date;
}

// You can read `extends` as `subset of`.
// Every value in PersonSpanCommonWay MUST have a property `name` that is a string, as well as `birth`
// Also can be aclled "subtype"

// A good way is to think of multi-dimensional vectors:
interface Vector1D {
  x: number;
}

interface Vector2D extends Vector1D {
  y: number;
}

interface Vector3D extends Vector2D {
  z: number;
}

// Helpful mindset when dealing with finite sets
// esp using keyof T, which reutnrs type for just the keys of an object type:
interface Point {
  x: number,
  y: number,
};

type PointKeys = keyof Point; // Type is 'x' | 'y'
function chapterTwoSortBy<K extends keyof T, T>(vals: T[], key: K): T[] {
  return vals;
}
const pts: Point[] = [{ x: 3, y: 5}, { x: 10, y: 15}];
chapterTwoSortBy(pts, 'x')
chapterTwoSortBy(pts, 'y');
chapterTwoSortBy(pts, Math.random() < 0.5 ? 'x' : 'y');
chapterTwoSortBy(pts, 'z'); // Type z is not assignable to parameter of type x | y

// Use generics to not lose type info... https://www.typescriptlang.org/docs/handbook/2/generics.html

// Return type is T[K]. K at widest can be `keyof T` but can also be a string literal type representing a key
function prop<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

// Return type is T[keyof T]
function prop2<T>(obj: T, key: keyof T) {
  return obj[key];
}

let o = {
  p1: 0,
  p2: ''
}

let v = prop(o, 'p1') // is number, K is of type 'p1'
let v2 = prop2(o, 'p1') // is number | string (keyof T), no extra info is captured

// never - empty set
// Literal Type - single element set
// Value assignable to T  - member of
// T1 | T2 - union type
// T1 & T2 - intersection type
// T1 assignable to T2 - subset of
// T1 extends T2 - subset of

// Also use exlcude to subtract types by using '`Exclude`
type AnotherT = Exclude<Point, string>;
let exampleAnotherT: AnotherT = 'lol'; // Type string is not assignable to Type Point
type anotherThingT = Exclude<string|number, boolean>;

// THINK OF TYPES AS SETS OF VALUES!
// THINK OF EXTENDS, ASSIGNABLE TO, and SUBTYPEOF as synonyms of "SUBSET OF"
// Objects can still belong to a type even if it has additional properties not mentioned in the type declaration
