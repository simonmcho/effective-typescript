var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Notice 2 errors below, Rectangle is a type but being used as value
// property height does not exist on shape
function calcArea(shape) {
    if (shape instanceof Rectangle) {
        return shape.width * shape.height;
    }
    return shape.width * shape.width;
}
// instanceof check occurs at runtime
// Rectangle is a type so can't affect runtime behavior
// Part of TS to JS compilation is removal of interaces and types
// Below is a "proper way":
function calcAreaBetter(shape) {
    if ('height' in shape) {
        shape;
        return shape.width * shape.height;
    }
    return shape.width * shape.width;
}
function calcAreaAnotherWay(shape) {
    if (shape.kind === 'rectangle') {
        shape;
        return shape.width * shape.height;
    }
    return shape.width * shape.width;
}
// AnotherShape type here is known as a "tagged union"
// Another way is to write in a way type (compile time) and value (runtime) are both available
var ClassSquare = /** @class */ (function () {
    function ClassSquare(width) {
        this.width = width;
    }
    return ClassSquare;
}());
var ClassRectangle = /** @class */ (function (_super) {
    __extends(ClassRectangle, _super);
    function ClassRectangle(width, height) {
        var _this = _super.call(this, width) || this;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    return ClassRectangle;
}(ClassSquare));
function calcAreaWithClasses(shape) {
    if (shape instanceof ClassRectangle) {
        shape;
        return shape.width * shape.height;
    }
    return shape.width * shape.width;
}
// This works because ClassRectangle introduces both type AND value. Interfaces only introduce a type
// The ClassRectangle in `type ClassShape = ClassSquare | ClassRectangle` refers to type
// ClassRectangle in `shape instanceof ClassRectangle` refers to value (chapter 8 distinguies type vs value)
