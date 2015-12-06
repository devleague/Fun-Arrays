var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/

// desination array, what we want to fill
var hundredThousandairs = null;

// bank balance array
var bankBalancesArray = dataset.bankBalances;

// copy of balances
var balanceCopiesArray = dataset.bankBalances.map(function (balance) {
  return {
    amount: balance.amount,
    state: balance.state
  };
});

// define function to check balance amount
function ballerBalances (element) {
  // returns result of the test
  return element.amount > 100000;
}

// saves new array given from filter function to desination (hundredThousandairs)
hundredThousandairs = balanceCopiesArray.filter(ballerBalances);

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

// function to round numbers
function roundNumbers (amount, roundTo) {
  return parseFloat(parseFloat(amount).toFixed(roundTo));
}

var roundedDollar = null;

// function to round dollar amounts
function roundToDollars (element) {
  // return object with rounded key
  return {
    amount: element.amount,
    state: element.state,
    rounded: Math.round(element.amount)
  };
}

// roundedDollar is a bankBalanceArray but with rounded key
roundedDollar = balanceCopiesArray.map(roundToDollars);

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

// function to round to nearest cents
function modifyAmount (element) {
  // var that rounds elements amount to nearest tenth
  var roundedToDime = parseFloat(element.amount).toFixed(1);

// returns object, need to parseFloat again because toFixed changes back to string
  return {
    amount: parseFloat(roundedToDime),
    state: element.state
  };
}

roundedDime = balanceCopiesArray.map(modifyAmount);

// set sumOfBankBalances to the sum of all amounts in bankBalances
var sumOfBankBalances = null;

// function so return sum of all bankBalances rounded to nearest cent
function balanceSums (previous, current) {
  // returns obj that invokes roundNumbers function
  return {
    amount: roundNumbers(previous.amount, 2) + roundNumbers(current.amount, 2)
  };
}

sumOfBankBalances = balanceCopiesArray.reduce(balanceSums).amount;
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

// interest that have 18.9% interest
var interestStates = balanceCopiesArray.filter(function(element) {
  if (element.state === 'WI' || element.state === 'IL' || element.state === 'WY' || element.state === 'OH' || element.state === 'GA' || element.state === 'DE') {
    return element;
  }
});


// function to add interests
function interestSums (previous, current) {
  // previous is a number, dont need to add interest on this because itll end up adding it twice
  var previousStateInterest = parseFloat(previous);

  // current.amount is a number a string, parseFloat to get number, then times by interest
  var currentStateInterest = parseFloat(current.amount) * 0.189;

  // use rounding function to round to nearts cent
  return roundNumbers(previousStateInterest + currentStateInterest, 2);
}

// run reduce and give starting value 0. make sure you ues correct data type. if you were using obj make surew you pass an obj as starting value
sumOfInterests = interestStates.reduce(interestSums, 0);


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

 // 1. filter out states
 // 2. find interest on each account
 // 3. sum of interest on each account for remaining
 // 4. if sum of interest from single state is > 500000, return that state
var sumOfHighInterests = null;

// filter out these states and return remaining
var highInterestStates = balanceCopiesArray.filter(function (element) {
  if (!(element.state === 'WI' || element.state === 'IL' || element.state === 'WY' || element.state === 'OH' || element.state === 'GA' || element.state === 'DE')) {
    return element;
  }
});

// find interest on each returned state
var consolidatedArray = [];
console.log(highInterestStates);

var statePerInterest = highInterestStates.filter(function (element) {
  var totalObjAmount = 0;
  for (var i = 0; i < highInterestStates.length; i++) {
    var currentObjState = highInterestStates[i].state;
    var currentObjAmount = highInterestStates[i].amount;

    for (var k = 0; k < remainingStates.length; k++) {
      
    }

    if (currentObjState === 'ME') {
      totalObjAmount += parseFloat(currentObjAmount);
      consolidatedArray.push({ amount: totalObjAmount, state: 'ME'});
    }

    if (currentObjState === 'FL') {
      totalObjAmount += parseFloat(currentObjAmount);
      consolidatedArray.push({ amount: totalObjAmount, state: 'FL'});
    }

    if (currentObjState === 'AL') {
      totalObjAmount += parseFloat(currentObjAmount);
      consolidatedArray.push({ amount: totalObjAmount, state: 'AL'});
    }

    if (currentObjState === 'OK') {
      totalObjAmount += parseFloat(currentObjAmount);
      consolidatedArray.push({ amount: totalObjAmount, state: 'OK'});
    }

    if (currentObjState === 'UT') {
      totalObjAmount += parseFloat(currentObjAmount);
      consolidatedArray.push({ amount: totalObjAmount, state: 'UT'});
    }

    if (currentObjState === 'UT') {
      totalObjAmount += parseFloat(currentObjAmount);
      consolidatedArray.push({ amount: totalObjAmount, state: 'UT'});
    }
  }
  return consolidatedArray;
});

// filter out states < 50000 and return remaining
var superHighInterest = highInterestStates.filter(function (element) {
  if (element.amount > 50000) {
    return element;
  }
});

function highInterestSum (previous, current) {
  var previousStateInterest = parseFloat(previous);
  var currentStateInterest = parseFloat(current.amount) * 0.189;

  return roundNumbers(previousStateInterest + currentStateInterest, 2);
}

sumOfHighInterests = superHighInterest.reduce(highInterestSum, 0);

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
var stateSums = null;

/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state 
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = null;

/*
  set higherStateSums to be the sum of 
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = null;

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