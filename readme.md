# JS Scope and Context (1/1)

In this class we'll dive into scope and context. We'll see the importance of how and where variable assignment occurs in the JS ecosystem. We'll also learn about context and the value of `this`. A full understanding of these concepts will help create better foundations for our javascript code as well as increase our efficiencies in debugging.

## Learning Objectives (2/3)
- Describe scope and how it governs how data is able to be accessed in code
- Differentiate between `var`, `let`, and `const` keywords in variable assignment
- Differentiate between global, local, and block scope
- Explain Javascript context and how the value of the 'this' is derived
- Explain the default context of Javascript executing in the browser
- Use `.call`, `.apply`, `.bind` to explicitly set context
- Explain how "lexical binding" works with arrow functions
- Use `console.log(this)`

## Scope (1/4)

Javascript scope is key to understanding how variables and functions are defined and accessed. A strong understanding of JS scope allows us to write code faster while also writing more maintainable code. Additionally, a strong understanding of scope allows developers to debug more rapidly.

##  What is scope? (5/9)

Let's first note what the english meaning of scope is according to [Merriam-Webster](https://www.merriam-webster.com/dictionary/scope). There are 2 listed definitions that are apt for our discussion:

> - space or opportunity for unhampered motion, activity, or thought
> - extent of treatment, activity, or influence

Let's compare that to [MDN's definition of scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope):

> The current context of execution. The context in which values and expressions are "visible," or can be referenced. If a variable or other expression is not "in the current scope," then it is unavailable for use. Scopes can also be layered in a hierarchy, so that child scopes have access to parent scopes, but not vice versa.

In simpler terms, scope is:

- Where a variable can be referenced or used.
- a list of all variables that can be accessed from a specific line of code.
- a chain of lookups to see if a variable has a value

Something to note here. MDN is usually really great in terms of documentation. However, here, there's a bit of conflation with regard to how the word "context" is used. In the above definition, "context of execution" is really "execution context" which ultimately is scope. We'll be talking about context later in this lesson with regard to the `this` keyword. The context we'll be discussing later is disparate from "context of execution" that is being defined here. Execution context defined here is referring to scope.

## Types of scope (1/10)

With the introduction of es6, javascript has 3 different types of scope:

- global scope
- local/function scope
- block scope

### Global scope (3/13)

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

One thing to note is whether we define a global variable through a declaration keyword or without. [It's generally bad practice.](http://wiki.c2.com/?GlobalVariablesAreBad) Additionally, as a general rule of thumb, we should only use `=` assignment operators without `let`, `const`, `var` for reassignment only.

### Local scope (3/16)

Otherwise known as function scope. Functions in javascript serve as closures. This creates a local scope that is bound to that function. That is to say, variables assigned with any declaration keyword within a function are only accessible inside of that function. Example:

```js
function someFunc() {
  const name = 'bob';
  console.log(name) // when someFunc is invoked, it will print 'bob'
}

someFunc()
console.log(name); // errors
```

### Block scope (5/21)

With the introduction of es6, we now have access to the `const` and `let` keywords. Variables instantiated with these keywords have block scope. Scope contained within `{}`.

[According to MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block) JS leverages block statements "to group zero or more statements. The block is delimited by a pair of curly brackets". We write blocks all the time, any time we write a `for` loop or an `if` statement, they are usually followed by some block. Here's a simple block statement:

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

## You do - Scope Exercise(10/31)

Review the follow code for 1 minute:

```js
{
  var name = 'America';
  const name1 = 'Ruby';
  let name2 = 'Bob';
}
/* A */
function func1() {
  name = 'Tom';
  let j = 0;
  let k = 0;
  /* B */
  for (var i = 0; i < 10; i++) {
    var name1 = 'Mary';
    let j = 5;
    let k = 5;
    m = 11;
  }
  /* C */
  for (let k = 0; k < 10; k++) {
    let name2= 'Sue';
    j++;
    var i = 15;
    n = 15;
  }
  /* D */
}
/* E */
func1()
/* F */
```

Go to this [google spreadsheet](https://docs.google.com/spreadsheets/d/11s0YzqyXvUVeusRQjmHUzWy-55tEq9qPOF56bVpgD9w/edit?usp=sharing). Copy and paste it into your own sheet so that you can edit it.

For each intersection of variable and letter. Assign a value that you think it would have at that given point in the code.

Work in groups to fill out the chart.

> No value or what would cause an error if referenced can be an answer for these questions as well.

> There are some answers that have to do with hoisting, in which case what you may think as an error is actually undefined instead. We didn't go over hoisting in this class so don't worry too much about this discrepancy.

[Here's the answer key](https://docs.google.com/spreadsheets/d/1yf_taUnu40eoSZqqOZ8b_lu56LFOMrXfId1tywtLnPE/edit?usp=sharing)

## [`this` (Context)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) (5/36)

In english we use pronouns to circumvent redundancy. Say we write the following:

```
"They are trying to catch the train."
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

### [Global context ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#Global_context) (2/38)

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

### [Function Context](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#Function_context) (5/43)

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

Again, we want to stress here the importance of how each of these functions were called rather than how it was defined. This brings us to a general rule of thumb for context.

In general, `this` is whatever was to the left of the period when it was called, unless...

### You do (5/48)

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
  setTimeout(function() {
    console.log(this);
  }, 500)
})
```

Check this [codepen](https://codepen.io/rv-akim/pen/rRYvoJ?editors=1010) after you determine your groups answers.

<details>
  <summary>
    These's are the the gotcha's
  </summary>
  <br>
  <li>We're in an event listener function, in which case <code>this</code> is the thing that the listener is attached to.</li>
  <li>We're in another callback function(<code>setTimeout</code>, <code>setInterval</code> etc.), in which case <code>this</code> is probably the Window.</li>
  <li><code>setTimeout</code> and <code>setInterval</code> are defined on the <code>window</code> object. When called with a normal function <code>this</code> is always the <code>window</code>.</li>

</details>

### Setting `this` with [`.call`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) and [`.apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)(7/55)

We can also explicitly set the value of `this` inside functions using `.call` and `.apply`.

`.call` and `.apply` are functionally equivalent. They are both prototype methods of the `Function` class in javascript. Meaning every function in javascript has a `call` and `apply` method.

They both invoke the function they are called on with an explicit context. One requires you to pass in multiple arguments(`.call`) the other makes you pass in the arguments as an array(`.apply`).

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

### Setting `this` with [`.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)(5/60)

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

### [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)(5/65)

Arrow functions have "lexical binding". This is a bit of a misnomer. Arrow functions actually lack a binding to the `this` keyword. Instead they gets their value for `this` from a parent scope.

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

Because it is not bound nor defined by the arrow function, it will look up it's value lexically(in a parent scope). It is defined in the parent function `callSetTimeoutWithArrowFunction` because that function does have a binding to `this`. Thereby deriving the value of `this` for the arrow function.

## USE `console.log` / `debugger` (2/67)

If nothing else was gathered from this lesson, let remember that we can always just look at `this`.

```
// just log it
console.log(this)

// leverage debugger
debugger
```

"This" is probably the best take away from the lesson.
