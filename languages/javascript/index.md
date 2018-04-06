[The Howlin Developer Guide](/index.md)



Javascript
==========


## Contents


- [Basics](##Basics)
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


## Basics


### Operators

**Logical Operators**

```javascript
    // And
    true && true;             // TRUE
    true && false;            // FALSE
    false && true;            // FALSE
    false && false;           // FALSE

    // Or
    true || true;             // TRUE
    true || false;            // TRUE
    false || true;            // TRUE
    false || false;           // FALSE

    // Not
    !true;                    // FALSE
    !false;                   // TRUE
```
**Comparison Operators**

```javascript
    >                          // Greater than
    <                          // Less than
    <=                         // Less than or equal to
    >=                         // Greater than or equal to
    ===                        // Equal to
    !==                        // Not equal to
```

Modulo returns the remainder of a division.

```javascript
    17 % 5                    // 2
    13 % 7                    // 6
```


### Data Types

 - string
 - number
 - boolean
 - null and undefined
 - object

#### Strings
A string is zero indexed

```javascript
    0 1 2 3 4
    | | | | |
    h e l l o

    "hello"[4]                // 4
    "hello".substring(0, 2);  // he
```

#### Objects
```javascript
    var obj = {
      a: "hello world",
      b: 42,
      c: true
    };

    obj.a;                    // "hello world"
    obj.b;                    // 42
    obj.c;                    // true
```

There are two ways to create an object: using *object literal notation* and
using the *object constructor*.

Literal notation is just creating an object with curly braces, like this:

```javascript
    var myObj = {
      type:        'fancy',
      disposition: 'sunny'
    };

    var emptyObj = {};
```

The constructor syntax looks like this:

```javascript
    var myObj = new Object();
```

Post creation property declaration (the second is shorthand for the first):

```javascript
    // dot notation
    myObj["name"] = "Charlie";

    // bracket notation
    myObj.name    = "Charlie";
```

**Example Script**

```javascript
    var friends = {};

    friends.bill = {
      firstName: "Bill",
      lastName:  "Gates",
      number:    "(206) 555-5555",
      address:   ['One Microsoft Way', 'Redmond', 'WA', '98052']
    };

    friends.steve = {
      firstName: "Steve",
      lastName:  "Jobs",
      number:    "(408) 555-5555",
      address:   ['1 Infinite Loop', 'Cupertino', 'CA', '95014']
    };

    var list = function list(obj) {
      for (var prop in obj) {
        console.log(prop);
      }
    };

    var search = function search(name) {
      for (var prop in friends) {
        if (friends[prop].firstName === name) {
          console.log(friends[prop]);

          return friends[prop];
        }
      }
    };

    list(friends);
    search("Steve");
```


### Variables


```javascript
    // declare variable myAge and assign string
    var myAge = "Thirty";

    // Reassign a variable's value like so:
    myAge = "Thirty-one";
```

#### Function Scopes
Variables defined *outside* a function are accessible anywhere once they have
been declared. They're called *global variables* and their scope is global.

```javascript
    var globalVar = "hello";

    var foo = function foo() {
      console.log(globalVar); // prints "hello"
    }
```

The variable *globalVar* can be accessed anywhere, even inside the function
*foo*. Variables defined *inside* a function are *local variables*. They cannot
be accessed outside of that function.

```javascript
    var bar = function bar() {
      var localVar = "howdy";
    }

    console.log(localVar);    // error
```

The variable *localVar* only exists inside the function *bar*. Trying to print
localVar outside the function gives an error.


### Functions

A function takes in inputs, does something with them, and produces an output.

```javascript
   var sayHello = function sayHello(name) {
     console.log('Hello ' + name);
   };
```

You can run this code by "calling" the function, like this:

```javascript
    sayHello("Emily");		    // Hello Emily
```


### Conditionals

#### If Statement
```javascript
    var userChoice = prompt("Do you choose rock, paper or scissors?");
    var computerChoice = Math.random();

    if (computerChoice < 0.34) {
      computerChoice = "rock";
    } else if (computerChoice <= 0.67) {
      computerChoice = "paper";
    } else {
      computerChoice = "scissors";
    }

    console.log("Computer: " + computerChoice);

    var compare = function compare(choice1, choice2) {
      if (choice1 === choice2) {
        return "The result is a tie!";
      } else if (choice1 === "rock") {
        if (choice2 === "scissors") {
          return "rock wins";
        } else if (choice2 === "paper") {
          return "paper wins";
        }
      } else if (choice1 === "paper") {
        if (choice2 === "rock") {
          return "paper wins";
        } else if (choice2 === "scissors") {
          return "scissors wins";
        }
      } else if (choice1 === "scissors") {
        if (choice2 === "rock") {
          return "rock wins";
        } else if (choice2 === "paper") {
          return "scissors wins";
        }
      }
    };

    compare(userChoice, computerChoice);
```

#### Switch Statement
```javascript
    switch (/*Some expression*/) {
      case 'option1':
        // Do something
        break;
      case 'option2':
        // Do something else
        break;
      case 'option3':
        // Do a third thing
        break;
      default:
        // Do yet another thing
    };
```

#### Choose Your own Adventure
```javascript
    var troll = prompt("You're walking through the forest, minding your own business, and you run into a troll! Do you FIGHT him, PAY him, or RUN?").toUpperCase();
    
    switch(troll) {
      case 'FIGHT':
        var strong = prompt("How courageous! Are you strong (YES or NO)?").toUpperCase();
        var smart  = prompt("Are you smart?").toUpperCase();
    
        if (strong === 'YES' || smart === 'YES') {
          console.log("You only need one of the two! You beat the troll--nice work!");
        } else {
          console.log("You're not strong OR smart? Well, if you were smarter, you probably wouldn't have tried to fight a troll. You lose!");
        }
    
        break;
    
      case 'PAY':
        var money   = prompt("All right, we'll pay the troll. Do you have any money (YES or NO)?").toUpperCase();
        var dollars = prompt("Is your money in Troll Dollars?").toUpperCase();
    
        if (money === 'YES' && dollars === 'YES') {
          console.log("Great! You pay the troll and continue on your merry way.");
        } else {
          console.log("Dang! This troll only takes Troll Dollars. You get whomped!");
        }
    
        break;
    
      case 'RUN':
        var fast      = prompt("Let's book it! Are you fast (YES or NO)?").toUpperCase();
        var headStart = prompt("Did you get a head start?").toUpperCase();
    
        if (fast === 'YES' || headStart === 'YES') {
           console.log("You got away--barely! You live to stroll through the forest another day.");
        } else {
          console.log("You're not fast and you didn't get a head start? You never had a chance! The troll eats you.");
        }
    
        break;
    
      default:
        console.log("I didn't understand your choice. Hit Run and try again, this time picking FIGHT, PAY, or RUN!");
    }
```


### Loops

#### For Loop
NOTE: if the condition is met (e.g. i < 11;) the block is run *then* i++ runs.

```javascript
    // Syntax
    for (var i = 1; i < 11; i = i + 1) {
      /* your code here */;
    };

    // Loop Logic
    for (var i = start; i < end; i++) {
      // do something
    };

    // Increment examples
    i++                       // increment by 1
    i--                       // decrement by 1
    i+= 3                     // increment by 3
    i-= 5                     // decrement by 5
```

**Loop Through an Array**

```javascript
    var cities = ["Melbourne", "Amman", "Helsinki", "NYC"];

    for (var i = 0; i < cities.length; i++) {
      console.log("I would like to visit " + cities[i]);
    };
```

**Example Script**

```javascript
    var text = "The Reds sign Trevor on a 3 year deal worth £20 million. Trevor has agreed a three-year deal with their rivals for a rumoured £20 million.";
    var name = "Trevor";
    var hits = [];

    for (var i = 0; i < text.length; i++) {
      if (text[i] === "B") {
        for (var j = i; j < (name.length + i); j++) {
          hits.push(text[j]);
        }
      }
    };

    if (hits.length === 0) {
      console.log("You're name wasn't found");
    } else {
      console.log(hits);
    };
```

#### While Loop 
**Example Script**

```javascript
    var num = 0;
    
    var loop = function loop(x) {
      while (x < 3) {
        console.log("I'm Looping!");
        x++;
      }
    };
    
    loop(num);
```

**Another Example Script**

```javascript
    var slaying         = true;
    var youHit          = Math.floor(Math.random() * 2);
    var thisRoundDamage = Math.floor(Math.random() * 5 + 1);
    var totalDamage     = 0;
    
    while (slaying) {
      if (youHit) {
        console.log("Nice shot!");
        totalDamage += thisRoundDamage;
    
        if (totalDamage >= 4) {
          console.log("The Dragon is dead!");
          slaying = false;
        } else {
          youHit = Math.floor(Math.random() * 2);
        }
      } else {
        console.log("You lose :-(");
        slaying = false;
      }
    };
```

#### The Do While Loop
To make sure a loop runs at least once before conditional checked.

**Example Script**

```javascript
    loopCondition = false;
    
    do {
      console.log(
        "I'll stop looping cos my condition is " + String(loopCondiiton) + "!";
      );
    } while (loopCondition);
```


### Arrays

An object that holds values (of any type) in numerically indexed positions.  
Any time you see data surrounded by [ ], it is an array.

a. store *lists* of data  
b. can store *different data types* at the same time  
c. are *ordered* so the position of each piece of data is fixed  

```javascript
    var names = ["Mao","Gandhi","Mandela"];
    var sizes = [4, 6, 3, 2, 1, 9];
    var mixed = [34, "candy", "blue", 11];

    mixed[2]                  // 3
    sizes[3]                  // blue
    names.length              // 3

    // iterate over array
    for (var i = 0; i < sizes.length; i++){
      console.log(sizes[i]);
    }
```

#### Further Arrays
```javascript
    // heterogenous arrays (mixed type)
    var myArray = [12, true, "likethis"];

    // multi-dimmensional array
    var newArray = [[1,2,3],['a','b','c'],[1,2,3]];

    // jagged array
    var newArray = [[1,2,3],[1,2,3,4],[1,3]];
```


### Objects

#### Accessing Properties
```javascript
    var bob = {
      name: "Bob Smith",
      age: 30
    };

    var susan = {
      name: "Susan Jordan",
      age: 25
    };

    // dot notation
    var name1 = bob.name;

    // bracket notation
    var age2 = susan["age"];
```

#### Creating Objects
```javascript
    // Literal notation
    var snoopy = {
      species: "beagle:,
      age: 10
    };

    // Constructor notation
    var buddy = new Object();
      buddy.species = "golden retriever";
      buddy.age = 5;
```

#### Methods
```javascript
    bob.setAge = function(newAge){
      bob.age = newAge;
    };

    bob.setAge(20);
```

#### This
```javascript
    var setAge = function (newAge) {
      this.age = newAge;
    };

    var bob = new Object();
    bob.age = 30;
    bob.setAge = setAge;

    bob.setAge(50);
```

#### Constructors
```javascript
    function Person(name,age) {
      this.name = name;
      this.age = age;
    }

    var bob = new Person("Bob Smith", 30);
    var susan = new Person("Susan Jordan", 25);
```

#### Building a Cash Register
```javascript
    function StaffMember(name, discountPercent) {
      this.name            = name;
      this.discountPercent = discountPercent;
    }
    
    var sally = new StaffMember("Sally", 5);
    var bob   = new StaffMember("Bob",10);
    
    var me = new StaffMember("Bash", 20);
    
    var cashRegister = {
      total:                 0,
      lastTransactionAmount: 0,
      add:                   function(itemCost) {
        this.total += (itemCost || 0);
        this.lastTransactionAmount = itemCost;
      },
      scan:                  function(item,quantity) {
        switch (item) {
          case "eggs": this.add(0.98 * quantity); break;
          case "milk": this.add(1.23 * quantity); break;
          case "magazine": this.add(4.99 * quantity); break;
          case "chocolate": this.add(0.45 * quantity); break;
        }
    
        return true;
    
      },
      voidLastTransaction:   function() {
        this.total -= this.lastTransactionAmount;
        this.lastTransactionAmount = 0;
      },
      applyStaffDiscount:    function(employee) {
        this.total -= this.total * (employee.discountPercent / 100);
      }
    };
    
    cashRegister.scan('eggs',1);
    cashRegister.scan('milk',1);
    cashRegister.scan('magazine',3);
    
    cashRegister.applyStaffDiscount(me);
    
    console.log('Your bill is '+cashRegister.total.toFixed(2));
```


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
