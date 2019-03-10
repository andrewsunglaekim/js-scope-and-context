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

const someObjWithArrowTimeout = {
  type: 'arrow',
  callTimeout: callSetTimeoutWithArrowFunction,
}

const someObjWithNormalTimeout = {
  type: 'normal',
  callTimeout: callSetTimeoutWithNormalFunction,
}

someObjWithArrowTimeout.callTimeout();
someObjWithNormalTimeout.callTimeout();
