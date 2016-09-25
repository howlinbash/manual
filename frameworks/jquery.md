


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
$(".class");       // class selector
$("#id");          // id selector
$("ul li");        // descendent selector 
$("ul > li");      // direct child selector
$(".class, #id");  // multiple selector
$("ul :first");    // first psuedo selector
$("ul :even");     // even psuedo selector
```



## Methods

```javascript
.text()            // Selects or changes the text of an html element
.html()            // Selects of changes the html in scope
.on()              // An event handler
.val()             // Get/Set the input value
.data()            // Grab the data from the html5 data tag
.hasClass()        // Returns "TRUE" if selected element has specified class
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
.find()            // Searches down the dom for the element passed
.first()           // Find the first element
.last()            // Find the last element
.next()            // Find the next element
.prev()            // Find the previous element
.parent()          // Find the parent to the element
.children()        // Find the children to the element
.children("li")    // Find the children to the element that are list items
.closest()         // Searches up through ancestors
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
