interface Square {
  width: number;
}

interface Rectangle extends Square {
  height: number;
}

type Shape = Square | Rectangle;

// Notice 2 errors below, Rectangle is a type but being used as value
// property height does not exist on shape
function calcArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    return shape.width * shape.height;
  }
  return shape.width * shape.width;
}
// instanceof check occurs at runtime
// Rectangle is a type so can't affect runtime behavior
// Part of TS to JS compilation is removal of interaces and types
// Below is a "proper way":
function calcAreaBetter (shape: Shape) {
  if ('height' in shape) {
    shape;
    return shape.width * shape.height;
  }
  return shape.width * shape.width;
}
// This works because property checks only involves values that are available at runtime
// But still allows compile time typechecker to refine `shape` type to `Rectangle`

// Another way is to intro a tag to explicitlys store the type in a way that's available at runtime:
interface AnotherSquare {
  kind: 'square';
  width: number;
}

interface AnotherRectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

type AnotherShape = AnotherSquare | AnotherRectangle;

function calcAreaAnotherWay (shape: AnotherShape) {
  if (shape.kind === 'rectangle') {
    shape;
    return shape.width * shape.height;
  }
  return shape.width * shape.width;
}
// AnotherShape type here is known as a "tagged union"

// Another way is to write in a way type (compile time) and value (runtime) are both available
class ClassSquare {
  constructor(public width: number) {}
}

class ClassRectangle extends ClassSquare {
  constructor(public width: number, public height: number) {
    super(width);
  }
}

type ClassShape = ClassSquare | ClassRectangle;

function calcAreaWithClasses (shape: Shape) {
  if (shape instanceof ClassRectangle) {
    shape;
    return shape.width * shape.height;
  }
  return shape.width * shape.width;
}
// This works because ClassRectangle introduces both type AND value. Interfaces only introduce a type

// The ClassRectangle in `type ClassShape = ClassSquare | ClassRectangle` refers to type
// ClassRectangle in `shape instanceof ClassRectangle` refers to value (chapter 8 distinguies type vs value)