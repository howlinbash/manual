[The Howlin Developer Guide](/index.md)



Javascript
==========


## Contents


- [Basics](./basics.md)
  - [Operators](###Operators)
  - [Data Types](###Data Types)
    - [Strings](####Strings)
    - [Objects](####Objects)
  - [Variables](###Variables)
    - [Function Scopes](####Function Scopes)
  - [Functions](###Functions)
  - [Conditionals](###Conditionals)
    - [If Statement](####If Statement)
    - [Switch Statement](####Switch Statement)
    - [Choose Your own Adventure](####Choose Your own Adventure)
  - [Loops](###Loops)
    - [For Loop](####For Loop)
    - [While Loop ](####While Loop )
    - [The Do While Loop](####The Do While Loop)
  - [Arrays](###Arrays)
    - [Further Arrays](####Further Arrays)
  - [Objects](###Objects)
    - [Accessing Properties](####Accessing Properties)
    - [Creating Objects](####Creating Objects)
    - [Methods](####Methods)
    - [This](####This)
    - [Constructors](####Constructors)
    - [Building a Cash Register](####Building a Cash Register)
- [JavaScript is Weird](##JavaScript is Weird)
  - [Hoisting](###Hoisting)
  - [Context](###Context)
    - [Changing Context](####Changing Context)
    - [Scoping Problem Workarounds](####Scoping Problem Workarounds)
- [You Dont Know JS](##You Dont Know JS)
  - [Scope](###Scope)
    - [Engines variable look-up: LHS & RHS](####Engines variable look-up: LHS & RHS)

## JavaScript is Weird


### Hoisting

 - Functions are hoisted to the top and read
 - Variables are hoisted to the top, registered but not read
 - If you assign a function to a variable it will be registered but not read.

This

```javascript
    function foo() {
      bar();
      var x = 1;
    }
```

Runs like this.

```javascript
    function foo() {
      var x;
      bar();
      x = 1;
    }
```

So here, the name 'foo' is hoisted, but the body is left behind.  
It will only be assigned during execution.

```javascript
    function test() {
      foo();                       // TypeError "foo is not a function"
      bar();                       // "this will run!"
      var foo = function() {       // funct expr assigned to local var 'foo'
        alert("this won't run!");
      }
      function bar() {             // funct declaration, given the name 'bar'
        alert("this will run!");
      }
    }
    test();
```


### Context

scope === variable access  
context === this

In the root scope, the context is this.

```javascript
    console.log(this);             // Window {...}
    console.log(this === window);  // true
    
    // If
    var a = 1;
    
    // Then
    console.log(this.a);      // 1
    console.log(window.a);    // 1
    console.log(a);           // 1
```

If we change the scope, the context still remains (the window object)

```javascript
    function foo() {
      console.log(this);
    }

    foo()
```

A function runs with the context of the object that called it.

```javascript
    var obj = {
      foo: function () {
        console.log(this === obj);
      }
    }

    obj.foo();                // true
```

now obj is the context.

#### Changing Context
3 methods change the context:
 - call
 - apply
 - bind

**call**

```javascript
    var obj = {
      foo: function () {
        console.log(this === window);
      }
    }

    obj.foo.call(window);     // true
```

We can also pass arguments to the function.

```javascript
    var obj = {
      foo: function (one, two, three) {
        console.log(this === window);
      }
    }
    
    obj.foo.call(window, 1,2,3);
```

**apply**

apply is the same as call except the second argument is an array.

    obj.foo.apply(window, [1,2,3]);

**bind**

both call and apply call the foo function bind, however, does not.

Bind, returns a bound function

    var myBoundFoo = obj.foo.bind(window);

so myBoundFoo() always executes foo with the context 'window' instead of obj.

#### Scoping Problem Workarounds
I want the second 'this' to refer to the first element '#opendiv'

```javascript
    $('#opendiv').on('click', function() {
      this;                                      // this: #opendiv
      $('#div1').slideToggle(300, function() {
        $(this).toggleClass("active");           // this: #div1
      });
    });
```

**The Scope Method**

```javascript
    $('#opendiv').on('click', function() {
      var _self = this;
      $('#div1').slideToggle(300, function() {
        $(_self).toggleClass("active");
      });
    });
```

**The Bind Method**

```javascript
    $('#opendiv').on('click', function() {
      // Caveat (this)
      $('#div1').slideToggle(300, function() {
        $(this).toggleClass("active");
      }.bind(this));
    });
```

Caveat: 'this' can no longer equal '#div1' it will now always equal '#opendiv'


## You Dont Know JS


### Scope

Compilation:
Compile all the functions - don't execute them;
Make boxes for all the variables - don't assign to them;
Make code so engine can execute everything

Execution:
Look up variables and functions
execute the code the compiler created

```javascript
    // This will be broken up into 2 statements.
    var a = 2;

    // Declaration Operation: 
    var a;  

    // Initialisation Operation: 
    a = 2;  
```

We can break the engine into 3 parts
 - **the engine** - start to finish compilation and execution
 - **the compiler** - parsing & code generation
 - **the scope** - collects and mantains variable look up list

**Summary**
 - Compiler declares a variable
   - and produces code for Engine to run to assign variable in next step
 - Engine looks up the variable in Scope and assigns to it

```javascript

// This script...

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

// ...becomes

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

#### Engines variable look-up: LHS & RHS
LHS asks for the container, RHS references the container.

**Line 1**
```javascript
foo     LHS Reference    Target
 =      The Assignment
"bar";  RHS Reference    Source

// LHS         give me the box
// RHS         what's in the box
// Assignment  Put this in the box
```
