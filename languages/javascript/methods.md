[The Howlin Developer Guide](/index.md)



Javascript Methods
==================

[Back to JavaScript](./index.md)


## Contents


- [Array](##Array)
- [Function](##Function)
- [Number](##Number)
- [Object](##Object)
- [String](##String)
- [Unsorted](##Unsorted)


## Array


### Common
forEach
map
pop
push
reduce
shift
unshift
splice
indexOf
slice
filter
concat
includes
lastIndexOf
find
findIndex
sort
reverse
join

### Rare
copyWithin
entries
every
fill
flatMap
flatten
keys
reduceRight
some
toLocaleString
toSource
toString
values

### Strange
Array.from
Array.isArray
Array.observe
Array.of
Array.unobserve
get Array[@@species]
Array.prototype[@@iterator]


## Function


Function.prototype.apply()
Function.prototype.bind()
Function.prototype.call()
Function.prototype.isGenerator()
Function.prototype.toSource()
Function.prototype.toString()


## Number


Number.isFinite()
Number.isInteger()
Number.isNaN()
Number.isSafeInteger()
Number.parseFloat()
Number.parseInt()
Number.prototype.toExponential()
Number.prototype.toFixed()
Number.prototype.toLocaleString()
Number.prototype.toPrecision()
Number.prototype.toSource()
Number.prototype.toString()
Number.prototype.valueOf()


## Object


Object.assign()
Object.create()
Object.defineProperties()
Object.defineProperty()
Object.entries()
Object.freeze()
Object.getNotifier()
Object.getOwnPropertyDescriptor()
Object.getOwnPropertyDescriptors()
Object.getOwnPropertyNames()
Object.getOwnPropertySymbols()
Object.getPrototypeOf()
Object.is()
Object.isExtensible()
Object.isFrozen()
Object.isSealed()
Object.keys()
Object.observe()
Object.preventExtensions()
Object.prototype.__defineGetter__()
Object.prototype.__defineSetter__()
Object.prototype.__lookupGetter__()
Object.prototype.__lookupSetter__()
Object.prototype.eval()
Object.prototype.hasOwnProperty()
Object.prototype.isPrototypeOf()
Object.prototype.propertyIsEnumerable()
Object.prototype.toLocaleString()
Object.prototype.toSource()
Object.prototype.toString()
Object.prototype.unwatch()
Object.prototype.valueOf()
Object.prototype.watch()
Object.seal()
Object.setPrototypeOf()
Object.unobserve()
Object.values()


## String


### Common
indexOf
lastIndexOf
search
slice
substr
substring
replace
toLowerCase
toUpperCase
trim
concat
charAt
charCodeAt
split
match
localeCompare

### Rare
anchor
big
blink
bold
codePointAt
endsWith
fixed
fontcolor
fontsize
includes
italics
link
normalize
padEnd
padStart
quote
repeat
small
startsWith
strike
sub
sup
toLocaleLowerCase
toLocaleUpperCase
toSource
toString
trimLeft
trimRight
valueOf

### Strange
String.prototype[@@iterator]
String.fromCharCode
String.fromCodePoint
String.raw

### Properties
string.length


## Unsorted

JS reduce
---------
problem: nested function calls list this
  left(right(up(down(pacman))));
funcs: array of functions
  [left, right, up, down]
initialValue: pacman passed in as second arg something.reduce(fn, HERE);
```javascript
const flow = funcs => initialValue =>
  funcs.reduce((value, func) => func(value), initialValue);
```

