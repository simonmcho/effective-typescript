'use strict';
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

// TS types can be very expansive due to its nature of structural typing
interface Options {
  title: string;
  darkMode?: boolean;
}

const o1: Options = { title: 'one', darkmode: false }; // compile time error due to type
const o2: Options = document;
const o3: Options = new HTMLAnchorElement;

// Just like the lack of type annotation doesn't throw compile time errors,
// type assertions don't either:
const o4: Options = { dark: false, title: 'hello' } as Options;

// Just better to do type declarations.
// You can also tell TS to expect additional props using this index signature:
interface OptionsAnother {
  darkMode?: boolean;
  [otherOptions: string]: unknown;
}

// Check Item 15 as to why it's good and bad
const o5: OptionsAnother = { darkMode: true, what: 4, how: 'good' };

// Weak type checking happens when all props of an object are optional:
interface LineChartOptions {
  logscale?: boolean;
  invertedYAxis?: boolean;
  areaChart?: boolean;
}

const someLineChart: LineChartOptions = {
  something: 'hi';
}

// The above doesn't work because for weak types, TS adds another check to ensure at least one value type and declared type have at least one proeprty check in common
// Good for catching typos, not just excessive prop checking

const intermediateBypasserDoesntWork = {
  something: 'hi'
}

// this won't work
const someLineChartDoesntWork: LineChartOptions = intermediateBypasserDoesntWork;
// But this does
const someLineChartWorks = { something: 'hi' } as LineChartOptions;


// REMEMBER: Obejct literals as variables or args goes excess property checking.
// Structural type checking - min number of props fulfilled, via intermediate variable
// Excess type checking - object literals