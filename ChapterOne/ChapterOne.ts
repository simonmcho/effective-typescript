// CHAPTER ONE

// ITEM 1: Relationship between TS and JS

// All js programs are ts programs, but not all ts programs are js programs
// Below will throw a compile time error in js
function greet(who: string) {
  return `Hello, ${who}!`;
}

// Type inferral works generally well, eg:
let city = 'Vancouver';
console.log(city.toUppercase());
// Squiggly line on toUppercase as it recognizes `city` is type string

// Type annotations tell TS what your intent is:
const states = [
  { name: 'British Columbia', capitol: 'Victoria' }
]

for (const state of states) {
  console.log(state.capital); // Provides helpful error on property capitol
}

// Explicitly declare type to help TS:
interface State {
  name: string;
  capitol: string;
}

const explicitStates: State[] = [
  { name: 'Alberta', capitol: 'Edmonton', another: false } // error on `another` property
]

// TS type system models JS' runtime behavior!
// EG:
let firstSum = '2' + 3;
let secondSum = 2 + '3';

// The two variables are questionable, but TS type checker behaves similarly to JS' runtime behavior
// both variables will result in '23' as string
// But TS will also throw flags/warnings
let a = null + 7;
let b = [] + 3;
alert('Hello!', 'Typescript');

// TS type checking doesn't prevent runtime errors:
const names = ['Bob', 'Alice'];
console.log(names[2]);
// TS assumes the array access is within bounds. Often happens with "any" type

/*
* Things to remember:
* TS is a superset of JS. JS programs are TS programs, but not the otherway around.
* TS compiles TO JS. Other languages such as C compiles down to lower level machine language, or has an interpreter like Python
* TS adds a type system that models JS runtime behavior, but doesn't prevent all runtime errors
* Some JS runtime behavior that is allowed (eg. calling functions with wrong number of args) but TS bars, due to taste
*/

// ITEM 2: Know TS Options
function add(a, b) {
  return a + b;
}
add(10, null);

// noImplicitAny

// Hard to tell if this passes type checker because of what options the TS type checker uses
// Create a config file via `tsc --init`, which creates a tsconfig.json file. 
/* 
  {
    "compilerOptions": {
      "noImplicitAny": true
    }
  }
*/
// If the "noImplicitAny" is false, it will show the add function above as so when hovered:
/*
function add(a: any, b: any): any 
*/ 

// Called implicit any, hence the config key "noImplicitAny"

// strictNullChecks
const someNumber: number = null; // Allowed when strictNullChecks is false, not allowed when true

// If you mean to null, you can do the following:
const otherNum: number | null = null;

// Still needs to check for assertion if you want to "fully" prevent null:
const el = document.getElementById('something');
el.textContent = 'first'; // possibly null

if (el) { // null has been excluded
  el.textContent = 'hello';
}

el!.textContent = 'last'; // asserted that el is non-null

// ITEM 3: Understand Code Generation is INDEPENDENT of types

// The tsc (typescript compiler) does 2 things at a high level:
// 1. Transpiles - converts next-gen TS/JS to an older version of JS that works in the browser
// 2. Checks for type errors

// Code with type errors will still produce output (different than C or Java where type checking and output go hand in hand)
// Notice `test.ts` has type errors, but will still produce a test.js file. It still compiled to JS with a JS output file.
// You can disable output on errors via `noEmitOnError`

// 1. RUNTIME CHECK - Cannot check TS types at runtime - See `typeCheckAtRuntime.ts` for example

// 2. TYPE OPERATIONS/ASSERTIONS - Type operations cannot affect runtime values
function asNumber(val: number | string): number {
  return val as number;
}
// Generated JS is below:
function asNumberJs(val) {
  return val;
}

// The `as number` is a type operation, so no conversion takes place in js output
// You need to check the runtime type using JS constructs:
function asNumberWithRunTimeCheck(val: number | string) : number {
  return typeof(val) === 'string' ? Number(val) : val;
}

// See item 9 when it's appropriate to use type assertion/operation

// 3. RUNTIME TYPES != DECLARED TYPES
function setSwitch (value: boolean) {
  switch (value) {
    case true:
      console.log('on!');
      break;
    case false:
      console.log('off!');
      break;
    default:
      console.log('what?');
  }
}

// TS generally flags dead code, but default is NOT dead code
// boolean is a DECLARED type. It goes away at runtime, and nothing enforces value to be boolean type in runtime

// This can occur in pure TS as well:
interface ApiResponse {
  value: boolean;
};
async function setLightSwitch() {
  const response = await fetch('/lightSwitch');
  const result: ApiResponse = await response.json();
  setSwitch(result.value);
}
// Even though this seems right in TS, the `result.value` might not be a bool type at runtime
// The api might change
// When runtime types don't match declared/TS types, it can be confusing!

// 4. CANNOT OVERLOAD FUNCTION BASED ON TS TYPES
// Because runtime behavior is different than TS types, you cannot do function overloading
// It kind of works at the type level ONLY. Maybe this no longer works...?
function addSmth(a: number, b: number): number {
  return a + b;
}
function addSmth(a: string, b: string): string {
  return a + b;
}

// 5. TS types have no effect on runtime performance
// TS types and type assertions are erased when JS is generated, so it's truly zero cost at runtime
// 2 caveats:
// 1. TS compiler will introduce BUILD overhead. If overhead becomes significant, the build tool
// may have a "transpile only" option to skip type checking
// 2. TS output of JS code to support older runtimes MAY incur performance overhead vs native implementations
// EG: using generator functions and targeting ES5 - `tsc` will emit helper code to help with this
// which can affect runtime vs native implementations

// ITEM 4 - GET COMFY WITH STRUCTURAL TYPING
interface Vector2D {
  x: number;
  y: number;
};
function calcLength(v: Vector2D) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

// Now introduce a new interface:
interface NamedVector {
  name: string;
  x: number;
  y: number;
}

// The calcLength fn will work because TS can figure out that NamedVector "looks and walks like a duck"
const namedV: NamedVector = { x: 3, y: 5, name: 'tester' };
calcLength(namedV); // This is ok. results in 5
// Remember that type system models JS runtime behavior! 
// The structure of NamedVector is compatible with Vector2D
// But this can backfire...

interface Vector3D {
  x: number;
  y: number;
  z: number;
}

function normalize (v: Vector3D) {
  const length = calcLength(v);
  return {
    x: v.x / length,
    y: v.y / length,
    z: v.z / length
  }
}
normalize({ x: 3, y: 5, z: 1});
// Results in { x: 0.6, y: 0.8, z : 1 } when it should be { x: 0.6, y: 0.8, z : 0.2 }
/*
calcLength operates on 2D vectors but not 3D...the z prop is ignored in the normalization
Type checker cannot catch this, even though a Vector3D type was passed into calcLength
*/ 

// You cannot write a function that will be called with arguments with the types you have declared
// and assume that the arguments have NO OTHER properties/property types
// As such, TypeScript's type system is OPEN

function calcLengthAgain(v: Vector3D) {
  let length = 0;
  for (const axis of Object.keys(v)) {
    const coord = v[axis];
    length += coord;
  }
  return length;
}

// `axis` here is type string
// `coord` here is type `any`, even though all props in `Vector3D` are number types
// But technically, you can pass an object with structurally same properties with OTHER props:
calcLengthAgain({ x: 1, y: 2, z: 3, a: 'haha' });// returns NaN
// Since v arg coudl have other props, it has to believe v[axis] is any type
// Better to write like this:
function calcLengthBetterAgain(v: Vector3D) {
  return Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z);
}

// This can occur with classes too:
class C {
  foo: string;
  constructor(foo: string) {
    this.foo = foo;
  }
}
const c = new C('instance of C class');
const d: C = { foo: 'haha' };
// the d var declaration works because it has a foo property of string
// So unlike Java or C, parameter type declartion doesn't guarantee that it will be a class or subclass of C

// STRUCTURAL TYPING IS BENEFICIAL FOR TESTING
interface Author { // structural typing here helps
  first: string;
  last: string;
}

function getAuthors(db: PostGresDB): Author[] {
  const authorRows = db.runQuery('SELECT FIRST, LAST FROM AUTHORS');
  return authorRows.map((author) => ({
    first: author[0],
    last: author[1],
  }))
}

// To test this, you can create mock PostgresDB:
interface DB {
  runQuery: (sql: string) => any[]; // structural typing here helps
}
function getAuthorsTest(db: DB): Author[] {
  const authorRows = db.runQuery('SELECT FIRST, LAST FROM AUTHORS');
  return authorRows.map((author) => ({
    first: author[0],
    last: author[1],
  }))
}

// And in your test case...
const mockDB = {
  runQuery(sql: string) {
    const firstAuthor = ['Toni', 'Morrison'];
    const secondAuthor = ['John', 'Doe'];
    return [firstAuthor, secondAuthor];
  }
}
const actual = getAuthorsTest(mockDB);
const expected = [
  { first: 'Toni', last: 'Morrison' },
  { first: 'John', last: 'Doe' },
]
expect(actual).toEqual(expected);

// SUMMARY - JS is duck typed, and TS uses structural typing to model the JS runtime behavior.
// Use for unit testing, but fns and classes can fall to bugs 

// ITEM 5 - LIMIT USE OF ANY
// It's easy to silence the TS error:
let age: number;
age = '12' // complains
age = '12' as any // does not complain

// The 'any' doesn't mean it has type safety. TS will assume that the '12' is a number because of the any
// STILL EXPECTS number type, and will go uncaught at runtime:
age += 3;
// runtime result: '123'

// any type breaks contracts...DONT DO THIS
function calcAge(birthDate: Date): number {
  return 3;
}

let birthDate: any = '1990-01-01';
calcAge(birthDate); // THis will run!

// THERE ARE NO LANGUAGE SERVICES FOR ANY TYPES
// right clicking some var and renaming symbol won't take place for any types

// ANY TYPES MASKS BUGS WHEN REFACTORING CODE
// Be careful when refactoring a helper fn or props from any to smth more specific
// Some prop or arg that takes that as a callback needs to change too

// ANY ALSO HIDES TYPE DESIGN (esp in complex objects)

// ANY undermines confidence in type system



