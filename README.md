# Sorted Array #

An implementation of John von Neumann's sorted arrays in JavaScript. Implements insertion sort and binary search for fast insertion and deletion.

## Installation ##

Sorted arrays may be installed on [node.js](http://nodejs.org/ "node.js") via the [node package manager](https://npmjs.org/ "npm") using the command `npm install sorted-array`.

You may also install it on [RingoJS](http://ringojs.org/ "Home - RingoJS") using the command `ringo-admin install javascript/sorted-array`.

You may install it as a [component](https://github.com/component/component "component/component") for web apps using the command `component install javascript/sorted-array`.

## Usage ##

The six line tutorial on sorted arrays:

```javascript
var SortedArray = require("sorted-array");
var sorted = new SortedArray([3, 1, 5, 2, 4]);
console.dir(sorted.array);                     // [1, 2, 3, 4, 5]
sorted.search(3);                              // 2
sorted.remove(3);                              // [1, 2, 4, 5]
sorted.insert(3);                              // [1, 2, 3, 4, 5]
```

You may pass an optional [compare function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) as a second argument to the `SortedArray` constructor.

You may also use the `SortedArray.comparing(property, array)` factory function to create a new `SortedArray` which compares values by their `property`. For example, to compare arrays by `length`:

```javascript
var SortedArray = require("sorted-array");
var sorted = SortedArray.comparing(length, [[3,3,3], [1], [5,5,5,5,5], [2,2], [4,4,4,4]]);
console.dir(sorted.array);              // [[1], [2,2], [3,3,3], [4,4,4,4], [5,5,5,5,5]]

function length(a) {
    return a.length;
}
```
