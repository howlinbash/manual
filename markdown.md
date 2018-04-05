[The Howlin Developer Guide](/index.md)



Markdown Cheatsheet
===================


## Contents


- [Headings](###Headings)
- [Emphasis](###Emphasis)
- [Lists](###Lists)
- [Links](###Links)
- [Images](###Images)
- [Code and Syntax Highlighting](###Code and Syntax Highlighting)
- [Tables](###Tables)
- [Blockquotes](###Blockquotes)
- [Inline HTML](###Inline HTML)
- [Horizontal Rule](###Horizontal Rule)


### Headings

```markdown
# Header 1
## Header 2
### Header 3
#### Header 4
```

# Header 1
## Header 2
### Header 3
#### Header 4


### Emphasis

```markdown
**BOLD** or __BOLD__
*Italics* or _Italics_
**asterisks and _underscores_**.
Strikethrough uses two tildes. ~~Scratch this.~~
```

**BOLD**  
*Italics*  
Combined emphasis with **asterisks and _underscores_**.  
~~Scratch this.~~


### Lists

```markdown
1. First ordered list item
2. Another item
   * Unordered sub-list. 
   * Like this.
1. Actual numbers don't matter, just that it's a number
   1. Ordered sub-list
   1. Like this.
4. And another item.

   You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).
   
   To have a line break without a paragraph, you will need to use two trailing spaces.
   Note that this line is separate, but within the same paragraph.
   (This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

* Unordered list can use asterisks
- Or minuses
+ Or pluses
```

1. First ordered list item
2. Another item
   * Unordered sub-list. 
   * Like this.
1. Actual numbers don't matter, just that it's a number
   1. Ordered sub-list
   1. Like this.
4. And another item.

   You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).
   
   To have a line break without a paragraph, you will need to use two trailing spaces.  
   Note that this line is separate, but within the same paragraph.  
   (This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

* Unordered list can use asterisks
- Or minuses
+ Or pluses


**Checklists**

```markdown
- [ ] done
- [ ] started
- [x] not started
```

- [ ] done
- [ ] started
- [x] not started


### Links

```markdown
[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../manual/home.md)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links. 
http://www.example.com or <http://www.example.com> but example.com wont.

The reference links remain hidden.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com
```

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../manual/home.md)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links. 
http://www.example.com or <http://www.example.com> but example.com wont.

The reference links remain hidden.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com


### Images

Here's Mr Bash (hover to see the title text):

```markdown
Inline-style:  
![alt text](./howlin-wolf-square-tiny.jpg "Howlin Bash Text")

Reference-style:  
![alt text][logo]

[logo]: ./howlin-wolf-square-tiny.jpg "Howlin Bash Text"
```
Inline-style:  
![alt text](./howlin-wolf-square-tiny.jpg "Howlin Bash Text")

Reference-style:  
![alt text][logo]

[logo]: ./howlin-wolf-square-tiny.jpg "Howlin Bash Text"


### Code and Syntax Highlighting

```markdown
Inline `code` has `back-ticks around` it.
```
Inline `code` has `back-ticks around` it.

Blocks of code are fenced by lines with three back-ticks ```.

```markdown
```javascript
var s = "JavaScript syntax highlighting";
alert(s);
(```)
```
 
```markdown
```python
s = "Python syntax highlighting"
print s
(```)
```
 
```markdown
```
No language indicated, so no syntax highlighting. 
But let's throw in a <b>tag</b>.
(```)
```

```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```
 
```python
s = "Python syntax highlighting"
print s
```
 
```
No language indicated, so no syntax highlighting. 
But let's throw in a <b>tag</b>.
```


### Tables

```markdown
Colons can be used to align columns.

| Tables        | Are           | Cool  |
| :------------ |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the 
raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3
```

Colons can be used to align columns.

| Tables        | Are           | Cool  |
| :------------ |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the 
raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3


### Blockquotes

```markdown
> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote. 
```

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote. 


### Inline HTML

You can also use raw HTML in your Markdown, and it'll mostly work pretty well.

```markdown
<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>
```

<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>


### Horizontal Rule

```markdown
Three or more...

---

Hyphens

***

Asterisks

___

or underscores
```

Three or more...

---

Hyphens

***

Asterisks

___

or underscores
