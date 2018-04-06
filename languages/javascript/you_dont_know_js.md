[The Howlin Developer Guide](/index.md)



You Dont Know JS
================

[Back to JavaScript](./index.md)


## Contents


  - [Scope](##Scope)
    - [Engines variable look-up: LHS & RHS](###Engines variable look-up: LHS & RHS)


## Scope


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


### Engines variable look-up: LHS & RHS

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
