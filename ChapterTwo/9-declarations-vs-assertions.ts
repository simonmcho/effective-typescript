// ITEM 9 - PREFER TYPE DECLARATIONS OVER ASSERTIONS

// TS has 2 ways of assigning a value and giving it a type:
interface PersonItem9 {
  name: string
};

const alice: PersonItem9 = { name: 'alice' }; // Type declaration
const bob = { name: 'bob' } as PersonItem9; // Type assertion. Type is inferred but dev knows better

// Because type assertion implies dev knows better, it will silence type error here:
const anotherBob = {} as PersonItem9; // should have property 'name' is missing type error
const someBob = { name: 'someBob', age: 27 } as PersonItem9; // should throw excess property checking error

// Below was deprecated because <> is interpreted as start tag in tsx:
const deprecatedBob = <PersonItem9>{}; 

// Tempting to use type assertion in this example, but will have the same silence of type error
const people: string[] = ['alice', 'bob', 'jan'];
people.map((name) => ({ name, age: 27 } as PersonItem9 ));

// One way to deal with this:
people.map((name) => {
  const person: PersonItem9 = { name };
  return person;
})

// Better way without code noise, by declaring return type
people.map((name): PersonItem9 => ({ name })); // Type is PersonItem9[]
// OR
const mappedPeople: PersonItem9[] = people.map((name) => ({ name })); // Type is PersonItem9[]

// Careful not to do this, where type is inside the paranthesis:
people.map((name: PersonItem9) => ({ name })); 

// Type assertions are used when you really know better than the implied interpreter, eg DOM elements
document.querySelector('#someBtn').addEventListener('click', (e) => {
  e.currentTarget;
  const btn = e.currentTarget as HTMLButtonElement; // HTMLButtonElement subtype of type EventTarget
  btn;
})

// And can do non-null assertions:
const elNull = document.getElementById('foo'); // Type is HTMLElement | null
const el9 = document.getElementById('foo')!; // Type is HTMLElement

// Using ! as a suffix is interpreted that value is non-null
// ** IMPORTANT! ! is like any other assertion, so it is erased during compilation

// Type assertions cannot convert between arbitrary types:
interface someRandom9 { name: string };
const body = document.body;
const el = body as someRandom9; 
// HTMLElement is subtype of HTMLElement | null...so ok
// HTMLButtonElement is subtype of EventTarget...so ok
// The escape hatch "convert to unknown first" works because all types are subtypes of unknown

const elProper9 = body as unknown as someRandom9; // OK...but dont do lol

// IMPORTANT THINGS!
// 1. Prefer type declarations
// 2. Annotate return type of functions via type declarations
// 3. Use type assertions and non-null assertions for dom elements

