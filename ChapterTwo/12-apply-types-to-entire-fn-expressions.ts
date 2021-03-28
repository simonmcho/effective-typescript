// ITEM 12 - FN EXPRESSIONS SHOULD HAVE TYPES APPLIED

// Advantage of fn expression is you can apply a type declaration to the entire fn at once
// And reduces repetition:
type BinaryCalc = (firstNum: number, secondNum: number) => number;
const add: BinaryCalc = (firstNum, secondNum) => firstNum + secondNum;
const subtract: BinaryCalc = (firstNum, secondNum, thirdNum) => firstNum - secondNum;
const times: BinaryCalc = (firstNum, secondNum) => firstNum * secondNum;
const divide: BinaryCalc = (firstNum, secondNum) => firstNum / secondNum;

// Good for libraries - EG React has MouseEventHandler type instead of specifying MouseEvent for one of the fn params

// Another good reason is to match the fn signature of another fn
const responseP = fetch('/quote?by=Mark+Twain'); // TYpe is Promise<Response>

async function getQuote() {
  const response = await fetch('/quote?by=Mark+Twain');
  const quote = response.json();
  return quote;
};
// There's a bug:
// If fetch fails, it returns a response with some explanation like "404 not found"
// This is not a json, so there will be a "response is not JSON" at token something error
// This obscures the real, 404 error response

// Type declaration in fetch lib looks like this:
declare function fetch(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response>;

// So we can write checkedFecth like this:
async function checkedFetch(input: RequestInfo, init?: RequestInit) {
  const response = await fetch('/sometEndpoint');
  if (!response.ok) {
    // Convert to rejected promise here:
    throw new Error('Request failed: ' + response.status);
  }
  return response;
}
// But write it more concisely with fn expressions
const checkedFetchExpress: typeof fetch = async (input, init) => {
  const response = await fetch('/someEndpoint');
  if (!response.ok) {
    throw new Error('Request failed: ' + response.status);
  }
  return response;
}

// The above type annotation guarantees return type of checkedFetchExpress is same as return type of fetch 
// If you were returning new error instead of throwing, the not assignable error would have caught it

// APPLY TYPE ANNOTATIONS!
// USE typeof fn TO MATCH SIGNATURE OF ANOTHER FN!