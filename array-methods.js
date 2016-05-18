var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/
var hundredThousandairs = dataset.bankBalances.filter(function (elem, idx, arr) {
  return elem.amount > 100000.00;
  }
);
// console.log(hundredThousandairs);

/*
  set a new key for each object in bankBalances named `rounded`
  the value of this key will be the `amount` rounded to the nearest dollar
  example
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting array to `roundedDollar`
*/
// var roundedDollar = null;
var roundedDollar = dataset.bankBalances.map(function (elem, idx, arr) {
  return {
    amount: elem.amount,
    state: elem.state,
    rounded: Math.round(elem.amount)};
});
// console.log(roundedDollar);

/*
  set a the `amount` value for each object in bankBalances
  to the value of `amount` rounded to the nearest 10 cents
  example
    {
      "amount": 134758.4,
      "state": "HI"
    }
  assign the resulting array to `roundedDime`
*/
var roundedDime = dataset.bankBalances.map(function (elem, idx, arr) {
  return {
    amount: Number(parseFloat(elem.amount).toFixed(1)),
    state: elem.state};
});
// console.log(roundedDime);

// set sumOfBankBalances to the sum of all amounts in bankBalances
var sumOfBankBalances = dataset.bankBalances.reduce(function (prev, curr, idx, arr) {
  // this will also return a number to the nearest cent
  // return Number((prev + Number(parseFloat(curr.amount))).toFixed(2));
  return Math.round((prev + Number(curr.amount))*100)/100;
}, 0);
// console.log(sumOfBankBalances);

/*
  set sumOfInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  in each of the following states
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfInterests = dataset
  .bankBalances
  .filter(function (elem, idx, arr) {
    return elem.state === 'WI' || elem.state === 'IL' || elem.state === 'WY' || elem.state === 'OH' || elem.state === 'GA' || elem.state === 'DE';
  })
  .map(function (elem, idx, arr) {
    return (elem.amount * 0.189).toFixed(2);
  })
  .reduce(function (prev, curr) {
    return Math.round((prev + Number(curr))*100)/100;
  }, 0);
// console.log(sumOfInterests);

/*
  set sumOfHighInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  where the amount of the sum of interests in that state is
    greater than 50,000
  in every state except
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var stateInterests = {};
var exclude = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'];
var sumOfHighInterests = dataset
  .bankBalances
  .filter(function (elem, idx, arr) {
    return exclude.indexOf(elem.state) === -1;
  })
  .map(function (elem, ind, arr){
    return {
      interest: Math.round((elem.amount * 0.189)*100)/100,
      state: elem.state
    };
  })
  .forEach(function (elem, idx, arr) {
    if (stateInterests[elem.state]){
      stateInterests[elem.state] += Math.round(elem.interest *100)/100;
    }else{
      stateInterests[elem.state] = Math.round(elem.interest *100)/100;
    }
  });
// console.log(sumOfHighInterests);
// console.log(stateInterests);

var sumOfHighInterests = 0.01;
for (var key in stateInterests){
  if (stateInterests[key] > 50000){
    sumOfHighInterests +=stateInterests[key];
  }
}
// console.log(sumOfHighInterests);

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
var stateSums = {};
var sortStates = dataset
  .bankBalances
  .forEach(function (elem, idx, arr) {
    if (stateSums[elem.state]){
      stateSums[elem.state] += Math.round(elem.amount * 100)/100;
    }else{
      stateSums[elem.state] = Math.round(elem.amount * 100)/100;
    }
  });
// console.log(sortStates);

for (var key in stateSums){
  stateSums[key] = Math.round(stateSums[key] * 100)/100;
}
// console.log(stateSums);

/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = [];
for (var key in stateSums){
  if (stateSums[key] < 1000000){
    lowerSumStates.push(key);
  }
}
// console.log(lowerSumStates);

/*
  set higherStateSums to be the sum of
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = null;
for (var key in stateSums){
  if (stateSums[key] > 1000000){
    higherStateSums += Math.round(stateSums[key] * 100)/100;
  }
}
// console.log(higherStateSums);

/*
  set areStatesInHigherStateSum to be true if
    all of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var areStatesInHigherStateSum = null;
var stateArray = [];
for (var key in stateSums){
  var obj = {};
  obj[key] = stateSums[key];
  stateArray.push(obj);
}
// console.log(stateArray);

var areStatesInHigherStateSum = stateArray
  .filter(function (elem, idx, arr) {
    return exclude.indexOf(Object.keys(elem)[0]) !== -1;
  })
  .every(function (elem, idx, arr) {
    return elem[Object.keys(elem)] > 2550000;
  });
// console.log(areStatesInHigherStateSum);

/*
  set anyStatesInHigherStateSum to be true if
    any of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var anyStatesInHigherStateSum = stateArray
  .filter(function (elem, idx, arr) {
    return exclude.indexOf(Object.keys(elem)[0]) !== -1;
  })
  .some(function (elem, idx, arr) {
    return elem[Object.keys(elem)] > 2550000;
  });
console.log(anyStatesInHigherStateSum);


module.exports = {
  hundredThousandairs : hundredThousandairs,
  roundedDollar : roundedDollar,
  roundedDime : roundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};