/** product: calculate the product of an array of numbers. */

function product(nums, i = 0) {
  if(i === nums.length) return 1;

  return nums[i] * product(nums, i + 1);
}

/** longest: return the length of the longest word in an array of words. */

function longest(words, i = 0, val = 0) {
  if(i === words.length) return val;
  if(val < words[i].length){
    val = words[i].length
  }
  return longest(words, i + 1, val)
}

/** everyOther: return a string with every other letter. */

function everyOther(str, i = 0) {
  if(str[i] === undefined) return '';

  return str[i] + everyOther(str, i + 2)
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str, i = str.length -1) {
  // string with length of 1 will always be palindrom
  if(str.length === 1) return true;

  if(i === 0) return str[0];

  return str[i] + revString(str, i - 1) == str;
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, i = 0) {
  if(arr[i] === val) return i;
  if(i === arr.length) return -1;

  return findIndex(arr, val, i + 1);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str, i = str.length - 1) {
  if(i === 0) return str[0];

  return str[i] + revString(str, i - 1)

}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let stringArr = [];
  for (let key in obj) {
    if (typeof obj[key] === "string") stringArr.push(obj[key]);
    if (typeof obj[key] === "object") stringArr.push(...gatherStrings(obj[key]));
  }
  return stringArr;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val) {

}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
