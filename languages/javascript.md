


[The Howlin Developer Guide](../home.md)



# Javascript



## Misc Tools

### Comparison Operators

```javascript
>        Greater than
<        Less than 
<=       Less than or equal to
>=       Greater than or equal to
===      Equal to 
!==      Not equal to
```

### Math and the modulo 

When **modulo** ```%``` is placed between two numbers the computer will divide the
first number by the second, and then return the **remainder** of that division.

So if we do ```23 % 10```, we divide 23 by 10 which equals 2 with 3 left over. 
So ```23 % 10``` evaluates to 3.

#### More examples:
```javascript
17 % 5             // evaluates to 2
13 % 7             // evaluates to 6
```

#### ISNAN 
If you call ```isNaN``` on something, it checks to see if that thing *is not* a
number. So:

```javascript
isNaN('berry');    // TRUE
isNaN(NaN);        // TRUE
isNaN(undefined);  // TRUE
isNaN(42);         // FALSE
```


### Confirm & Prompt 

```javascript
confirm("I feel awesome!");
confirm("I am ready to go.");
```

These boxes can be used on websites to *confirm* things with users. You've probably
seen them pop up when you try to delete important things or leave a website with
unsaved changes.

Prompts are used to take an input from the user that is returned to the
console.
	
```javascript 
prompt("Are you ok?");
```


### Return Keyword 

When we call a function, we don't always want to just print stuff. Sometimes, we
just want it to ```return``` a value. We can then use that value (ie. the output
from the function) in other code.

The return keyword simply gives the programmer back the value that comes out
of the function. So the function runs, and when the return keyword is used, the
function will immediately stop running and return the value.


### Logical Operators

#### And (```&&```) 
The logical operator **and** is written in JavaScript like this ```&&```. It
evaluates to ```true``` when *both* expressions are ```true```; if they're not, it evaluates
to ```false```.
									
```javascript 
true && true;      // TRUE
true && false;     // FALSE
false && true;     // FALSE
false && false;    // FALSE		
```
									
#### Or (```||```) 
The logical operator **or** is written in JavaScript like this ```||```. It
evaluates to ```true``` when *one* or *the other* or *both* expressions are ```true```; if they're
not, it evaluates to ```false```.
									
```javascript 
true || true;      // TRUE
true || false;     // TRUE
false || true;     // TRUE
false || false;    // FALSE		
```
									
#### Not (```!```) 
The logical operator **not** is written in JavaScript like this ```!```. It makes ```true``` 
expressions ```false```, and vice-versa.
							
```javascript 
!true;             // FALSE
!false;            // TRUE		
```


## Data Types


### Data Types (attributes)

Data comes in various *types*.  

#### Numbers
Quantities, just like you're used to. You can do math with them.

#### Strings
Sequences of characters, like the letters a-z, spaces, and even numbers.
These are all strings:

```javascript
"Ryan", "4" and "What is your name?" 
```
Strings are extremely useful as labels, names, and content for your programs.

#### Booleans
A boolean is either true or false.  
For example, comparing two numbers returns a true or false result:

```javascript 
23 > 10            // TRUE 
5 < 4              // FALSE
```


### Substrings

```javascript 
"some word".substring(x, y); 
```
where - x - is where you start chopping and - y - is where you finish chopping
the original string.

The number part is a little strange. To select for the "he" in "hello", you
would write this:

```javascript 
"hello".substring(0, 2);	
```
 							
Each character in a string is numbered starting from 0, like this:
				
```javascript
0 1 2 3 4		
| | | | |		
h e l l o		
```

The letter h is in position 0, the letter e is in position 1, and so on.
Therefore if you start at position 0, and slice right up till position 2, you
are left with just - he -

#### More examples
First 3 letters of "Batman"
```javascript 
   "Batman".substring(0,3);
```
From 4th to 6th letter of "laptop"
```javascript 
"laptop".substring(3,6); 
```


### Arrays 

a. store *lists* of data  
b. can store *different data types* at the same time  
c. are *ordered* so the position of each piece of data is fixed 

#### Example
```javascript 
var names = ["Mao","Gandhi","Mandela"];	

var sizes = [4, 6, 3, 2, 1, 9];			

var mixed = [34, "candy", "blue", 11];	
```
										
#### Syntax
var arrayName = [data, data, data];  
Any time you see data surrounded by [ ], it is an array.


### Array positions

Just like the string arrays use 0-based indexing. To access the data, we just
need to know the array name (in this example, it is "junkData"), and the
position of the data we want.  
First element in the array: junkData[0]  
Third element in the array: junkData[2]  


### Object syntax

An object is like an array in this way, except its keys can be variables and
strings, not just numbers.  
Objects are just collections of information (keys and values) between curly
braces, like this:

```javascript 
var myObject = {
  key: value,
  key: value,
  key: value
};					
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

When you use the constructor, the syntax looks like this:
```javascript 
var myObj = new Object();		
```
								
This tells JavaScript: "I want you to make me a *new* thing, and I want that
thing to be an *Object*.

You can add keys to your object after you've created it in two ways *dot
notation* and *bracket notation*:

```javascript 
myObj["name"] = "Charlie";
myObj.name    = "Charlie";			
```

Both are correct, and the second is shorthand for the first. See how this is
sort of similar to arrays?

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

var list = function(obj) {
  for (var prop in obj) {
    console.log(prop);
  }
};

var search = function(name) {
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

```javascript 
var list = function(friends) {
  for (var prop in friends) {
    console.log(prop);
  }
};

var search = function(name) {
  for (var prop in friends) {
    if (friends[prop].firstName === name) {
      console.log(friends[prop]);

      return friends[prop];
    }
  }
};
```


### Properties

Each piece of information we include in an object is known as a *property*.
Think of a property like a *category label* that belongs to some object. When
creating an object, each property has a name, followed by - : - and then the
*value* of that property. For example, if we want Bob's object to show he is
34, we'd type in age: 34.

age is the property, and 34 is the value of this property. When we have more
than one property, they are separated by *commas*. The last property does not
end with a comma.



## Misc Tools

### Variables

Once you create (or declare) a variable as having a particular name, you can
then call up that value by typing the variable name.

#### Syntax
var varName = data;

#### Example
```javascript 
a. var myName = "Leng";
b. var myAge  = 30;
c. var isOdd  = true;
```


### Change Variable Values

Reassign a variable's value like so:

```javascript 
var myAge = "Thirty";
myAge = "Thirty-one";
```

Now the value of myAge is "Thirty-one"!  


### Global vs Local Variables

Let's talk about an important concept: *scope*. Scope can be global or local.

Variables defined *outside* a function are accessible anywhere once they have
been declared. They are called *global variables* and their scope is global. 

#### Example:
```javascript 
var globalVar = "hello";

var foo = function() {
  console.log(globalVar);  // prints "hello"
}											
```

The variable *globalVar* can be accessed anywhere, even inside the function
*foo*. Variables defined *inside* a function are *local variables*. They cannot
be accessed outside of that function. 

#### Example
```javascript
var bar = function() {
  var localVar = "howdy";
}

console.log(localVar);  // error		
```

The variable *localVar* only exists inside the function *bar*. Trying to print
localVar outside the function gives a error.


### Function Syntax (Behaviour) 

A function takes in inputs, does something with them, and produces an output.

#### Example
```javascript 
var sayHello = function(name) {
  console.log('Hello ' + name);
};								
```

 - First we declare a function using - var, and then give it a name - sayHello.
The name should begin with a lowercase letter and the convention is to use
lowerCamelCase where each word (the first begins with a capital letter).
 - Then we use the *function* keyword to tell the computer that you are making
a function.
 - The code in the parentheses is called a *parameter*. It's a placeholder word
that we give a specific value when we call the function.
 - Then write your block of reusable code between { }. Every line of code in
this block must end with a ;.

You can run this code by "calling" the function, like this:

```javascript 
sayHello("Emily");		
```
Calling this function will print out Hello Emily.


### Computer Logic Breakdown: The Function

```javascript 
var functionName = function() {
  // code code code
  // code code code
  // (more lines of code)
};								
```

 1. The *var* keyword declares a variable named *functionName*.
 2. The keyword *function* tells the computer that *functionName* is a function
and not something else.
 3. Parameters go in the parentheses. The computer will look out for it in the
code block.  
 4. The code block is the reusable code that is between the curly brackets { }.
Each line of code inside { } must end with a semi-colon.  
 5. The entire function ends with a semi-colon.

To use the function, we *call* the function by just typing the function's name,
and putting a parameter value inside parentheses after it. The computer will
run the reusable code with the specific parameter value substituted into the
code.


### Functions with two parameters 

Functions can have more than one parameter. 

#### Example
```javascript 
var areaBox = function(length, width) {
  return length * width;
};
```
										
With more than one parameter, we can create more useful functions To call a
function with more than one parameter, just enter a value for each parameter in
the parentheses. For example, areaBox(3,9); would return the area of a box with
a length of 3 and a width of 9.


## Control Flow Statements


### if Statement

An if statement is made up of the if keyword, a condition like we've seen
before, and a pair of curly braces { }. If the answer to the condition is yes,
the code inside the curly braces will run.

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

var compare = function (choice1, choice2) {
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


### The For Loop


#### Syntax
```javascript 
for (var i = 1; i < 11; i = i + 1) {
  /* your code here */;
};
```

#### Loop Logic
```javascript 
for (var i = start; i < end; i++) {
  // do something
};
```
										
The counter variable i starts at "start", and stops looping when it reaches
"end."

Every for loop makes use of a counting variable. Here, our variable is called i
(but it can have any name). The variable has many roles. The first part of the
for loop tells the computer to start with a value of 1 for i. It does this by
declaring the variable called i and giving it a value of 1.

When the for loop executes the code in the code block - the bit between { } -
it does so by starting off where i = 1.

#### Ending the for loop
The above for loop will keep running until i = 10 ( i.e. while i < 11). So when
i = 2, or i = 9, the for loop will run. But once i is no longer less than 11,
the loop will stop.


### Rules to Learn 

 - A more efficient way to code to increment up by 1 is to write i++.
 - We decrement down by 1 by writing i--.
 - We can increment up by any value by writing i += x, where x is how much we
want to increment up by. e.g., i += 3 counts up by 3s.
 - We can decrement down by any value by writing i -= x.
 - Be very careful with your syntax—if you write a loop that can't properly
end, it's called an infinite loop. It will crash your browser!  


### Computer Logic Breakdown: The For Loop


```javascript 
for (var i = 2; i < 13; i++) {
  console.log(i);
}									
```

 1. It starts off with i = 2 
 2. It then asks: Is i currently less than 13? Because i = 2, this is true and we continue.
 3. We do NOT increment now. Instead, if the condition is met, we run the code block.
 4. Here, the code block prints out the value of i. It is currently 2 so 2 will be printed out.
 5. Once the code block is finished, the for loop then increments / decrements. Here, we add 1.
 6. Now i = 3. We check if it is less than 13. If it is true, we run the code block.
 7. The code block runs, and then we increment.
 8. We repeat these steps until the condition i < 13 is no longer true.

*For* loops only run when the condition is *true*.

It is important that there is a way for the for loop to end. If the for loop is
always going to be true, then you will be stuck in an infinite loop and your
browser will crash! Look at the code. It is bad. 


### Arrays I 

For arrays, a useful way to systematically access every element in the array is
to use a for loop!

```javascript 
var cities = ["Melbourne", "Amman", "Helsinki", "NYC"];

for (var i = 0; i < cities.length; i++) {
  console.log("I would like to visit " + cities[i]);
};
```

### Computer Logic Breakdown: The Array
 1. Line 3 declares the array. It has 4 elements.
 2. We then start the for loop on line 5.
 3. We see i starts off at value 0. 
 4. The for loop runs until i < 4 (because cities.length equals 4. The array has 4 elements in it; see the Hint for more.)
 5. We will increment i by 1 each time we loop over.
 6. We print out cities[0], which is "Melbourne".
 7. We then start the loop again. Except now i = 1.
 8. It will print out cities[1], which is "Amman".
 9. This continues until i is no longer less than cities.length.


### A Search Engine

```javascript 
var text = "Stoke sign Barry from Sunderland on a 3 year deal worth £20 million. Sunderland defender Barry has agreed a three-year deal with Premier League rivals Stoke City for a rumoured £20 million.";
var myName = "Barry";
var hits = [];

for (var i = 0; i < text.length; i++) {
  if (text[i] === "B") {
    for (var j = i; j < (myName.length + i); j++) {
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

heterogenous arrays 
multidimensional arrays 
jagged arrays 


### While syntax

#### Syntax
```javascript
while(condition) {
  // Do something!
};
```
						
As long as the condition evaluates to true, the loop will continue to run. As
soon as it's false, it'll stop. (When you use a number in a condition, as we did
earlier, JavaScript understands 1 to mean true and 0 to mean false.) 

#### Example
```javascript 
var num = 0;

var loop = function(x) {
  while (x < 3) {
    console.log("I'm Looping!");
    x++;
  }
};

loop(num);
```


### Brevity is the soul of programming 

When we give a variable the boolean value true, we check that variable directly,
we don't bother with ===.

```javascript 
var bool = true;

while (bool) {
  //Do something
};
```
is the same thing as:

```javascript 
var bool = true;

while (bool === true) {
  //Do something
};
```


### Dragaon Slayer

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


### The 'do' / 'while' loop

Sometimes you want to make sure your loop runs at least one time no matter what.
When this is the case, you want a modified while loop called a do/while loop.

This loop says: "Hey! Do this thing one time, then check the condition to see if
we should keep looping." After that, it's just like a normal while: the loop
will continue so long as the condition being evaluated is true.  ￼￼

#### Example
```javascript 
loopCondition = false;

do {
  console.log(
    "I'm gonna stop looping cause my condition is " + String(loopCondiiton) + "!";
  );
} while (loopCondition);
```


### Adding to an existing switch

The switch statement is put together like this:
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

JavaScript will try to match the expression between the switch() parentheses to
each case. It will run the code below each case if it finds a match, and will
execute the default code if no match is found.  


### Choose Your own Adventure

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


### Building a Cash Register

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
