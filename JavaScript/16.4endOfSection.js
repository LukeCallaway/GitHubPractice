// refactor this function using the rest operator and an arrow function
function filterOutOdds() {
    var nums = Array.prototype.slice.call(arguments);
    return nums.filter(function(num) {
      return num % 2 === 0
    });
  }
// refactored
const filterOutOddNums = (...nums) => nums.filter(num => num % 2 === 0)

// rest of functions 

function findMin(...nums){
    return Math.min(...nums);
}

function mergeObjects(obj1, obj2){
    return {...obj1, ...obj2}
}

function doubleAndReturnArgs(arr,...nums){
    const numsArr = [...nums]
    const dblNums = numsArr.map( num => num * 2)
    return [...arr, ...dblNums]
}

// Slice and Dice

function removeRandom(items){
    const removedItem = Math.floor(Math.random() * items.length - 1);
    const newItems = items.toSpliced(removedItem, 1);
    return newItems;
}

function extend(array1,array2){
    return [...array1, ...array2]
}

function addKeyVal(obj,key,val){
    return {...obj, key:val}
}

function removeKey(obj, key){
    const newObj = {...obj}
    delete newObj[key]
    return newObj;
}

function combine(obj1, obj2){
    return {...obj1, ...obj2}
}

function update(obj, key, val){
    return {...obj, key: val}
}