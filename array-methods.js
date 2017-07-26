'use strict';
const employees = require('./data/employees');
const numbers = require('./data/numbers');

// find even numbers in `numbers`
var evenNumbers = null;

// generate a list of all income amounts from `employees`
// where the income rounded to the nearest dollar is even and is a Number
var evenSalaries = null;

// are all numbers are divisible by three in `numbers` ?
var divisibleByThree = null;

// find users with emails that are at 'youtube.com' from `employees`
var youtubeEmails = null;

// sort the `employees` list of employees with income, by monthly income
var sortedByIncome = null;

// find the largest number in `numbers` using Array.prototype.reduce
const largestValue = null;

// find longest email in `employees` using Array.prototype.reduce
var longestEmail = null;

// create an array that contains all even numbers and all odd numbers from `numbers`
// maintaining their original order
// except all even numbers are before all odd numbers
var evensThenOdds = null;

const sortByName = null;

// find all `employees` whose first name starts with 'D',
// create a new array of strings that are the combination of firstname and lastname,
// then sort alphabetically
var employeesAlphaFirst = null;

// find all `employees` whose first name starts with 'D',
// return a new list of strings that are the combination of firstname and lastname,
// where names are sorted by the last name alphabetically
var employeesAlphaLast = null;

// find the person from `salaries` with the highest income
// with a new `full_name` key
// the value should be a single object, with keys id, full_name, email, company
var highestPaid = null;

module.exports = {
  evenNumbers,
  evenSalaries,
  divisibleByThree,
  youtubeEmails,
  sortedByIncome,
  largestValue,
  longestEmail,
  evensThenOdds,
  employeesAlphaFirst,
  employeesAlphaLast,
  highestPaid
};
