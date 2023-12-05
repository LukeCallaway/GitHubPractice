// Question 1
set {1,2,3,4}

// Question 2
ref

// Question 3
{[1,2,3] => true, [1,2,3] => false}

// hasDuplicate
function hasDuplicate(arr) {
    const newSet = new Set(arr);
    if(newSet.size === arr.length){
        return false;
    } return true;
}

// vowelCount

function isVowel(letter){
    return "aeiou".includes(letter);
  }
  
function vowelCount(string){
    const vowels = new Map();
    for(let letter of string){
      if(isVowel(letter)){
        if(vowels.has(letter)){
          vowels.set(letter, vowels.get(letter) + 1);
        } else {
          vowels.set(letter, 1);
        }
      }
    }
    return vowels;
}
