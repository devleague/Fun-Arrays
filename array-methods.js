var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/

var money = [];
 dataset.bankBalances.forEach(function(element, index, array){
  if(parseFloat(element.amount) > 100000)
    money.push(element);

});
var hundredThousandairs = money;

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
  var roundedDollar = dataset.bankBalances.map(function(element, index, array){
    var account = {
        amount:element.amount,
        state: element.state,
        rounded:  Math.round(parseFloat(element.amount))
    };
        return account;
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

var roundedDime = dataset.bankBalances.map(function(element, index, array){
    var account = {
        amount: parseFloat(Math.max( Math.round(element.amount * 10) / 10).toFixed(1)),
        state: element.state,
    };
        return account;
  });


// set sumOfBankBalances to the sum of all amounts in bankBalances
var sum = 0;
 dataset.bankBalances.forEach(function(element,idx, array){
   var dolla = parseFloat(element.amount);
   sum += dolla;
});
var sumOfBankBalances =    parseFloat(sum.toFixed(2));
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

var ISUM = 0;
var states = ['WI','IL','WY','OH','GA','DE'];
var sumStates = dataset.bankBalances.filter(function(ele){
 return states.indexOf(ele.state) !== -1;
});

sumStates.forEach(function(element,index,array){

var dolla =   parseFloat(Math.max( Math.round(element.amount * 100) / 100));
ISUM +=  Math.round(dolla * 0.189 * 100) / 100;
});

var sumOfInterests = parseFloat(ISUM.toFixed(2));
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
var noStates = dataset.bankBalances.reduce(function (prev, curr, idx, arr) {
  if (prev[curr.state]) {
  } else {
    prev[curr.state] = 0;
  }
  return prev;
},{});

var total = 0;
for (var obj in noStates) {
  dataset.bankBalances.forEach(function(element,index, array){
  if(element.state == obj)
    noStates[obj] += parseFloat(element.amount);
});
}



var highStates = [];
for( var obj in noStates){
  if(obj !== 'WI' && obj !== 'IL' && obj !== 'WY' && obj !== 'OH' && obj !== 'GA' && obj !== 'DE'){
    var goodStates = {
    state: obj,
    amount: noStates[obj]
    };
    highStates.push(goodStates);
  }
}
highStates.forEach(function(element,index,array){
    var dolla =Math.round(element.amount * 0.189 * 100) / 100;
  if(dolla > 50000)
    total += dolla;
});
total = Math.round(total * 100) / 100;


var sumOfHighInterests = total;

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
 for (var obj in noStates) {
  noStates[obj]=Math.round(noStates[obj]  * 100) / 100;
}
var stateSums = noStates;
/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state
  where the sum of amounts in the state is
    less than 1,000,000
 */
 var lowestSum = [];
  for (var obj in noStates) {
    if(noStates[obj] < 1000000)
      lowestSum.push(obj);
}
var lowerSumStates = lowestSum;


/*
  set higherStateSums to be the sum of
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
  var highestSum = 0;
  for (var obj in noStates) {
    if(noStates[obj] > 1000000)
      highestSum += noStates[obj];
}
var higherStateSums = highestSum;


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
 var theStatesCheck = 0;
  for (var obj in noStates) {
    if(obj === 'WI' || obj === 'IL' || obj === 'WY' || obj === 'OH' || obj === 'GA' || obj === 'DE')
      if(noStates[obj] > 2550000)
        theStatesCheck++;
}
var areStates = false;
if(theStatesCheck === 6)
  areStates = true;
var areStatesInHigherStateSum = areStates;

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
 var anyStates = false;
 if(theStatesCheck > 0)
  anyStates = true;
var anyStatesInHigherStateSum = anyStates;

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