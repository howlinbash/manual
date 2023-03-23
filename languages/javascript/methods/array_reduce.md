[The Howlin Developer Guide](/index.md)



Array.prototype.reduce
======================

[Back to JavaScript](../index.md)
[Back to Methods](../methods.md)



problem: nested function calls list this
  left(right(up(down(pacman))));
funcs: array of functions
  [left, right, up, down]
initialValue: pacman passed in as second arg something.reduce(fn, HERE);
```javascript
const flow = funcs => initialValue =>
  funcs.reduce((value, func) => func(value), initialValue);
```
