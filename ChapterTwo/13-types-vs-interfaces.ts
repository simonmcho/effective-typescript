// ITEM 13 - TYPES VS INTERFACES

// You can declare types and interfaces the same for objects and fns
// Also can use index signature:
type TDict = { [key: string]: string }
interface IDict { [key: string]: string }

type tFunc = (x: number) => number;
type tFuncWithProps = {
  (x: number): number;
  prop: string;
}
interface IFunc {
  (x: number): number;
  prop: string;
}

// Works with generics
type TPair<T> = { 
  first: T;
  second: T;
}

interface IPair<T> { 
  first: T;
  second: T;
}

// Types and interfaces can extend each other as well
type someTypeExample = {
  first: string;
}
interface IExtend extends someTypeExample {
  second: number;
}

type TExtends = IExtend & {
  third: boolean;
};

// Interface cannot extend a complex type unless using "type" and "&"

// classes can extend both

// DIFFERENCES??

// Union types but no union interfaces
type AOrB = 'A' | 'B';
// Extending union types are useful
type Input = { test: string };
type Output = { result: boolean };
interface variableMap13 {
  [name: string]: Input | Output;
};

type namedVariable13 = (Input | Output) & {
  name: string;
};

const tester13: variableMap13 = { someName: { test: 'test' } };
const tester13Again: namedVariable13 = { name: 'some string', result: true };
// Types are more capable, and can do mapped or conditional types
// Can do arrays and tuples more easily:
type Pair = [number, number];
type StringList = string[];
type NamedNums = [string, ...number[]];

// You can do smth like a tuple in interface but lose all the tuple methods
interface fakeTuple {
  0: number;
  1: number;
  length: 2;
};

// HOWEVER...Interfaces can be AUGMENTED! AKA Declaration merging
// Think about ES2015+ when array methods got .find, .some, etc
interface IState13 {
  name: string;
  capital: string;
}

interface IState13 {
  population: number;
}

const someWyoming: IState13 = {
  name: 'Wyoming',
  capital: 'Cheyenne',
  population: 500_000,
}


// REMEMBER:
// For complex types, use types (see variableMap13 example)
// For augmenting or declaration merging, use interfaces
// consistency in codebase is key