function logThisWithStrings(str1, str2) {
  console.log(this);
  console.log(str1, str2);
}

const theExplicitContextObject = {
  name: 'bob',
}
const newLogFunctionWithExplicitContext = logThisWithStrings.bind(theExplicitContextObject, 'This is how', 'bind works');

newLogFunctionWithExplicitContext()
