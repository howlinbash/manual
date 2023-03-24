
TypeScript
==========


Cheatsheet
----------
```typescript
// assertions
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
// brutal assertion
const a = (expr as any) as T;
// literal types
const light: "red" = "red";
const trafficLights: "red" | "amber" | "green" = "red";
// literals: 'read only' object
  const req = { url: "https://howlin.app", method: "GET" } as const;
  // narrowing
  if (typeof id === "string") {
  if ("swim" in animal) {
  if (x instanceof Date) {
  // Type Predicates
  function isFish(pet: Fish | Bird): pet is Fish {
  // Pick
  type MyPick<T, K extends keyof T> = { [key in K]: T[key] }
  // Partial
  type MyPartial<T> = { [P in keyof T]?: T[P] }
  // getDeepValue
  const getDeepValue = <TObj, Tkey1 extends keyof TObj, TKey2 extends keyof TObj[Tkey2]>
  ```

  The Basics
  ----------

  ### Unions

  TypeScript will only allow an operation if it is valid for _every_ member of the union.

So use narrowing
```typescript
function printId(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
```
### Common data type checks
```typescript
typeof id === "string"
Array.isArray(x)
```

### Type Predicates

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```
### Discriminated Unions

```typescript
interface Circle {
  kind: "circle";
  radius: number;
}
 
interface Square {
  kind: "square";
  sideLength: number;
}
 
type Shape = Circle | Square;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      // And a exhaustive check!
      // This would catch a shape you add but forget to write a case for!
      const _: never = shape;
      return _;
  }
}
```

### Objects

```typescript
const getDeepValue = <
  TObj,
  Tkey1 extends keyof TObj,
  TKey2 extends keyof TObj[Tkey2]
>(
  obj: TObj,
  firstKey: Tkey1,
  secondKey: Tkey2,
) => {
  return obj[firstkey][secondKey];
};

const obj = {
  foo: {
    a: true,
    b: 2,
  },
  bar: {
    c: "12",
    d: 18,
  },
}

const value = getDeepValue(obj, "foo", "b"); // string
```

Builtins
--------

```typescript
Pick<>
Omit<>
Record<>
Partial<>
Required<>
Extract<>
Exclude<>
Awaited<>
Readonly<>
Uppercase<>
Lowercase<>
Capitalize<>
Uncapitalize<>
ts.toolbelt
```

### Todo
noUncheckedIndexedAccess switch in settings;
