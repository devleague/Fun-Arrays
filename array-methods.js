var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/
var hundredThousandairs = dataset.bankBalances.filter(function (element, idx, arr){
  if(dataset.bankBalances[idx].amount > 100000.00){
    return dataset.bankBalances[idx].amount;
  }
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
var roundedDollar = dataset.bankBalances.map(function (element, idx, array){
  var roundedObj = {};
  roundedObj.amount = dataset.bankBalances[idx].amount;
  roundedObj.state = dataset.bankBalances[idx].state;
  roundedObj.rounded = Math.round(parseFloat(dataset.bankBalances[idx].amount));
  return roundedObj;
});

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
var roundedDime = dataset.bankBalances.map(function(element, idx, array){
  var dimeObj = {};
  dimeObj.amount = Math.round(dataset.bankBalances[idx].amount * 10)/10;
  dimeObj.state = dataset.bankBalances[idx].state;
  return dimeObj;
});

// set sumOfBankBalances to the sum of all amounts in bankBalances
var sumOfBankBalances = dataset.bankBalances.reduce(function(prev, curr, idx, array){
  return Math.round((prev+parseFloat(curr.amount))*100)/100;
},0);

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
var states = ["WI", "IL", "WY", "OH", "GA", "DE"];
var checkForStates = dataset.bankBalances.filter(function(element, idx, array){
    return states.indexOf(element.state, 0) !== -1;
});
var sumOfInterests = checkForStates.reduce(function(prev, curr, idx, array){
    var interest = parseFloat(curr.amount) * 0.189;
    return Math.round((prev + interest)*100)/100;
},0);
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
var checkForOtherStates = dataset.bankBalances.filter(function(element, idx, array){
    return states.indexOf(element.state, 0) === -1;
});

var result = checkForOtherStates.reduce(function(prev, curr, idx, array){
    if(prev[curr.state]){ //if key exists
      prev[curr.state] += (parseFloat(curr.amount) * 0.189);
    }else{  //if key doesn't exist
      prev[curr.state] = parseFloat(curr.amount) * 0.189;
    }
    return prev;
},{});
var keys = Object.keys(result);
var sumOfHighInterests = 0;
sumOfHighInterests = keys.reduce(function(prev, curr, idx, array){
    if(result[keys[idx]] > 50000){
      sumOfHighInterests += result[keys[idx]];
    }
    sumOfHighInterests = Math.round(sumOfHighInterests*100)/100;
    return sumOfHighInterests;
},0);

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
var stateSums = dataset.bankBalances.reduce(function(prev, curr, idx, array){
    if(prev[curr.state]){
      prev[curr.state] += (parseFloat(curr.amount));
      prev[curr.state] = Math.round(prev[curr.state]*100)/100;
    }else{
      prev[curr.state] = parseFloat(curr.amount);
    }
    return prev;
},{});

/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state
  where the sum of amounts in the state is
    less than 1,000,000
 */
// var lowerSumStates = [];
var stateSumKeys = Object.keys(stateSums);
var lowerSumStates = stateSumKeys.filter(function(element, idx, array){
    return stateSums[stateSumKeys[idx]] < 1000000;
});

/*
  set higherStateSums to be the sum of
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = 0;
higherStateSums = stateSumKeys.reduce(function(prev, curr, idx, array){
    if(stateSums[stateSumKeys[idx]] > 1000000){
      higherStateSums += stateSums[stateSumKeys[idx]];
    }
    return higherStateSums;
},0);

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
var everyTotal = 0;
var specificStateSums = stateSumKeys.filter(function(element, idx, array){
  return states.indexOf(element, 0) !== -1;
});
var higherSpecificStateSums = specificStateSums.filter(function(element, idx, array){
  return stateSums[specificStateSums[idx]] > 1000000;
});
var areStatesInHigherStateSum = higherSpecificStateSums.every(function(element, idx, array){
  return stateSums[specificStateSums[idx]] > 2550000;
});
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
var anyStatesInHigherStateSum = higherSpecificStateSums.some(function(element, idx, array){
  return stateSums[specificStateSums[idx]] > 2550000;
});



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