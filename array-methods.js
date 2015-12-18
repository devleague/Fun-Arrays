var dataset = require('./dataset.json');
//mindful of the way the tests are written, doesn't cache, and bc objects are kept in memory still references object(old, new, modified)
//so created a 'copy' below using 'map' here at the top, which is defensive programming vs working off original 'raw' data ..
var bankBalances = dataset.bankBalances.map(function (element){
  return {
    amount: element.amount,
    state: element.state,
  };
});
/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/
var hundredThousandairs = null;
//below enables us to access the bankBalances, see above in dataset require
var newArray = bankBalances.filter(overHundredThous);
hundredThousandairs = newArray;

function overHundredThous(element) {
  if (element.amount > 100000.00){
    return true;
  }
}
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
//using MAP, think creating a 'copy' a 'save as' vs making modifications that will be set in stone, and leak out to code - see var bankBalances above
var roundedDollar = bankBalances.map(removedDecimal);

function removedDecimal (element){
//adding a new property 'element.rounded' while also creating a rounded value to it
    element.rounded = Math.round(element.amount);
    //by returning element vs element.rounded, returns ALL properties(amount, state, rounded)
    return {
      amount: element.amount,
      state: element.state,
      rounded: Math.round(element.amount)
    };
}
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
var roundedDime = bankBalances.map(roundTenCents);

function roundTenCents (element) {

  return {
    amount:round10(element.amount),
    state: element.state,
  };
}
function round10 (number) {
  //throwing number as a string into parseFloat, so now a number
  number = parseFloat(number);
  var toTenCents = number.toFixed(1);
  //fixed spits out a string, which parseFloat converts back to number
  return parseFloat(toTenCents);
}

// set sumOfBankBalances to the sum of all amounts in bankBalances
//0 start at previous set to 0
var sumOfBankBalances = bankBalances.reduce(addBalances, 0);

function addBalances (previous, current){
  //previous is the value being passed in, adding to current.amount
  //working from in --> out
  return parseFloat((previous + parseFloat(current.amount)).toFixed(2));
}
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
var sumOfInterests = bankBalances.reduce(applyInterest, 0);

function applyInterest (previous, current){
  var stateArray = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'];

  if (stateArray.indexOf(current.state) > -1){
  //previous is assumed (no need '.amount') bc defined with current.amount
  return parseFloat((previous + parseFloat(current.amount * 0.189)).toFixed(2));
  }
  //need to still pass previous if not in stateArray bc don't want previous forgotten
  return previous;
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

 function certainStates (element, index, array){
  var stateArray = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'];
  if (!(stateArray.indexOf(element.state) > -1)){
    return element;
  }
 }
var otherStates = dataset.bankBalances.filter(certainStates);
var sumOfHighInterests = otherStates.reduce(function(stateTotals, current) {
  var stateAbbrev = current.state;
  var stateAmount = parseFloat(current.amount);

  if (!(stateTotals.hasOwnProperty(stateAbbrev))){
    stateTotals[stateAbbrev] = stateAmount;
  } else{
    stateTotals[stateAbbrev] += stateAmount;
  }
  return stateTotals;
}, {});
// console.log(sumOfHighInterests);

var highestInterestSums = 0;

for (var key in sumOfHighInterests) {
  var interest = parseFloat((sumOfHighInterests[key] * 0.189).toFixed(2));
  if (interest > 50000){
    highestInterestSums += interest;
  }
}
//assertion error of returing object
//needed to redefine sumOfHighInterest to equal ..
//needed to round and parseFloat again
sumOfHighInterests = parseFloat((highestInterestSums).toFixed(2));
console.log(sumOfHighInterests);
/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
var stateSums = bankBalances.reduce(function(stateTotals, current) {

  var stateAbbrev = current.state;
  //why some are not rounding to nearest cent?
  var stateAmount = parseFloat(current.amount);

  if(!(stateTotals.hasOwnProperty(stateAbbrev))){
    //IMP line! this refers to a key value pair; specific row; this state = this amount
    stateTotals[stateAbbrev] = stateAmount;
  } else{
    stateTotals[stateAbbrev] += Math.floor(stateAmount);


  }

  //return previous (which is stateTotals) to keep code going for the next call
  return stateTotals;

}, {}); //emptyObj = previous value; optional if provided (start at 1st element) or not (start at 2nd element)

// console.log(stateSums);

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