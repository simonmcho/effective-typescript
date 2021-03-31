// ITEM 14 - Use Type Operations and Generics to avoid repeating yourself

// Don't repeat yourself!
interface Person14 {
  firstName: string;
  lastName: string;
}

interface PersonWithBirthdate extends Person14 {
  birth: Date;
};

type PersonWithBirthdateType = Person14 & { birth: Date };

// If you want to "detract" instead of extend:
interface State14 {
  userId: string;
  pageTitle: string;
  pageNumber: number;
  recentFiles: string[];
};

type TopNavState = {
  userId: State14['userId'];
  pageTitle: State14['pageTitle'];
  recentFiles: State14['recentFiles'];
};

// Or mapped type. Mapping types are the type system equivalent of looping over fileds in an array

type TopNavState14 = {
  [key in 'userId' | 'pageTitle' | 'recentFiles']: State14[key];
}

// Or use Pick:
type TopNavState14WithPick = Pick<State14, 'userId' | 'pageTitle' | 'recentFiles'>;

// Pick is a generic type. Pick takes 2 types, T and K, where T is a generic and K is the key, and returns a third type

// Uniom type repetitions...
interface SaveAction {
  type: 'save'
};
interface LoadAction {
  type: 'load';
};
type Action = SaveAction | LoadAction;
type ActionType = 'save' | 'load'; // Repeated types!

type ActionTypeProper = Action['type']; // Type is 'save' | 'load'

// Diff between types and interfaces here...using Pick will give you an INTERFACE with a "type" property
type ActionTypeAgain = Pick<Action, 'type'>; // returns { type: 'save' | 'load' };

// Another example of looping...
interface Options14 { 
  width: number;
  height: number;
  color: string;
  label: string;
}
// Instead of re-writing all the fields:
type OptionsUpdate14 = { [key in keyof Options14]?: Options14[key] };

// You might have a scenario where you want to define a type that matches the shape of a VALUE:
const SOME_INITIAL_OPTIONS_OBJ_BEFORE_TYPE_IS_DEFINED = {
  width: 100,
  height: 500,
  color: '#000',
  label: 'VGA',
};

type OptionsBasedOffValue = typeof SOME_INITIAL_OPTIONS_OBJ_BEFORE_TYPE_IS_DEFINED;
// This executes JS' runtime typeof operator, but oeprates at level of TS types and is more precise.
// But usually better to define types first

const getUserInfo = (userId: string) => {
  return {
    userId,
    name: 'Sam',
  };
}

const GetUserInfoFunctionType = typeof getUserInfo;

// Imagine if getUserInfo is a 3rd party api function
type UserInfo14 = ReturnType<typeof getUserInfo>; // ReturnType generic helps with this


// ReturnType operates on typeof GetUserInfo, NOT the VALUE of getUserInfo


// HOW TO CONSTRAIN PARAMETERS IN A GENERIC TYPE - USE EXTENDS (T extends SomeType):
interface Name14 {
  first: string;
  last: string;
};

type DancingDuo<T extends Name14> = [T, T];

const coupleOne14: DancingDuo<Name14> = [
  { first: 'Fred', last: 'Astaire' },
  { first: 'Ginger', last: 'Rogers' }
];
const coupleTwo14: DancingDuo<{ first: string }> = [ // does not satisfy constraint Name14
  { first: 'Fred' },
  { first: 'Ginger' },
];

type firstLast14 = Pick<Name14, 'first' | 'last'>;

// DRY principle applies to types
// Name types rather than repeating them
// Use extends (subset of) to avoid repeating fields
// use keyof, typeof, indexing, and mapped types
// Generics are equivlaent to functions for types. Use them to map between types
// Use std libraries for generic types defined such as Pick, Partial, and ReturnType
type OptionalName14 = Partial<Name14> // makes types of Name14 optional
