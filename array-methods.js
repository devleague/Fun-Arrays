var dataset = require("./dataset.json");

/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
var hundredThousandairs = dataset.bankBalances.filter(getNumbers);
function getNumbers(element) {
  return parseInt(element.amount) > 100000;
}

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = dataset.bankBalances
  .map(function(element) {
    return parseInt(element.amount);
  })
  .reduce(function(prev, curr) {
    return prev + curr;
  });

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and take 18.9% interest of it rounded to the nearest dollar 
  and then sum it all up into one value saved to `sumOfInterests`
 */
const getStates = ["WI", "IL", "WY", "OH", "GA", "DE"];

var sumOfInterests = dataset.bankBalances
  .filter(function(element) {
    if (getStates.includes(element.state)) {
      return true;
    }
  })
  .map(function(element) {
    return Math.round(Number(element.amount * 0.189));
  })
  .reduce(function(prev, curr) {
    return prev + curr;
  });

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest dollar

  note: During your summation (
    if at any point during your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
var stateSums = dataset.bankBalances.reduce(function(acc, current) {
  if (!acc.hasOwnProperty(current.state)) {
    acc[current.state] = parseInt(current.amount);
  } else {
    acc[current.state] += Math.round(current.amount);
  }

  return acc;
}, {});
/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
var sumOfHighInterests = Object.entries(stateSums)
  .filter(function(element) {
    //element[0] targets the key which is the state
    //ex [AL,2839171]
    if (!getStates.includes(element[0])) {
      return true;
    }
  })
  .map(function(element) {
    //element[1] targets the amount
    return Math.round(Number(element[1] * 0.189));
  })
  .filter(function(element) {
    if (element > 50000) {
      return true;
    }
  })
  .reduce(function(acc, current) {
    return acc + current;
  });

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = Object.entries(stateSums)
  .filter(function(element) {
    if (element[1] < 1000000) {
      return true;
    }
  })
  .reduce(function(acc, current) {
    //why does this only work if i return acc AFTER pushing into the empty array
    acc.push(current[0]);
    return acc;
  }, []);

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = Object.entries(stateSums)
  .filter(function(element) {
    if (element[1] > 1000000) {
      return true;
    }
  })
  .reduce(function(acc, current) {
    acc.push(current[1]);
    return acc;
  }, [])
  .reduce(function(acc, current) {
    acc += parseInt(current);
    return acc;
  }, 0);

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 1,000,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = getStates.every(function(element) {
  if (element > 1000000) {
    return true;
  } else {
    return false;
  }
});
/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = Object.entries(stateSums)
  .filter(function(element) {
    if (getStates.includes(element[0])) {
      return true;
    }
  })
  .some(function(element) {
    if (element[1] > 2550000) {
      return true;
    }
  });
module.exports = {
  hundredThousandairs: hundredThousandairs,
  sumOfBankBalances: sumOfBankBalances,
  sumOfInterests: sumOfInterests,
  sumOfHighInterests: sumOfHighInterests,
  stateSums: stateSums,
  lowerSumStates: lowerSumStates,
  higherStateSums: higherStateSums,
  areStatesInHigherStateSum: areStatesInHigherStateSum,
  anyStatesInHigherStateSum: anyStatesInHigherStateSum
};
