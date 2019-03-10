# JS Scope and Context

In this class we'll dive into scope and context. We'll see the importance of how and where variable assignment occurs in the JS ecosystem. We'll also learn about context and the value of `this`. A full understanding of these concepts will help create better foundations for our javascript code as well as increase our efficiencies in debugging.

## Learning Objectives
- Describe scope and how it governs how data is able to be accessed in code
- Differentiate between `var`, `let`, and `const` keywords in variable assignment
- Differentiate between global, local, and block scope
- Identify some benefits of closures in javascript
- Explain Javascript 'context' and what the value of the 'this' keyword refers to
- Explain the default context of Javascript executing in the browser
- Use `.call`, `.apply`, `.bind` to explicitly set context
- Use `console.log(this)`

## Scope

Javascript scope is key to understanding how variables and functions are defined and accessed. A strong understanding of JS scope allows us to write code faster while also writing more maintainable code. Additionally, a strong understanding of scope allows developers to debug more rapidly.

##  What is scope?

Let's first note what the english meaning of scope is according to [Merriam-Webster](https://www.merriam-webster.com/dictionary/scope). There are 2 listed definitions that are apt for our discussion:

> - space or opportunity for unhampered motion, activity, or thought
- extent of treatment, activity, or influence

Let's compare that to [MDN's definition of scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope):

> The current context of execution. The context in which values and expressions are "visible," or can be referenced. If a variable or other expression is not "in the current scope," then it is unavailable for use. Scopes can also be layered in a hierarchy, so that child scopes have access to parent scopes, but not vice versa.

In simpler terms, scope is:

- Where a variable can be referenced or used.
- a list of all variables that can be accessed from a specific line of code.

Something to note here. MDN is usually really great in terms of documentation. However, here, there's a bit of conflation with regard to how the word "context" is used. In the above definition, "context of execution" is really "execution context" which ultimately is scope. We'll be talking about context later in this lesson with regard to the `this` keyword. The context we'll be discussing later is disparate from "context of execution" that is being defined here. Execution context defined here is referring to scope.

## Types of scope

With the introduction of es6, javascript has 3 different types of scope:

- global scope
- local/function scope
- block scope

### Global scope

There are a couple different ways to instantiate a variable in the global scope.

One way is to assign a variable in the global name space:

```js
const myCoolGlobalVariable = 'some string';
```

Another way to define a variable in the global scope is to simply not use a declaration keyword(eg. `var`, `const`, `let`) anywhere in our JS code. Example:

```js
const myCoolGlobalVariable = 'some string' // normal global instantiation

function someFunc() {
  anotherGlobalVariable = 'some other string' // global instantiation within a function whenever this function is called
}

console.log(anotherGlobalVariable) // errors
someFunc() // assigns 'some other string' to anotherGlobalVariable
console.log(anotherGlobalVariable) // prints 'some other string'
```

> the above code fails when it tries to log `anotherGlobalVariable` the first time, therefore the rest of the code won't execute as a result. The comments that follow the subsequent lines assumes removing the lines of code that error. Other snippets in this lesson will follow this pattern for brevity, but be aware that code execution will stop after the error occurs.

One thing to note is whether we define a global variable through a declaration keyword or without. [It's generally bad practice.](http://wiki.c2.com/?GlobalVariablesAreBad) Additionally, as a general rule of thumb, we should only use no declaration assignments(without `let`, `const`, `var`) for reassignment only.

### Local scope

Otherwise known as function scope. Functions in javascript serve as closures. This creates a local scope that is bound to that function. That is to say, variables assigned with any declaration keyword within a function are only accessible inside of that function. Example:

```js
function someFunc() {
  const name = 'bob';
  console.log(name) // when someFunc is invoked, it will print 'bob'
}

someFunc()
console.log(name); // errors
```

### Block scope

With the introduction of es6, we know have access to the `const` and `let` keywords. Variables instantiated with these keywords have block scope. Scope contained within `{}`.

[According to MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block) JS levered block statements "to group zero or more statements. The block is delimited by a pair of curly brackets". We've actually written blocks all the time, any time we write a for loop or a if statement, they are usually followed by some block. Here's a simple block statement:

```js
{
  console.log('wow, this is executing in a block!')
}
```

Variables defined using `const` and `let` within a block are scoped to that block. Here are some examples:

```js
{
  const name = 'bob';
  console.log(name); // prints bob
}

console.log(name) // errors

// for loop with let
for (let i = 0; i < 10; i++) {
  console.log(i) // logs 0 - 9 as it progresses through the loop
}

console.log(i) // errors because i is scoped to the block executing the for loop

// for loop with var
for (var j = 0; j < 10; j++) {
  console.log(j) // logs 0 - 9 as it progresses through the loop
}

console.log(j); // prints 10, using var creates local scope, ie not scoped to the block above, and therefore accessible outside of the block
```

`if`, `else if`, `else` and `switch` statements all use blocks as well.

******Insert scope exercise here.******

## [`this` (Context)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

In english we use pronouns to circumvent redundancy. Say we write the following:

```
They are trying to catch the train."
```

This sentence makes some sense by itself, but we really only know that some group of people are trying to catch a train.

If we add some "context" to that sentence we have a better sense of what "they" is:

```
"Susy and John are running fast because they are trying to catch the train"
"A group of gorillas are out of breath because they are trying to catch the train"
"Self aware robots are computing wait times because they are trying to catch the train"
```

Similar to how we use pronouns in english, we use the `this` keyword as a replacement for an object.

Every time a Javascript function is called, a context is determined/set.

It's really important to understand this sentence, so we'll just reiterate it here. The most important thing that gives `this` its value is **how it is called** not how or when it was defined.

> In the lion's share of function invocations, `this` is given its value by how it is called. We'll see later in this lesson that we can also explicitly set the value of `this`

That context is always an object, and can be referenced in the function definition (code) using a special keyword in JS, `this`.

### [Global context ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#Global_context)

In the browser's global execution context(scope), `this`(context) is the `window` object. [MDN's code snippet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#Global_context) does a great job depicting this:

```js
// In web browsers, the window object is also the global object:
console.log(this === window); // true

a = 37;
console.log(window.a); // 37

this.b = "MDN";
console.log(window.b)  // "MDN"
console.log(b)         // "MDN"
```

### [Function Context](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#Function_context)

> Note the first part of this will deal exclusively on functions that are created with the `function` keyword **not** arrow functions. We'll have a dedicated section to arrow functions afterward.

MDN:

> Inside a function, the value of `this` depends on how the function is called.

Let's take a look at a simple function that logs `this`:

```js
function logThis() {
  console.log(this);
}

logThis();
// prints
// window object
```

As we'd expect, this returns `window`. The function is called in the global scope therefore `this` is the window.

This next bit of code a bit more interesting:

```js
function logThis() {
  console.log(this);
}

var person = {
  name: 'mary',
  loggingThisFromPersonObject: logThis,
}

person.loggingThisFromPersonObject()
// prints
// {name: 'mary', loggingThisFromPersonObject: f()}
```

This brings us to a general rule of thumb for context.

In general, `this` is whatever was to the left of the period when it was called, unless...

### You do

In groups, try to determine what the two values of `this` will be in the following code.

html:
```html
<button id="test">Click me!</button>
```

js:
```js
const button = document.getElementById('test');
button.addEventListener('click' , function() {
  console.log(this);
  setTimout(function() {
    console.log(this);
  }, 500)
})
```

Now run this code in [codepen](TODO: get codepen)

<details>
  <summary>
    These's are the the gotcha's
  </summary>
  <br>
  <li>We're in an event listener function, in which case `this` is the thing that the listener is attached to.</li>
  <li>We're in another callback function(`setTimeout`, `setInterval` etc.), in which case `this` is probably the Window.</li>
  <li>`setTimeout` and `setInterval` are defined on the `window` object. When called with a normal function `this` is always the `window`.</li>

</details>

### Setting `this` with [`.call`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call), [`.apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

We can also explicitly set the value of `this` inside functions using `.call`, `.apply`.

`.call` and `.apply` are functionally equivalent. They both invoke the function that `.call` is invoked on with an explicit context. One requires you to pass in multiple arguments(`.call`) the other makes you pass in the arguments as an array(`.apply`).

We'll be using `.call` in these examples for brevity but know that we could just as easily use `.apply`. Let's revisit the `logThis` function but "call" it with an explicit context

```js
function logThis() {
  console.log(this);
}

logThis.call({name: 'bob'});
// prints
// {name: 'bob'}
```

This isn't a super clear demonstration of how to use call, but it does show us one important thing, the context was definitely not the `window` object. `this` in the call above is the object literal passed in as the 1st arugment of the `.call` function.

Here's a better example of how `logThis` would work with arguments and the order of arguments for `.call`:

```js
function logThisWithStrings(str1, str2) {
  console.log(this);
  console.log(str1, str2);
}

const theExplicitContextObject = {
  name: 'bob',
}
logThisWithStrings.call(theExplicitContextObject, 'This is how', 'call works');
// prints
// {name: 'bob'}
// This is how call works
```

The `.call` function takes at any number of optional arguments. The first optional argument is always the explicit context we want to set. The remaining arguments map to the arguments of the function being `.call`'ed

### Setting `this` with [`.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

`.bind` works a bit differently but in the same vein as `.call` and `.apply`. `.bind` returns a function that has it's context set explicitly.

```js
function logThisWithStrings(str1, str2) {
  console.log(this);
  console.log(str1, str2);
}

const theExplicitContextObject = {
  name: 'bob',
}

const newLogFunctionWithExplicitContext = logThisWithStrings.bind(theExplicitContextObject, 'This is how', 'bind works');

newLogFunctionWithExplicitContext()
// prints
// {name: 'bob'}
// This is how bind works
```

### [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

Arrow functions have lexical binding. This is a bit of a misnomer. Arrow functions actually lack a binding to the `this` keyword.

Let's take a look at an example to help highlight this:

```js
function callSetTimeoutWithNormalFunction() {
  console.log('this outside the timeout in a normal function: ', this);
  setTimeout(function() {
    console.log('this in a normal function: ', this)
  }, 0)
}

function callSetTimeoutWithArrowFunction() {
  console.log('this outside the timeout in an arrow function: ', this);
  setTimeout(() => {
    console.log('this in a arrow function: ', this)
  }, 0)
}

callSetTimeoutWithNormalFunction();
callSetTimeoutWithArrowFunction();
```

When calling these in a global name space, nothing is different with respect to the value of `this` in either invocation. But let's combine our knowledge of scope and context together by looking at this next example:


```js
function callSetTimeoutWithNormalFunction() {
  console.log('this outside the timeout in a normal function: ', this);
  setTimeout(function() {
    console.log('this in a normal function: ', this)
  }, 0)
}

function callSetTimeoutWithArrowFunction() {
  console.log('this outside the timeout in an arrow function: ', this);
  setTimeout(() => {
    console.log('this in a arrow function: ', this)
  }, 0)
}

const someObjWithNormalTimeout = {
  type: 'normal',
  callTimeout: callSetTimeoutWithNormalFunction,
}

const someObjWithArrowTimeout = {
  type: 'arrow',
  callTimeout: callSetTimeoutWithArrowFunction,
}

someObjWithNormalTimeout.callTimeout();
someObjWithArrowTimeout.callTimeout();
```

We know from earlier in this lesson that `this` in both instances outside of the timeout will be the object that it is called on. However, we see that the value of `this` is different depending on whether we use a normal function or an arrow function.

We know from earlier in the lesson, that functions like `setInterval` and `setTimeout` bind `this` to the window. However, in an arrow function `this` isn't bound at all. Instead it follows the rules of scope.

Because it is not bound nor defined by the arrow function, it will look up it's value lexically(in a parent scope). It is defined in the parent function `callSetTimeoutWithArrowFunction` because that function does have a binding to `this`. Thereby deriving the value of `this`.
