[The Howlin Developer Guide](/index.md)



React.js
========

[More JavaScript](/languages/javascript/index.md)


## Contents


- [Components](##Components)
  - [Make a Component Stateful](###Make a Component Stateful)
  - [Fix the `bind(this)` Anti-Pattern](###Fix bind-this)


## Components


### Make a Component Stateful

[Course Source](https://egghead.io/lessons/egghead-make-dynamic-forms-with-react)

Make a static render method with the view you wish to see
```jsx
function HelloWorld() {
  return (
    <div>Hello World!</div>
  )
}
```

Extract the elements you wish to make dynamic
```jsx
function HelloWorld() {
  return (
    <div>Hello {place}!</div>
  )
}

const element = <HelloWorld />
```

Bring them in as props
```jsx
function HelloWorld({place}) {
  return (
    <div>Hello {place}!</div>
  )
}

const element = <HelloWorld place={"World"} />
```

Turn the function into a Class, get props from this.props
```jsx
class HelloWorld extends React.Component {
  render() {
    const { place } = this.props
    return (
      <div>Hello {place}!</div>
    )
  }
}

const element = <HelloWorld place={"World"} />
```

Get value from state instead of from props
```jsx
class HelloWorld extends React.Component {
  state = {place: "World"}
  render() {
    const { place } = this.state
    return (
      <div>Hello {place}!</div>
    )
  }
}

const element = <HelloWorld />
```


### Fix bind-this

to make the button counter work we need to bind this.
```jsx
class Counter extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {count: 0}
  }
  handleClick() {
    this.setState(({count}) => ({
      count: count + 1,
    }))
  }
  render() {
    return (
      <button onClick={this.handleClick.bind(this)}>
        {this.state.count}
      </button>
    )
  }
}
```


Move the state from the constructor
Turn handleClick into an arrow function
Remove annoying .bind(this) method
Profit
```jsx
class Counter extends React.Component {
  state = {count: 0}
  handleClick = () => {
    this.setState(({count}) => ({
      count: count + 1,
    }))
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.count}
      </button>
    )
  }
}
```
