[The Howlin Developer Guide](/index.md)



Algorithms
==========


## Grokking Algorithms


### Logarithms

 3
2 = 8

log 8 = 3
   2

log 8 = ?
   2
2 to the what power is equal to 8


### Big O Notation

O(log n)      binary search
O(n)          simple search
O(n * log n)  quicksort
O(n^2)        selection sort
O(n!)         traveling salesperson (factorial)

- Algorithm speed isn't measured in seconds, but in growth of the number of
  operations.
- Instead, we talk about how quickly the run time of an algorithm increases as
  the size of the input increases.
- run time of algorithms is expressed in Big O notation
- O(log n) is faster than O(n), but it gets a lot faster aas the list of items
  you're searching grows.
