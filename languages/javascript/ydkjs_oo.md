[The Howlin Developer Guide](/index.md)



You Dont Know JS - Object Orienting
===================================

[Back to JavaScript](./index.md)
[More You Dont Know JS](./ydkjs.md)


## Contents


- [Definition](##Definition)
- [The Module Pattern](##The Module Pattern)

- [dude](##dude)


## JS is Object Based


- prototype
- "Inheritance" vs. "Behavior Delegation"

C++ and Java are not object-oriented, but rather "class" oriented. Only two languages, Lua and JavaScript, that deserve the moniker "object" oriented. These two are the only ones you can create an objects without a class.

There are no "classes" in JavaScript. JavaScript is not a "class-based" language, but rather an "object-based" language.


## OO Paterns


Singleton
```javascript
 1 │  var Router = function() {
 2 │    // Singleton!
 3 │    if (Router.__instance__) {
 4 │      return Router.__instance__;
 5 │    }
 6 │  
 7 │    Router.__instance__ = this;
 8 │    this.routes = {};
 9 │  };
10 │  
11 │  Router.prototype.setRoute = function(match,fn) {
12 │    this.routes[match] = fn;
13 │  };
14 │  
15 │  var myrouter = new Router();
16 │  var another = new Router();
17 │  
18 │  myrouter == another;
```

Another Singleton
```javascript
 1 │  var Router = function() {
 2 │    // Singleton!
 3 │    if (Router.__instance__) {
 4 │      return Router.__instance__;
 5 │    }
 6 │  
 7 │    function setRoute(match,fn) {
 8 │      routes[match] = fn;
 9 │    }
10 │  
11 │    var routes = {};
12 │    var publicAPI = Router.__instance__ = {
13 │      setRoute: setRoute
14 │    };
15 │    return publciAPI;
16 │  };
17 │  
18 │  
19 │  var myrouter = new Router();
20 │  var another = new Router();
21 │  
22 │  myrouter == another;
```

Observer
```javascript
 1 │  function PageController(router) {
 2 │    this.router = router;
 3 │    this.router.on("navigate",
 4 │      this.fetchPage.bind(this)
 5 │    );
 6 │  }
 7 │  PageController.prototyep.fetchPage = function(d) {
 8 │    $.ajax({
 9 │      url: d.page_url
10 │    })
11 │    .done(this.loaded.bind(this,d.page_url));
12 │  };
13 │  PageController.prototype.loaded = function(d,u) {
14 │    // display the page content from `d`
15 │    // ...
16 │    this.router.emit("pageLoaded", u);
17 │  };
18 │  
19 │  var router = new Router();
20 │  var thepage = new PageController(router);
```


## Prototype


Every single "object" is built by a constructor function (constructor call).

Each time a constructor is called, a brand new object is created.

In the Classical Model, an object inherits from its class on instanstiation.

In JS, a constructor makes an object *linked to* its own prototype.

Classical creates a copy, JS creates a reference.

## An Example


The global JS `Object` function is linked to an object via `Object.prototype`.
This is where the object methods `toString()`, `valueOf()`, etc are defined.

```javascript
 1 │  function Foo(who) {
 2 │    this.me = who;
 3 │  }
 4 │  Foo.prototype.identify = function() {
 5 │    return "I am" + this.me;
 6 │  };
 7 │  
 8 │  var a1 = new Foo("a1");
 9 │  var a2 = new Foo("a2");
10 │  
11 │  a2.speak = function() {
12 │    alert("Hello, " + this.identify() + ".");
13 │  };
14 │  
15 │  a1.constructor === Foo;
16 │  a1.constructor === a2.constructor;
17 │  a1.__proto__ === Foo.prototype;
18 │  a1.__proto__ === a2.__proto__;
```

`Foo.prototype` points to the object that is always created with a new function
`.constructor` is a method on *that* object that points to *that* function
`new Foo()` will create a new object that is linked to the `Foo.prototype` object
`__proto__` is *that* link from `new Foo()` to `Foo.prototype` 
`a1.__proto__` is synonymous with `Object.getPrototypeOf(a1)`

thus:
```javascript
15 │  a1.constructor === Foo;
17 │  a1.__proto__ === Foo.prototype;
```

is a getter function on the Object.prototype and returns the internal prototype
linkage `[[Prototype]]` of whatever `this` is.

dunder

Line 1 creates a `Foo` function linked to an object via `.prototype`. That object is also linked to the `Foo` function via `.constructor`. 

> `.constructor` is not resemblent of what created that object.

Line 4 adds an `identify` property directly on the Foo object.

Line 8 creates a new Foo object, which does the following:

1. Creates a new Foo object
2. Link the new Foo object the Foo function's prototype object
3. `this` points at that new Foo object
4. Returns `this` which gets assigned to `a1`

> It's Like a side channel
>  - create an object
>  - link it
>  - bind it
>  - return it

There is no classes, inheritance, or instantiation in JavaScript.

Line 9 does the same 4 things as Line 8, but with a new Foo object

Line 11 adds a `speak` property to the `a2` object. `a1.speak` would not work, because `speak` is only on `a2` right now.

There is no `constructor` property on `a1` on line 15. Because it doesn't exist on `a1`, it goes up the prototype chain via prototype linkages called `[[Prototype]]` to look for `constructor`. Because Foo's object has a `constructor` property pointing back to the `Foo` function, it is returned.

Line 15 and 16 return true.

There is no `__proto__` (dunder proto) on `a1`, nor on Foo's prototype. There is `__proto__` on Object's prototype though, which is linked to Foo's prototype via `[[Prototype]]`.

`__proto__` is a getter function that returns the prototype linkage to the `this` binding.

Line 17 returns `a1`'s `__proto__` (Foo's prototype) which a public property that exposes an internal characteristic. Line 17 evaluates to true;

Line 18 evaluates to true because `a1.__proto__` is `Foo.prototype` and `a2.__proto__` is `Foo.prototype`.

Because `__proto__` wasn't valid until ES6, ES5 added `Object.getPrototypeOf()`.

`a1.__proto__ === Object.getPrototypeOf(a1);` evalutes to true because `getPrototypeOf()` returns that object's linkage.

`a2.__proto__ == a2.constructor.prototype;` evalutes to true. `constructor` and `prototype` are writable properties and can be changes to point anywhere.

### Prototype Linkages

`a1` doesn't have an `identify` property however when called, it will traverse the prototype chain and run `a1.__proto__.identify`.

The `this` binding when calling `a1.identify` evaluates to the `a1` object (rule 3 - implicit site binding).

```javascript
function Foo(who) {
  this.me = who;
}

Foo.prototype.identify = function() {
  return "I am" + this.me;
};

var a1 = new Foo("a1");
a1.identify(); // "I am a1"

a1.identify = function() { // <-- Shadowing!!
  alert("Hello, " + Foo.prototype.identify.call(this) + ".");
};

a1.identify(); // alerts: "Hello, I am a1."
```

Line 11 adds an `identify` property to the a1 object, which therefore shadows on the prototype chain. When calling `a1.identify`, the `identify` property on `a1` will always be returned, not `a1.__proto__.identify`.

Line 13 is necessary to call `identify` on `a1`'s prototype, because of shadowing.

```javascript
function Foo(who) {
  this.me = who;
}

Foo.prototype.identify = function() {
  return "I am" + this.me;
};

Foo.prototype.speak = function() {
  alert("Hello, " + this.identify() + "."); // super unicorn magic
}

var a1 = new Foo("a1");
a1.speak(); // alerts: "Hello, I am a1"
```

### Objects Linked

```javascript
function Foo(who) {
  this.me = who;
}
Foo.prototype.identify = function() {
  return "I am" + this.me;
};

function Bar(who) {
  Foo.call(this, who);
}
// Bar.prototype = new Foo(); // Or...
Bar.prototype = Object.create(Foo.prototype);
// NOTE: .constructor is borked here, need to fix

Bar.prototype.speak = function() {
  alert("Hello, " + this.identify() + ".");
};

var b1 = new Bar("b1");
var b2 = new Bar("b2");

b1.speak(); // alerts: "Hello, I am b1."
b2.speak(); // alerts: "Hello, I am b2."
```

`Object.create()` does the first 2 of the 4 steps that the `new` keyword does:

1. Creates a new object
2. Links `this` to that object

### Inheritance vs Behavior Delegation

Inheritance: copy down
JavaScript: delegation up

These two are not equal. Therefore, fundamentally, JavaScript doesn't have inheritance, but does have Behavior Delegation.

### OLOO

OLOO: Objects Linked to Other Objects

`new Whatever` is class based, not JavaScript-y.

To replace `var b1 = new Bar()`:

```javascript
var b1 = Object.create(Bar.prototype);
Bar.call(b1, "b1");
```

Polyfill for Object.create
```javascript
if (!Object.create) {
  Object.create = function (o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}
```

Other resources:
https://gist.github.com/getify/5572383
https://gist.github.com/getify/5226305 (reflection)

How is JS's `[[Prototype]]` chain not like traitional/classical inheritance? It doesn't copy, it links.

Behavior delegation is better than classical inheritance because the linking allows dynamic function changes. In classical inheritance there is a "snapshot" of the class that creates the object, so adding methods to objects afterwards is necessary.



# 4. Async Patterns

### Callbacks

Callbacks are a way to take something fundamentally asynchronus and express it in a way that is possible to reason about the code in a synchronus fashion.

Callbacks are continuations. A way to split a function, execute the first split, then continue and execute the next split later.

```javascript
setTimeout(function(){
  console.log("callback");
},1000);
```

#### Callback Hell/Pyramid of Doom

```javascript
setTimeout(function(){
  console.log("one");
  setTimeout(function(){
    console.log("two");
    setTimeout(function(){
      console.log("three");
    },1000);
  },1000);
},1000);
```

Callback hell has nothing to do with indentation. 

```javascript
function one(cb) {
  console.log("one");
  setTimeout(cb,1000);
}
function two(cb) {
  console.log("two");
  setTimeout(cb,1000);
}
function three(cb) {
  console.log("three");
}

one(function(){
  two(three);
});
```

^continuation passing example

Callbacks are an inversion of control. We are giving off control and hoping our program continues execution when we expect it.

#### Separate Callbacks Pattern

```javascript
function trySomething(ok,err){
  setTimeout(function(){
    var num = Math.random();
    if (num > 0.5) ok(num);
    else err(num);
  },1000);
}

trySomething(
  function(num){
    console.log("Success: " + num);
  },
  function(num){
    console.log("Sorry: " + num);
  }
);
```

#### Error-first Pattern (Node style)

```javascript
function trySomething(cb){
  setTimeout(function(){
    var num = Math.random();
    if (num > 0.5) cb(null,num);
    else cb("Too low!");
  },1000);
}

trySomething(function(err,num){
  if (err) {
    console.log(err);
  }
  else {
    console.log("Number: " + num);
  }
});
```

#### Nested-callback Tasks

```javascript
function getData(d,cb) {
  setTimeout(function(){ cb(d);},1000);
}

getData(10,function(num1){
  var x = 1 + num1;
  getData(30,function(num2){
    var y = 1 + num2;
    getData(
      "Meaning of life: " + (x + y),
      function(answer) {
        console.log(answer);
        // Meaning of life: 42
      }
    );
  });
});
```

### Generators (yield)/Coroutines

Out with ES6/2015.

Run to completion invariant is no longer true with generators.

```javascript
function* gen() {
  console.log("Hello");
  yield null;
  console.log("World");
}

var it = gen();
it.next(); // prints "Hello"
it.next(); // print "World"
```

When you call a generator function an iterator is constructed. No execution of the function happens. Calling `.next()` starts the generator and runs till the next yield statement. Generators can start and stop any number of times.

`yield` is a two-way message passing mechanism.

### Promises

"continuation events"

```javascript
function getData(d) {
  return new Promise(function(resolve, reject){
    setTimeout(function(){ resolve(d); }, 1000);
  });
}

var x;

getData(10)
.then(function(num1){
  x = 1 + num1;
  return getData(30);
})
.then(function(num2){
  var y = 1 + num2;
  return getData("Meaning of life: " + (x + y));
})
.then(function(answer){
  console.log(answer);
  // Meaning of life: 42
});
```

### dude


Object-Orienting
================

Using prototypes
Inheritance vs/ Behavior Delegation or OO vs/ OLOO (Objects linked to other objects)

Every single object is built by a constructor call - e.g. new keyword

Inheritance - the blueprint metaphor
A class is the blueprint
This implies copying

An instance of a class will have access to its vars and methods

function Foo(who) {
  this.me = who;
}
Foo.prototype.identify = function() {
  return "I am " + this.me;
};

var a1 = new Foo("a1");
var a2 = new Foo("a2");

a2.speak = function() {
  alert("hello, " + this.identify() + ". ");
};
a1.constructor === Foo;
a1.constructor === a2.constructor;
a1.__proto__ === Foo.prototype; // "dunder" proto; a getter
a1.__proto__ === a2.__proto__;


// shadowing
function Foo(who) {
  this.me = who;
}
Foo.prototype.identify = function() {
  return "I am " + this.me;
};

var a1 = new Foo("a1");
a1.identify(); // I am a1

a1.identify = function() { // this is where shadowing happens
  alert("hello, " + Foo.prototype. identify.call(this)+".");
};
a1.identify(); // alerts: hello I am a1

Shadowing gives you the ability to make classes
e.g. have a very simple base class that you add to with Inheritance

Super unicorn magic - this always points to the same value 
up the inheritance chain

1. what is a constructor? 
- new in front of a fn call
2. what is the prototype chain & where does it come from? 
- internal linkage from one object to another by new or by object.create
3. how does the prototype linkage affect an object?
- method delegation
4. how do we find out where an objects prototype points to? 3 ways
- __proto__, Object.prototype, this.prototype

Prototypal Inheritance
======================

1. how is JS prototype chain not like traditional inheritance?
- delegation or linking rather than a copying
2. what does prototype delegation mean and how does it describe object 
linking in js?
- 
3. what are benefits of this design pattern?
- classes are a static mechanism, they cant be changed
- with delegation you have more flexibility

Async Patterns
==============

Look at the exercises for an example of side by side comparisons &
examples of generators & promises

callbacks - why are they not sufficient
generators
promises

// callback hell
setTimeout(function() {
  console.log("one");
  setTimeout(function() {
    console.log("two");
    setTimeout(function() {
      console.log("three");
    }, 1000);
  }, 1000);
}, 1000);

// theres another way
function one(cb) {
  console.log("one")
}...etc.

Inversion of Control
====================
handing off control in a callback; pattern used with generators

Generators(yield)
==========

Run to completion semantic; 
generators are a new type of function that doesnt have the run to completion
semantic

You can use the yield keyword to pause a fn in the middle of execution

function* gen() {
  console.log("hello");
  yield;
  console.log("world");
}
var it = gen();
it.next(); // hello
it.next(); // world

you pause internally - it gives you an iterator

how is this related to Async?
yield - a two-way message-passing mechanism

function getData(d) {
  setTimeout(function() { run(d); }, 1000);
}
var run = coroutine(function*() {
  var x = 1 + (yield getData(10));
  var y = 1 + (yield getData(30));
  var answer = (yield getData("meaning of life: " + (x+y)));
  console.log(answer);
  // meaning of life 42
});

run();

Promises
========

Metaphor - You order a burger, pay, then get a #

Your burger isnt ready so you have to wait for your # to be called

promises are transactions that promise a future value
'continuation events'

when you call the fn it gives you a promise; an object on which you can
register an event handler that listens for the return

you call the resolved fn or rejected fn

// async pattern: native promise tasks
function getData(d) {
  return new Promise(function(resolve, reject) {
    setTimeout(function(){ resolve(d); }, 1000);
  });
}
 
var x;
get Data(10)
.then(function(num1) {
  x = 1 + num1;
  return getData(30);
})
.then(function(num2) {
  var y = 1 + num2;
  return getData("Meaning of life: " + (x + y));
})
.then(function(answer) {
  console.log(answer); // meaning of life 42
});

If an object is "thenable" it will give you a promise wrapper
you can use promise.resolve

Promises solve trust issues

https://github.com/getify/asynquence

asynquence.js - library created to automatically chain promises
less boilerplate so its easier to work with promises

generators + promises

generators dont have solution to inversion of control problem
yield promise

1. what is callback hell? why do callbacks suffer from inversion of control?
- inversion of control trust issue
- 
2. how do you pause a generator? how do you resume?
- yield
- .next
3. what is a promise? 
- a reciept
4. how does a promise resolve the inversion of control issue?
- we have to wait for the response but we control what happens next
5. how do we combine promises and generators for flow control?
- yield out a promise from a generator


## devanb
