


[The Howlin Developer Guide](../home.md)



# jQuery



## Document Ready Function

```javascript
$(document).ready(function() {
    //code goes here.
});
```



## Selectors

```javascript
// class selector
$(".class");

// id selector
$("#id");

// descendent selector 
$("ul li");

// direct child selector
$("ul > li");

// multiple selector
$(".class, #id");

// first psuedo selector
$("ul :first");

// even psuedo selector
$("ul :even");
```




## Methods

```javascript
// Selects or changes the text of an html element
.text()

// Selects of changes the html in scope
.html()

// An event handler
.on()

// Get/Set the input value
.val()

// Grab the data from the html5 data tag
.data()

// Returns ```TRUE``` if selected element has specified class
.hasClass()
```




## Events

### Mouse Events

```javascript
click
dblclick
focusin
focusout
mousedown
mouseup
mousemove
mouseover
mouseenter
mouseleave
mouseout
```

### Keyboard Events

```javascript
keypress
keydown
keyup
```

### Form Events

```javascript
blur
select
change
focus
submit
```



## Traversing the DOM



### HTML

```bash
Doc
│
└── ul
    │
    └── li .vacation
        │
        ├── a .expand
        │   │
        │   └── show comments
        │
        └── ul .comments
            │
            ├── li
            │
            └── li
```


### jQuery

```javascript
$(document).ready(function(){
    $(".vacation).on("click", ".expand", function(){
        $(this).closest(".vacation")
            .find(".comments");
    });
});
```

```javascript
// Searches down the dom for the element passed
.find()                 

// Find the first element
.first()

// Find the last element
.last()

// Find the next element
.next()

// Find the previous element
.prev()

// Find the parent to the element
.parent()

// Find the children to the element
.children()

// Find the children to the element that are list items
.children("li")

// Searches up through ancestors
.closest()
```


## Manipulating The DOM

```javascript
.append()
.prepend()
.after()
.before()
.appendTo()
.prependTo()
.insertAfter()
.insertBefore()
.filter()
.addClass()
.removeClass()
.toggleClass()
.show()
.hide()
```



## Debugging

```javascript
alert($('element').length);
```

### Type Casting 

<span>12</span> 
$(this) = string = 12
+$(this) = int = 12

### Bugs

.preventDefault
.stopPropagation



## Styles

### Dirty Styles

```javascript
$(this).css('background-color', '#252b30')
        .css('border-color', '1px solid #967');
```

### Object Styles

```javascript
$(this).css({'background-color': '#252b30',
            'border-color': '1px solid #967'});
```



## Animation

```javascript
.animate()
```

```javascript
.animate({'top', '-10px'}, 200)
.animate({'top', '-10px'}, 'fast')
```

The speed parameters

```javascript
default 400
fast    200
slow    600
```

will also work for the below transitions.

```javascript
.slideDown()
.slideUp()
.slideToggle() 
.fadeIn()
.fadeOut()
.fadeToggle()
```
