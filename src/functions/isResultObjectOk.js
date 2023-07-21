const isResultObjectOk=(
  
  result,
  resultArgsArray,
  errorText,
  errorTextFunction)=>{

  const getErrorTextFunction=()=>{
    if (
      errorTextFunction !== null 
      && typeof errorTextFunction === 'function'
    ) {
      return errorTextFunction;
    } else {
      return console.error;
    }
  };

  if (result===null || typeof result !== 'object') {
    getErrorTextFunction()(errorText !==null && typeof errorText === 'string'? errorText : '');
    return false;
  }
  if (result.hasOwnProperty('err') && typeof result.err === 'string') {
    getErrorTextFunction()(result.err);
    return false;
  }
  if (resultArgsArray===null || resultArgsArray.length===0) {
    return true;
  }
  if (resultArgsArray.find(arg => {
    try {
      result=result[arg];
      return false;
    } catch {
      return true;
    }
  })===undefined) {
    if (result!==null && typeof result === 'object') {
      return true;
    }
  }
  return false;
}; 

// test case
// let arr=[
//   result,
//   null,
//   undefined,
//   [],
//   {},
//   '',
//   NaN
// ];

// arr.map(item=>{
//   console.log(item);
//   console.log('is:',isResultObjectOk(item,['kktChecks',0]));

// });
// console.log('done');

export default isResultObjectOk;
