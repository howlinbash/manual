[The Howlin Developer Guide](/index.md)



You Dont Know JS - Closure
==========================

[Back to JavaScript](./index.md)
[More You Dont Know JS](./ydkjs.md)


## Contents


- [Definition](##Definition)
- [The Module Pattern](##The Module Pattern)


## Definition


> When a function remembers its lexical scope,
> even if it is executing outside of it.

```javascript
 1 │  function foo() {
 2 │    var bar = "bar";
 3 │    
 4 │    function baz() {
 5 │      console.log(bar);
 6 │    }
 7 │  
 8 │    bam(baz);
 9 │  }
10 │  
11 │  function bam(baz) {
12 │    baz(); // "bar"
13 │  }
14 │  
15 │  foo();
```

It's not a copy to the lexical scope, it's a reference to the lexical scope.

You can also return functions from functions
```javascript
 1 │  function foo() {
 2 │    var bar = "bar";
 3 │    
 4 │    return function() {
 5 │      console.log(bar);
 6 │    }
 7 │  }
 8 │  
 9 │  function bam() {
10 │    foo()(); // "bar"
11 │  }
12 │  
13 │  bam();
```

`setTimeout` and click handlers are classic examples of closure.
```javascript
 1 │  function foo() {
 2 │    var bar = "bar";
 3 │  
 4 │    setTimeout(function() {
 5 │      console.log(bar);
 6 │    }, 1000);
 7 │  }
 8 │  
 9 │  foo();
```

*Problem*
> Why wont the function print 1,2,3,4,5?
```javascript
 1 │  for (var i = 1; i <= 5; i++) {
 2 │    setTimeout(function() {
 3 │      console.log("i: " + i); // i is always 6
 4 │    }, i * 1000);
 5 │  }
```

*Answer*
> The loop has finished iterating by the time the first function fires

*Solution*
> wrap the `setTimeout` in an IIFE to gain closure for each `i`
> ( we needed a unique scope for each iteration)
```javascript
 1 │  for( var i = 1; i <=5; i++ ) {
 2 │    (function(i) {
 3 │      setTimeout(function() {
 4 │        console.log("i: " + i); // i is 1, 2, 3...6
 5 │      }, i*1000);
 6 │    })(i);
 7 │  }
```

The problem can be solved even easier with block scope and the `let` keyword!
```javascript
 1 │  for (let i = 1; i <= 5; i++) {
 2 │    setTimeout(function() {
 3 │      console.log("i: " + i);
 4 │    }, i * 1000);
 5 │  }
```


## The Module Pattern


1. Outer wrapping function call
2. An exposed internal function exposed that has closure over the innner scope

```javascript
 1 │  var foo = (function() {
 2 │    var o = { bar: "bar" };
 3 │  
 4 │    return {
 5 │      bar: function() {
 6 │        console.log(o.bar);
 7 │      }
 8 │    };
 9 │  })();
10 │  
11 │  foo.bar();
```

jQuery just returns the inner function, calls it $
