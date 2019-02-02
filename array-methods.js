var dataset = require("./dataset.json");
let bankBalances = dataset.bankBalances;
/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
const hundredThousandairs = bankBalances.filter((item, index) => {
  // console.log("item", item)
  // console.log("index", index)
  // console.log("item amount", item.amount)
  return item.amount > 100000;
});
//
// const hundredThousandairs = bankBalances.filter( item => item.amount >100000)
// console.log(bankBalances)

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
const sumArr = bankBalances.map(item => {
  return parseInt(item.amount);
});

let sumOfBankBalances = sumArr.reduce((previous, current) => {
  // console.log("pre", previous)
  // console.log("current", current)

  return previous + current;
});

/*
  from each of the following states:
    -Wisconsin
    -Illinois
    Wyoming
    -Ohio
    -Georgia
    -Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest dollar 
  and then sum it all up into one value saved to `sumOfInterests`
 */

let selectedStates = ["WI", "OH", "DE", "GA", "IL", "WY"];

var sumOfInterests = bankBalances
  .filter(i => {
    return selectedStates.includes(i.state);
  })
  .reduce((runningTotal, nextValueToAdd) => {
    return runningTotal + Math.round(parseInt(nextValueToAdd.amount) * 0.189);
  }, 0);

// console.log(sumOfInterests)

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
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */

//make object states as key
function setStates(item) {
  stateSums[item.state] = 0;
}

//gets the sum of each state
function setSums(item) {
  stateSums[item.state] += Number(item.amount);
}

let stateSums = {};
bankBalances.map(setStates);
bankBalances.map(setSums);
// console.log(stateSums);

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
let sumOfHighInterests = Object.keys(stateSums)
  .filter(state => !["WI", "IL", "WY", "OH", "GA", "DE"].includes(state))
  .reduce((sum, c) => {
    if (Math.round(stateSums[c] * 0.189) > 50000) {
      sum += Math.round(stateSums[c] * 0.189);
    }
    return sum;
  }, 0);

// let states = Object.keys(stateSums);

// let ignoredStates = ["WI", "IL", "WY", "OH", "GA", "DE"]

// let filteredStates = states.filter( state => {
//   return ignoredStates.indexOf (state) === -1;
// })

// console.log(filteredStates.length);

// let statesWInterest = filteredStates.map(state => {
//   let local = {};
//   local.state = state;
//   local.interest = Math.round ( stateSums[state] * 0.189 * 100)/100
//     return local;
// })

// // console.log(statesWInterest);[{ state: 'ME', interest: 526141.55 }, ...]

// let statesOver50 = statesWInterest.filter(acct => {
//   return acct.interest > 50000;
// })
// // console.log(statesOver50.length); // 30

// let sumOfHighInterests = statesOver50.reduce((prev, curr) => {
//   return prev + curr.interest;
// }, 0)
// // console.log(sumOfHighInterests); // 7935913.989999999

// // if (!["WI", "IL", "WY", "OH", "GA", "DE"])
// // var sumOfHighInterests = bankBalances.filter(stateSum => stateSum.)

// let sumOfHighInterests = Math.round(sumOfHighInterestsPartOne * 100) / 100;
// console.log(sumOfHighInterests) // 7935913.99

//filter to get specfic states
//get sum amounts of specific states
//get insteres544et on each state's sum
//if greater than 50k = sumofhighinterests

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */

var lowerSumStates = bankBalances.reduce((arr, c) => {
  if (stateSums[c.state] < 1000000 && !arr.includes(c.state)) {
    arr.push(c.state);
  }
  return arr;
}, []);
/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */

var higherStateSums = Object.keys(stateSums).reduce((sum, c) => {
  if (stateSums[c] > 1000000) {
    sum += stateSums[c];
  }
  return sum;
}, 0);



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

var areStatesInHigherStateSum = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'].some(
  state => stateSums[state] > 2550000
);



var anyStatesInHigherStateSum = (module.exports = {
  hundredThousandairs: hundredThousandairs,
  sumOfBankBalances: sumOfBankBalances,
  sumOfInterests: sumOfInterests,
  sumOfHighInterests: sumOfHighInterests,
  stateSums: stateSums,
  lowerSumStates: lowerSumStates,
  higherStateSums: higherStateSums,
  areStatesInHigherStateSum: areStatesInHigherStateSum,
  anyStatesInHigherStateSum: anyStatesInHigherStateSum
});
