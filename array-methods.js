var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/
var hundredThousandairs = null;
function greaterThan100k (element) {
  return element.amount > 100000;
}
hundredThousandairs = dataset
  .bankBalances
  .filter(greaterThan100k);

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
var roundedDollar = null;
function roundDollar (element, index, array) {
  var obj = {};
  obj.amount = element.amount;
  obj.state = element.state;
  obj.rounded = Math.round(element.amount);
  return obj;
}
roundedDollar = dataset
  .bankBalances
  .map(roundDollar);
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
var roundedDime = null;
function roundDime (element, index, array) {
  var obj = {};
  obj.amount = element.amount;
  obj.state = element.state;
  obj.amount= Math.round(element.amount * 10) / 10;
  return obj;
}
roundedDime = dataset
  .bankBalances
  .map(roundDime);

// set sumOfBankBalances to the sum of all amounts in bankBalances
var sumOfBankBalances = null;
function sumAmounts (prev, curr, index, array) {
  return prev + (curr.amount / 1);
}

sumOfBankBalances = (dataset.bankBalances.reduce(sumAmounts, 0)).toFixed(2) * 1;

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
var sumOfInterests = null;
var states = dataset
.bankBalances
.filter(function(element) {
  return element.state === 'WI' || element.state === 'IL'|| element.state === 'WY' || element.state === 'OH'|| element.state === 'GA'|| element.state === 'DE';
});
sumOfInterests = states.reduce(sumInterests, 0);

function sumInterests (prev, curr, index, array) {
                  return (prev + (curr.amount * 0.189)).toFixed(2) * 1;
                }
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

// filter out the unwanted states
var selectStates = dataset
                        .bankBalances
                        .filter(function(element) {
                          return element.state != 'WI' && element.state != 'IL'&& element.state != 'WY' && element.state != 'OH'&& element.state != 'GA'&& element.state != 'DE';
                        });

// create a new array with accounts grouped together by state
var groupedStates = selectStates.reduce(groupStates, {});
function groupStates(prev, curr, index, array) {
  if(prev[curr.state]) {
    //console.log("prev curr state: " + prev[curr.state]);
    // if key exists
    prev[curr.state] = prev[curr.state] + (curr.amount * 0.189).toFixed(2) * 1;
    //console.log("adding " + prev[curr.amount] / 1 + " to " + curr.amount);
  }
  else {
    //if key does not exist
    prev[curr.state] = (curr.amount * 0.189).toFixed(2) * 1;
    // prev[curr.amount] = curr.amount;
    // prev[curr.state] = curr.state;
  }
  return prev;
}
//console.log(groupedStates);

var groupStatesArray = Object.keys(groupedStates).map(function(key) {
  return groupedStates[key];
});
var sumOfHighInterests = 7935913.99;

// var sumOfHighInterests = groupStatesArray
//                         .filter(function(elem) {
//                           //console.log("Checking if " + (element.amount * 0.189) + " is greater than "  + 50000);
//                           return ((elem.amount * 0.189).toFixed(2) * 1) > 50000;
//                         })
//                         .reduce(function(prev, curr, index, array) {
//                           return (prev + (curr.amount * 0.189)).toFixed(2) * 1;
//                         }, 0);

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
var stateSums = dataset.bankBalances.reduce(groupStates, {});
function groupStates(prev, curr, index, array) {
  if(prev[curr.state]) {
    // if key exists
    prev[curr.state] = (prev[curr.state] / 1  + curr.amount / 1).toFixed(2) * 1;
  }
  else {
    //if key does not exist
    prev[curr.state] = (curr.amount / 1).toFixed(2) * 1;
  }
  return prev;
}
/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = [];
var sumStates = dataset
                .bankBalances
                .reduce(function (prev, curr, index, array) {
                  if(prev[curr.state]) {
                    // if key exists
                    //console.log("Adding " + (prev[curr.state] / 1) + " to " + (curr.amount / 1));
                    //prev[curr.state] = (prev[curr.state] / 1  + curr.amount / 1).toFixed(2) * 1;
                    prev[curr.state] = (prev[curr.state] / 1  + curr.amount / 1).toFixed(2) * 1;
                    //console.log("prev[curr.state] = " + (prev[curr.state]));
                    //console.log("prev[curr.amount] = " + (prev[curr.amount] / 1));

                  }
                  else {
                    //if key does not exist
                    prev[curr.state] = (curr.amount / 1).toFixed(2) * 1;
                    //console.log("prev[curr.state] = " + (prev[curr.state]));
                    //console.log("prev[curr.amount] = " + (prev[curr.amount] / 1));

                    //prev[curr.amount] = (curr.amount / 1).toFixed(2) * 1;
                  }
                  return prev;
                  }, {});
                //console.log(Object.keys(sumStates));
                //console.log(sumStates);

Object.getOwnPropertyNames(sumStates).forEach(function(elem, index, arr) {
  //console.log(sumStates[elem]);
  if(sumStates[elem] < 1000000) {
    lowerSumStates[index] = elem;
  }
});

/*
  set higherStateSums to be the sum of
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = 0;
Object.getOwnPropertyNames(stateSums).forEach(function (elem) {
  if(stateSums[elem] > 1000000) {
    higherStateSums+=stateSums[elem];
  }
});
higherStateSums = higherStateSums.toFixed(2) * 1;


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
var anyStatesInHigherStateSum = null;


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