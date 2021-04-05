// ITEM 15 - USE INDEX SIGNATURES FOR DYNAMIC DATA

type Rocket15 = {[property: string]: string};

const firstRocket: Rocket15 = {
  name: 'Falocn 9',
  variant: 'v1.0'
}

// [property: string]: string is the INDEX SIGNATURE
// It has name and types for the keys, and type for the value

// DOWNSIDES
// • Allows any keys, including incorrect ones. `Name` would be valid, when it "should" be `name`
// • Does not have any required keys
// • Cannot have distinct types for different keys
// * TS language services can't autocomplete

// INDEX SIGS NOT PRECISE...INTERFACE BETTER

// WHEN TO USE THEN???
// For dynamic data, eg csv file

type csvParsed = {[ columnName: string ]:string };

function parseCSV(input: string): csvParsed[] {
  const lines = input.split('\n');
  const [header, ...rows] = lines;
  return rows.map((rowStr) => {
    const row: csvParsed = {};
    rowStr.split(',').forEach((cell, index) => {
      row[header[index]] = cell;
    });
    return row;
  })
}

// There's no way to know in advance what the actual column names are

// You can assert if you do, but theres' no guarantee at runtime
interface ProductRow15 { 
  productId: string;
  name: string;
  price: string;
}

declare let csvData15: string; // declare is used to "declare" variables that doesn't exist in TS
const products15 = parseCSV(csvData15) as unknown as ProductRow15[];
// Check pat 201...every access now requires a check for runtime safety

// Try using keyword `Record` as well, if index sig string is too broad:
type Vec15 = Record<'x' | 'y' | 'z', number>;
// this is same as:
type Vec15SameAsAbove = {
  x: number;
  y: number;
  z: number;
}

// Use mapped type as well:
type MappedVec15 = {[ key in 'a' | 'b' | 'c']: key extends 'b' ? string : number};
// this is same as
type MappedVec15SameAsAbove = {
  a: number;
  b: string;
  c: number;
};

// Use keyof for advanced index sigs to define types with generics

type OptionsFlags<T> = {
  [Property in keyof T]: number;
};

type FeatureFlags = {
  darkMode: boolean;
  newUser: () => void;
};

type FeatureOptions = OptionsFlags<FeatureFlags>;

// REMEMBER:
// USE INDEX SIGS WHEN PROPERTIES OF AN OBJECT CANNOT BE KNOWN UNTIL RUNTIME
// CONSIDER ADDING UNDEFINED TO VALUE TYPE OF AN INDEX SIGNATURE FOR SAFER ACCESS
