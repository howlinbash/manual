[The Howlin Developer Guide](/index.md)



You Dont Know JS - Scope
========================

[Back to JavaScript](./index.md)
[More You Dont Know JS](./ydkjs.md)


## Contents


- [Introduction](##Introduction)
- [LHS & RHS](##LHS & RHS)
- [The Engine](##The Engine)
  - [Compile Time](###Compile Time)
  - [Run Time](###Run Time)
  - [Another Example](###Another Example)
- [Function Expressions](##Function Expressions)
- [Lexical Scope](##Lexical Scope)
- [The IIFE Pattern](##The IIFE Pattern)
- [Block Scope](##Block Scope)
  - [the `let` keyword](###the `let` keyword)
  - [Dynamic Scope](###Dynamic Scope)
- [Quiz](##Quiz)
- [Hoisting](##Hoisting)
- [This](##This)
  - [The Default Binding Rule](###The Default Binding Rule)
  - [The Implicit Binding Rule](###The Implicit Binding Rule)
  - [this binding confusion](###this binding confusion)
  - [The Explicit Binding Rule](###The Explicit Binding Rule)
  - [Hard Binding](###Hard Binding)
  - [The New Keyword](###The New Keyword)
  - [Precedence](###Precedence)


## Introduction


Compilation:
- Compile all the functions (don't execute them)
- Make boxes for all the variables (don't assign to them)
- Make code so engine can execute everything

Execution:
- Look up variables and functions
- execute the code the compiler created

```javascript
    // This statement will be broken up into 2 statements.
    var a = 2;

    // Declaration Operation: 
    var a;  

    // Initialisation Operation: 
    a = 2;  
```

We can break the engine up into 3 parts
 - **the engine** - start to finish compilation and execution
 - **the compiler** - parsing & code generation
 - **the scope** - collects and mantains variable look up list

**Summary**
 - Compiler declares a variable
   - and produces code for Engine to run to assign variable in next step
 - Engine looks up the variable in Scope and assigns to it


## LHS & RHS


LHS asks for the container; RHS references the container.

**Line 1**
```javascript
foo     LHS Reference    Target
 =      The Assignment
"bar";  RHS Reference    Source

// LHS         Give me the box
// RHS         What's in the box
// Assignment  Put this in the box
```

NB: There's not always an equals sign.
An RHS reference is not an LHS reference!


## The Engine


Find the declarations of functions and variables,
Put them into their appropriate scope slots.

```javascript
// This script
 1 │  var foo = "bar";
 2 │ 
 3 │  function bar() {
 4 │    var foo = "baz";
 5 │  }
 6 │  
 7 │  function baz(foo) {
 8 │    foo = "bam";
 9 │    bam = "yay";
10 │  }

// will become:
// Compilation                          // Execution
 1 │  var foo                            1 │      foo = "bar";
 2 │                                     2 │ 
 3 │  function bar() {                   3 │                 {
 4 │    var foo                          4 │        foo = "baz";
 5 │  }                                  5 │  }
 6 │                                     6 │  
 7 │  function baz(foo) {                7 │                    {
 8 │                                     8 │    foo = "bam";
 9 │                                     9 │    bam = "yay";
10 │  }                                 10 │  }
```


### Compile Time

Which declaration belongs to which scope?

`foo` is registered to the global scope
```javascript
 1 │  var foo
```
 
`bar` is registered to the global scope
```javascript
 3 │  function bar() {...}
```
 
`foo` is registered to the scope of `bar`
```javascript
 4 │    var foo
```

`baz` is registered to the global scope
and the implicit declaration `foo` is registered to the scope of `baz`
```javascript
 7 │  function baz(foo) {...}
```


### Run Time

We can extend the code with some function calls

```javascript
// This script
 1 │  var foo = "bar";
 2 │ 
 3 │  function bar() {
 4 │    var foo = "baz";
 5 │  }
 6 │  
 7 │  function baz(foo) {
 8 │    foo = "bam";
 9 │    bam = "yay";
10 │  }
11 │
12 │  bar();
13 │  baz();
```

A dialogue like this will occur for every reference

> EG: Hey global scope,
>     I have an LHS reference for a variable called foo.
>     Ever heard of it?
> CS: Sure compiler declared it earlier.
```javascript
 1 │      foo = "bar";
```
 
Or 

> EG: Hey scope of baz,
>     I have an LHS reference for a variable called bam.
>     Ever heard of it?
> CS: Nope. Go Fish.

In this case `bam` has not been declared
Engine then asks the outer scope (the global scope) the same question

(un)fortunately, global scope will then implicitly declare the var 
```javascript
 7 │                    {
 9 │    bam = "yay";
10 │  }
```


### Another Example

Compile Time
```javascript
 1 │  var foo = "bar";                   1 │  var foo
 2 │                                     2 │                                    
 3 │  function bar() {                   3 │  function bar() {                  
 4 │    var foo = "baz";                 4 │    var foo
 4 │                                     4 │                                    
 6 │    function baz(foo) {              6 │    function baz(foo) {             
 7 │      foo = "bam";                   7 │
 8 │      bam = "yay";                   8 │
 9 │    }                                9 │    }                               
10 │    baz();                          10 │
11 │  }                                 11 │  }                                 
12 │                                    12 │                                    
13 │  bar();                            13 │
14 │  foo;                              14 │
15 │  bam;                              15 │
16 │  baz();                            16 │
```

Run Time
```javascript
 1 │  var foo = "bar";                   1 │      foo = "bar";       // Step 1
 2 │                                     2 │                                    
 3 │  function bar() {                   3 │           bar() {                  
 4 │    var foo = "baz";                 4 │        foo = "baz";     // Step 3
 4 │                                     4 │                                    
 6 │    function baz(foo) {              6 │             baz(foo) {             
 7 │      foo = "bam";                   7 │      foo = "bam";       // Step 5
 8 │      bam = "yay";                   8 │      bam = "yay";       // Step 6
 9 │    }                                9 │    }                               
10 │    baz();                          10 │    baz();               // Step 4
11 │  }                                 11 │  }                                 
12 │                                    12 │                                    
13 │  bar();                            13 │  bar();                 // Step 2
14 │  foo;                              14 │  foo;    // "bar" (line 1)
15 │  bam;                              15 │  bam;    // "yay" (line 8)
16 │  baz();                            16 │  baz();  // Error!
```


## Function Expressions


If a statement starts with the word `function` it is a 'function declaration'.
Otherwise it is a 'function expression'.

```javascript
 1 │  var foo = function bar() {
 2 │    var foo = "baz";
 3 │  
 4 │    function baz(foo) {
 5 │      foo = bar; // (function can call itself)
 6 │      foo;       // function...
 7 │    }
 8 │    baz();
 9 │  };
10 │  
11 │  foo();
12 │  bar();         // Error! (function is hidden from global scope)
```

*Name your function expressions*

(3 reasons why)
1. In line 5 the function refers to itself. 
   - `this` wont work - `bar` does :-)
2. debugging
3. self documenting code.


## Lexical Scope


You can have lexical scope or dynamic scope

JS uses lexical scope

Lexical Scope means the scope that you write. The functions above illustrate the
scope you design by nesting one function within another

Lexical Scope = Compile time scope

Decisions of scope were made in author time ( not in compile time )o

> You can cheat lexical scope with
>  - `eval`
>  - `with`
> Dont!


## The IIFE Pattern


The Immediately Invoked Function Expression
http://benalman.com/news/2010/11/immediately-invoked-function-expression/

```javascript
 1 │  var foo = "foo";
 2 │  
 3 │  (function(){
 4 │  
 5 │    var foo = "foo2";
 6 │    console.log(foo); // "foo2"
 7 │  
 8 │  })();
 9 │  
10 │  console.log(foo); // "foo"
```


## Block Scope


### the `let` keyword

attach that variable implicitly to whatever block it appears in, rather than attaching it to the function
```javascript
 3 │    for (var i=0; i<bar.length; i++) {...}
```

if the variable inside the loop was a `var` instead or a `let`, it would be
scoped to the function.

Changing it to `let` keeps the variable solely inside the for loop
```javascript
 1 │  function foo() {
 2 │    var bar = "bar";
 3 │    for (let i=0; i<bar.length; i++) {
 4 │      console.log(bar.charAt(i));
 5 │    }
 6 │    console.log(i); // ReferenceError
 7 │  }
 8 │  
 9 │  foo();
```

Same with an if statement
```javascript
 1 │  function foo(bar) {
 2 │    if (bar) {
 3 │      let baz = bar;
 4 │      if (baz) {
 5 │        let bam = baz;                             
 6 │      }
 7 │      console.log(bam); // Error
 8 │    } 
 9 │    console.log(baz); // Error
10 │  }
11 │  
12 │  foo("bar");
```

> let does not hoist
> let uses implicit scoping

This would be an explicit version of the code above
This code was rejected however
```javascript
 1 │  function foo(bar) {
 2 │    let (baz = bar) {
 3 │      console.log(baz); // "bar"
 4 │    }
 5 │    console.log(baz); // Error
 6 │  }
 7 │  
 8 │  foo("bar");
```


### Dynamic Scope

If js used dynamic scope the code below would work
```javascript
 1 │  // theoretical dynamic scoping
 2 │  function foo() {
 3 │    console.log(bar); // dynamic!
 4 │  }
 5 │  
 6 │  function baz() {
 7 │    var bar = "bar";
 8 │    foo();
 9 │  } 
10 │  
11 │  baz();
```

when 3 can't find bar it would ask where was it called from and it would find
```javascript
 7 │    var bar = "bar";
```
in the scope of baz

> Lexical Scoping = Author time decision
> Dynamic Scoping = Run time decision


## Quiz


1. What Type of Scoping Rules Does Javascript have?
 - Lexical Scope
 - Cheating Lexical Scope
   - eval
   - with

2. What are the different ways you can create a new scope?
 - functions
 - catch box
 - curly braces with the let keyword.

3. What's the difference between undeclared and undefined?
 - undefined is a value
 - undefined means doesn't currently have a value. It's an empty placeholder
 - But there definitely was a declared variable. 
 - If there's not a declared variable you will return a reference error.


## Hoisting


Hoisting isn't actually a thing, it's a mental model to describe what happens
```javascript
 1 │  a;         // ???
 2 │  b;         // ???
 3 │  var a = b;
 4 │  var b = 2;
 5 │  b;         // 2
 6 │  a;         // ???
```

The declarations will be hoisted to the top of the code.
```javascript
 1 │  var a;
 2 │  var b;
 3 │  a;         // ???
 4 │  b;         // ???
 5 │  a = b;
 6 │  b = 2;
 7 │  b;         // 2
 8 │  a;         // ???
```
 
> All the LHS stuff is happening at compile time
> All the RHS stuff is happening at runtime

Functions will be hoisted first
```javascript
 1 │  var a = b();
 2 │  var c = d();
 3 │  a;                   // ???
 4 │  c;                   // ???
 5 │  
 6 │  function b() {       // This function declaration will be hoisted
 7 │    return c;
 8 │  }
 9 │  
10 │  var d = function() { // This function expression will not be hoisted
11 │    return b();
12 │  };
```

```javascript
 1 │  function b() {
 2 │    return c;       // when this is called from line 7, c is undefined
 3 │  }
 4 │  var a;
 5 │  var c;
 6 │  var d;            // when this is called from line 8, d is undefined
 7 │  a = b();
 8 │  c = d();
 9 │  a;                // undefined
10 │  c;                // undefined
11 │  d = function() {
12 │    return b();
13 │  };
```

Proof of functions hoisting first
```javascript
 1 │  foo(); // "foo"
 2 │  
 3 │  var foo = 2;
 4 │  
 5 │  funcion foo() {
 6 │    console.log("bar");
 7 │  }
 8 │  
 9 │  function foo() {
10 │    console.log("foo");
11 │  }
```  

> Q: Why does javascript pull out declarations ahead of time?
> A: Recursion!

This mutually recursive code would not work without hoisting
```javascript
 1 │  a(1);  // ??
 2 │  
 3 │  function a(foo) {
 4 │    if (foo > 20) return foo;
 5 │    return b(foo+2);
 6 │  }
 7 │  function b(foo) {
 8 │    return c(foo) + 1;
 9 │  }
10 │  function c(foo) {
11 │    return a(foo*2);
12 │  }
```  


## This


Every function, *while executing*, has a reference to its current execution
context, called `this`.

```javascript
 1 │  function foo() {
 2 │    console.log(this.bar);
 3 │  }
 4 │  
 5 │  var bar = "bar1";
 6 │  var o2 = { bar: "var2". foo: foo };
 7 │  var o3 = { bar: "bar3", foo: foo };
 8 │  
 9 │  foo();                  // "bar1"
10 │  o2.foo();               // "bar2"
11 │  o3.foo();               // "bar3"
```

The 4 rules to how the `this` keyword gets bound (in order of precedence):

1. The New Keyword
2. The Explicit Binding Rule
3. The Implicit Binding Rule
4. The Default Binding Rule

> What does the call site look like?


### The Default Binding Rule

In strict mode `this` will default to `undefined`.
Without strict mode `this` will reference the global object.
```javascript
 1 │  function foo() {
 2 │    console.log(this.bar);
 3 │  }
 4 │  
 5 │  var bar = "bar1";
 9 │  foo();                  // "bar1"
```


### The Implicit Binding Rule

When there is an object property reference at the call site, the IBR applies.
```javascript
 1 │  function foo() {
 2 │    console.log(this.bar);
 3 │  }
 4 │  
 6 │  var o2 = { bar: "var2". foo: foo };
 7 │  var o3 = { bar: "bar3", foo: foo };
 8 │  
10 │  o2.foo(); // "bar2" o2.foo is referencing an obj prop.
11 │  o3.foo(); // "bar3"
```

> Everything in javascript is a reference to a function or an object.
> Functions aren't copied or owned, they're referred to.


### this binding confusion

The user controls function `foo`, the user does not control function `baz`
The user is trying to make `baz` reference their `bar` from line 2
Why won't this work?

```javascript
 1 │  function foo() {
 2 │    var bar = "bar1";
 3 │    baz();
 4 │  }
 5 │  function baz() {        
 6 │    console.log(this.bar);
 7 │  }
 8 │  
 9 │  var bar = "bar2";
10 │  foo();          // ???
```

The Lexical Scoping mechanism and The `this` Scoping mechanism

It is impossible to create a crossover between the lexical environment and the `this` binding mechanism. They are 2 fundamentally different mechanisms and they don't cross over.

*The Wrong Answer*:
```javascript
 1 │  function foo() {
 2 │    var bar = "bar1";
 3 │    this.baz = baz;   // global.baz = global.baz??? (this line is a no op)
 4 │    this.baz();       // implicit binding
 5 │  }
 6 │  function baz() {
 7 │    console.log(this.bar);
 8 │  }
 9 │  
10 │  var bar = "bar2";
11 │  foo();                // default binding
```


### The Explicit Binding Rule

Both `.call()` and `.apply()` take a `this` binding as their first parameter.
(and also `.bind()`)
```javascript
 1 │  function foo() {
 2 │    console.log(this.bar);
 3 │  }
 4 │  
 5 │  var bar = "bar1";
 6 │  var obj = { bar: "bar2" };
 7 │  
 8 │  foo();         // "bar1"
 9 │  foo.call(obj); // "bar2" (use obj as my `this`)
```


### Hard Binding
 
```javascript
 1 │  function foo() {
 2 │    console.log(this.bar);
 3 │  }
 4 │  
 5 │  var obj = { bar: "bar" };
 6 │  var obj2 = { bar: "bar2" };
 7 │  
 8 │  var orig = foo;
 9 │  foo = function(){ orig.call(obj); };
10 │  
11 │  foo();          // "bar"
12 │  foo.call(obj2); // "bar" (line 9 means foo will always be bound to obj)
```

Lets create a bind function (this does the same as the previous example).
```javascript
 1 │  function bind(fn,o) {
 2 │    return function() {
 3 │      fn.call(o);
 4 │    };
 5 │  }
 6 │  function foo() {
 7 │    console.log(this.bar);
 8 │  }
 9 │  
10 │  var obj = { bar: "bar" };
11 │  var obj2 = { bar: "bar2" };
12 │  
13 │  foo = bind(foo,obj);
14 │  
15 │  foo();                 // "bar"
16 │  foo.call(obj2);        // ???
```

The call-site for (15) `foo` is not the global scope, it's actually line 3.

We can hack the Function prototype with this code
```javascript
 1 │  if (!Function.prototype.bind2) {
 2 │    Function.prototype.bind2 =
 3 │      function(o) {
 4 │        var fn = this; // the function!
 5 │        return function() {
 6 │          return fn.apply(o, arguments);
 7 │        };
 8 │      };
 9 │  }
10 │  
11 │  function foo(baz) {
12 │    console.log(this.bar + " " + baz);
13 │  }
14 │  
15 │  var obj = { bar: "bar" };
16 │  foo = foo.bind2(obj);
17 │  
18 │  foo("baz");  // "bar baz"
```
line 4 prevents us from needing to manually pass in the function.

This pattern is so useful it was added to ES5 - `.bind()`


### The New Keyword

When we put the new keyword in front of any function call, it magically turns that function call into what you might call a constructor call.

Turns a function call into a constructor call.
```javascript
 1 │  function foo() {
 2 │    this.baz = "baz";
 3 │    console.log(this.bar + " " + baz);
 4 │  }
 5 │  
 6 │  var bar = "bar";
 7 │  var baz = new foo();     // ???
```

The new keyword does 4 things
1. A brand new empty object will be created out of thin air
2. That object gets linked to a different object.*
3. The new object gets bound as the this object.
4. If the function does not otherwise return anything, it will implicitly return `this`.

It's Like a side channel
 - create an object
 - link it
 - bind it
 - return it

This is the fourth and final way that a 'this' keyword can be bound. It can be bound to a brand new object that was created as part of a contructor call hijacking.


### Precedence

Which of the four possibilities trumps the other?

Find the call-site and ask these questions in order.

Questions:
1. Was the function called with the 'new' keyword?
2. Was it called with 'call' or 'apply'?
3. Was the function called via a owning or containing context (object)?
4. DEFAULT: global object (or undefined in strict mode)
