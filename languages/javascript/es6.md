[The Howlin Developer Guide](/index.md)



ECMAScript 6
============

[Back to JavaScript](./index.md)


## Contents


- [Destructuring](##Destructuring)
  - [Destructuring Arguments](###Destructuring Arguments)
- [Template Strings](##Template Strings)
- [Block Scoping - let and const](##Block Scoping - let and const)
- [Classes](##Classes)
- [Arrow Functions](##Arrow Functions)
- [Lexical Context Binding](##Lexical Context Binding)
- [Modules](##Modules)
- [Generators](##Generators)


## Destructuring


If we want to extrapolate some vars from this object...
```javascript
var foo = {
  bar: 1,
  baz: 2
};
```

Instead of writing out this:
```javascript
var bar = foo.bar; var baz = foo.baz;
```

I can write this:
```javascript
var { bar, baz } = foo;

bar // 1
baz // 2
```

This is good for grabing a quick local ref to a long var name.
Note: var { one, two } = foo; will not work, the vars must match!

We can do the same with arrays...
```javascript
var tenses = ["me", "you", "he"];
```

this would grab "me"
```javascript
var [ firstPerson ] = tenses;
```

this would grab "me" and "you"
```javascript
var [ firstPerson, secondPerson ] = tenses;
```

I can do it this way, or more efficiently...
```javascript
Promise.all([promise1, promise2]).then(function(results) {
  var [ results1 ] = results;
});
```

...I can do it this way with destructured arguments
```javascript
Promise.all([promise1, promise2]).then(function([results1, results2]) {
  //...
});
```

You can destructure objects
```javascript
var foo = 2;

var obj = {
  bar: 1,
  foo,
}
```

If foo exists we can just reference it instead of declaring it again

You can initialise an object from a function call.

The method call at the bottom
```javascript
var name = "will";
var age = 34;

some.method({ name, age });
```

implicitly creates this object
```javascript
{
  name: name,
  age: age
}
```

### Destructuring Arguments

```javascript
function calcBmi(weight, height) {
  var bmi = weight / Math.pow(height, 2);
}
calcBmi(weight, height);
```

Add callback feature
```javascript
function calcBmi(weight, height, callback) {
  var bmi = weight / Math.pow(height, 2);
  if (callback) {
    callback(bmi);
  }
}
calcBmi(weight, height);
calcBmi(weight, height, function() {});
```

Add in a max
```javascript
function calcBmi(weight, height, max, callback) {
  var bmi = weight / Math.pow(height, 2);
  if (bmi > max) {
    console.log("you're overweight");
  }
  if (callback) {
    callback(bmi);
  }
}
calcBmi(weight, height, 25);
calcBmi(weight, height, null, function() {});
```

By now we're having to write in null! there must be a better way!
```javascript
function calcBmi({ weight, height, max = 25, callback }) {
  var bmi = weight / Math.pow(height, 2);
  if (bmi > max) {
    console.log("you're overweight");
  }
  if (callback) {
    callback(bmi);
  }
}
calcBmi(weight, height, 25);
calcBmi(weight, height, callback: function() {});
```

Now the order of the parameters doesn't matter and i can also rename them.
```javascript
function calcBmi({ weight: w, height: h, max = 25, callback })
```


## Template Strings


cating strings is broken in ES5. for e.g:
```javascript
var name = "will";
var thing = "party";
var greet = "hi, my name is \n" + 
            name + "and I like to \n" + 
            thing + ".";
```

With ES6 we can...
```javascript
var greet = `hi, my name ${name} 
  and I like to 
  ${thing}!`;
```
  
  
## Block Scoping - let and const


How scoping works in ES5: function scoping:
```javascript
var a = 1;

function() {
  var b = 2;
}

console.log(b); // undefined
```

block scoping
```javascript
var a = 1;

if (true) {
  var b = 2;
}

console.log(b); // 2
```

Now in ES6 we can use let 
```javascript
let a = 1;

if (true) {
  let b = 2;
}

console.log(b); // undefined
```

But rather, we should use `const`
because on the whole mutating a value is probably a bad idea.
But if we need to, use `let` it's mutabilty is now obvious!
```javascript
const a = 1;

if (true) {
  const b = 2;
}

console.log(b); // undefined
```


## Classes


Old way
```javascript
function Parent() {
  //const
}

Parent.prototype.foo = function() {...}
Parent.prototype.bar = function() {...}
```

New way
```javascript
class Parent {
  constructor() {...}
  foo() {...}
  bar() {...}
}

var parent = new Parent();

parent.foo();
```

With ES7 we can add properties and use `static` properties.
```javascript
class Parent {
  age = 34;
  constructor() {...}
  static foo() {...}
  bar() {...}
}

var parent = new Parent();

Parent.foo();
```

because the method is static `parent.foo()` will not work!

So now we can use `extends`
```javascript
class Child extends Parent {
  constructor() {
    super()
  }
  baz() {...}
}

var child = new Child();
child.bar();
```


## Arrow Functions


Old Function
```javascript
var foo = function(a, b) {
  return a + b;
};
```

Arrow Function
```javascript
var foo = (a, b) => {
  return a + b;
}
```

Helpful when you're passing functions as an argument.

this:
```javascript
do.something(function(a, b) {
  return a + b;
})
```

...becomes this:
```javascript
do.something((a, b) => { return a + b; })
```

or even... this!
```javascript
do.something((a, b) => a + b)
```

btw, this only works if it's a one-liner.

with only one argument, code gets even leaner!
```javascript
do.something(a => a++)
```

for instance
```javascript
[0,1,2].map(val => val++); // [1,2,3];
```


## Lexical Context Binding


```javascript
var module = {
  age: 30,
  foo: function() {
    console.log(this.age);
  }
};

module.foo(); // 30;
```

If i want to set a timeout, it will fail. this is now out of scope!
```javascript
var module = {
  age: 30,
  foo: function() {
    setTimeout(function() {
      console.log(this.age);
    }, 100);
  }
};

module.foo(); // undefined
```

The old workaround `.bind(this)`...
```javascript
var module = {
  age: 30,
  foo: function() {
    setTimeout(function() {
      console.log(this.age);
    }.bind(this), 100);
  }
};
```

Becomes: (`this` now points to `module`)
```javascript
var module = {
  age: 30,
  foo: function() {
    setTimeout(() => {
      console.log(this.age);
    }, 100);
  }
};
```

This can catch you out with jQuery
```javascript
$("some-thing").with().jQuery(() => {
  $(this) // this `this` no longer refers to the DOM event!
});
```

For the old jQuery logic you should instead use the old `function` keyword.
```javascript
$("some-thing").with().jQuery(function() {
  $(this) // this `this` no longer refers to the DOM event!
});
```


## Modules


Current Setup - a file called myModule
```javascript
module.exports.foo = function() {...};

module.exports.bar = function() {...};
```

or we could just export everything with a function:
```javascript
module.exports = function() {...}
```

another file
```javascript
var myModule = require("myModule");

var foo = myModule.foo;
```

with ES6 we use `import` instead of `require`
```javascript
import myModle from "myModule";
```

we can also destructure this like so
```javascript
import { foo, bar } from "myModule";
import { each, omit } from "lodash";
```

or we can rename the values...
```javascript
import { foo as foolish } from "myModule";
```

module.exports becomes
```javascript
export default function() {...}
```

or we could export values individually
```javascript
export function foo() {...}

export var foo = 3;
```


## Generators


A pausable or iterable function

```javascript
var myGen = function*() {
  var one = yield 1;
  var two = yield 2;
  var three = yield 3;
  console.log(one, two, three);
};
var gen = myGen(); // get the generator ready to run

console.log(gen.next()); // {value:1, done: false}
console.log(gen.next()); // {value:2, done: false}
console.log(gen.next()); // {value:3, done: false}
console.log(gen.next()); // {value:undefined, done: true}
console.log(gen.next()); // errors because you can't call next() on a closed generator!
```

Seem pointless?
It's not!

Give me a generator
```javascript
function smartCode(generator) {
  
  // get the generator ready to run
  var gen = generator();
  
  // get my first yielded value
  var yielded Val = gen.next();
  
  // if it's a promise, wait for it to fulfill and pass the value back into the generator
  if(yieldedVal.then) {
  
    // it's a promise!!!
    yieldedVal.then(gen.next);
  }
}
```

So, we can ammend the above to recieve values - promises, returned.
```javascript
var myGen = function*() {
  var one = yield $.get('/api/friends');
  var two = yield $.get('/api/profile');
  var three = yield $.get('/api/tweets');
  console.log(one, two, three);
};
```

Using Bluebird
```javascript
Promise.coroutine(function* () {
  var tweets = yield $.get('tweets.json');
  console.log(tweets);
})();


Promise.coroutine(function* () {
  var tweets = yield $.get('tweets.json');
  var profile = yield $.get('profile.json');
  var friends = yield $.get('friends.json');
  console.log(tweets, profile, friends);
})();
```

Yield Objects of Promises
```javascript
Promise.coroutine(function* () {
  var data = yield {
    tweets: $.get('tweets.json'),
    profile: $.get('profile.json')
  };
  console.log(data.tweets, data.profile);
})();
```

Yield Arrays of Promises (this part may be destructured!)
```javascript
Promise.coroutine(function* () {
  var [tweets, profile] = yield [
    $.get('tweets.json'),
    $.get('profile.json')
  ];
  console.log(data.tweets, data.profile);
})();
```
