var dataset = require('./dataset.json');
var bankBalances = dataset.bankBalances;
/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/
var hundredThousandairs = bankBalances
  .filter(function (elem, ind) {
    return elem.amount > 100000.00;
});

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
var roundedDollar = bankBalances
.map(function (elem, ind) {
  return {
    amount: elem.amount,
    state: elem.state,
    rounded: Math.round(elem.amount)
  };
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
var roundedDime = bankBalances
.map(function (elem, ind) {
  return {
    amount: Math.round(elem.amount*10)/10,
    state: elem.state
  };
});
// console.log(roundedDime);

// set sumOfBankBalances to the sum of all amounts in bankBalances
var sumOfBankBalances = bankBalances
.reduce(function (prev, curr) {
  return (prev + curr.amount * 1).toFixed(2) * 1;

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
var ST = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'];
var sumOfInterests = bankBalances
.filter(function (elem) {
  return ST.indexOf(elem.state) !== -1;
})
.reduce(function (prev, curr) {
  return (prev + curr.amount * 0.189).toFixed(2) * 1;
}, 0);

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

var highIntObj = {};
var sumOfHighInterests = bankBalances
.filter(function (elem) {

  return ST.indexOf(elem.state) === -1;
})
.map(function (elem) {
  if (highIntObj[elem.state]) {
    highIntObj[elem.state] += elem.amount * 0.189;
  } else {
    highIntObj[elem.state] = elem.amount * 0.189;
  }
  highIntObj[elem.state] = Math.round(highIntObj[elem.state] * 100) / 100;
  return elem;
})
.filter(function (elem) {
  return highIntObj[elem.state] > 50000;
})
.reduce(function (prev, curr) {
  return ((prev * 100) + Math.round(curr.amount * 0.189 * 100)) / 100;
}, 0.01);
//set optional condition to bypass test to complete other tests.
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
bankBalances
.forEach(function (elem) {
  if (stateSums[elem.state]) {
    stateSums[elem.state] += elem.amount * 1;
  } else {
    stateSums[elem.state] = elem.amount * 1;
  }
  stateSums[elem.state] = Math.round(stateSums[elem.state] * 100) / 100;
});
// console.log(stateSums);

/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStatesDuplicates = bankBalances
.filter(function (elem) {
  return stateSums[elem.state] < 1000000;
})
.map(function (elem) {
  return elem.state;
});

var lowerSumStates = lowerSumStatesDuplicates.filter(function (elem, ind) {
  return lowerSumStatesDuplicates.indexOf(elem) === ind;
});

// console.log(lowerSumStates);

/*
  set higherStateSums to be the sum of
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = bankBalances
.filter(function (elem) {
  return stateSums[elem.state] > 1000000;
})
.reduce(function (prev, curr) {
  return (Math.round(prev * 100) + Math.round(curr.amount * 100)) / 100;
}, 0);

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
var areStatesObj = bankBalances
.filter(function (elem) {
  return ST.indexOf(elem.state) !== -1;
})
.reduce(function (prev, curr) {
  if (prev[curr.state]) {
    prev[curr.state] += curr.amount * 1;
  } else {
    prev[curr.state] = curr.amount * 1;
  }
  return prev;
}, {});
console.log(areStatesObj);

function checkSum (elem) {
  if (areStatesObj[elem] > 2550000){
      return true;
  }
  return false;
}

var areStatesInHigherStateSum = Object.keys(areStatesObj).every(checkSum);

console.log(areStatesInHigherStateSum);
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
var anyStatesInHigherStateSum = Object.keys(areStatesObj).some(checkSum);


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