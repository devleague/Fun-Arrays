var dataset = require('./dataset.json');
debugger;
/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/

var hundredThousandairs = dataset
  .bankBalances
    .filter(function (element, idx, array){
      return element.amount > 100000.00;
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
var roundedDollar = dataset.bankBalances
    .map(function (account, index, array){
      var roundedAccount = {};
      roundedAccount.state = account.state;
      roundedAccount.amount = account.amount;

      var roundedAmt = Math.round(roundedAccount.amount/10 *10);
      roundedAccount.rounded = roundedAmt;

      return roundedAccount;

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
var roundedDime = dataset.bankBalances
    .map(function (account, index, array){
      var roundedDimeAcc = {};
      roundedDimeAcc.amount = Number(parseFloat(account.amount).toFixed(1));
      roundedDimeAcc.state = account.state;
      return roundedDimeAcc;


    });

// set sumOfBankBalances to the sum of all amounts in bankBalances
var sumOfBankBalances = dataset.bankBalances
    .reduce(function (prev, curr, idx, arr){
      // Number(parseFloat(curr.amount).toFixed(2));
      return Math.round((prev + Number(curr.amount))*100)/100;

    }, 0);

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
var sumOfInterests = dataset.bankBalances
    .filter(function (elem, idx, arr){
      var states = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'];
      return states.indexOf(elem.state) !== -1;})
        .reduce(function(prev, curr, idx, array) {
          return Math.round((prev + parseFloat(curr.amount) * 0.189) * 100)/100;

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
var highInt = {};
var sumOfHighInterests = dataset.bankBalances
  .filter(function (elem, idx, arr){
    var states = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'];
    return states.indexOf(elem.state) === -1;
  })
      .map(function (elem, idx, arr){
        if (highInt[elem.state]){

          highInt[elem.state] += Number(parseFloat(elem.amount).toFixed(1));
        }else{
          highInt[elem.state] = elem.amount * 0.189;
        }
          highInt[elem.state] = Math.round(highInt[elem.state] * 100)/100;
        return elem;
      })
        .filter(function (elem){
          return highInt[elem.state] > 50000;
        })
          .reduce(function (prev, curr){
            return Math.round((prev + parseFloat(curr.amount) * 0.189) * 100)/100;
          }, 0.01);








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