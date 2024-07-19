// add whatever parameters you deem necessary

function countPairs(arr, num) {
    const obj = {};
    let count = 0;

    // create obj with the pair needed as the value
    for(let el of arr){
        obj[el] = num - el
    }

    // iterate arr and check if the pair is also a key
    for(let el of arr){
        // no dupes in arr so arr el * 2 will not increase pair count
        // 0 should increase pair count so filter them out
        if(el !== 0 && el * 2 === num){
            delete obj[el]
        }
        
        else if(obj[num-el]) {
            delete obj[el]
            count ++; 
        } 
    }
    return count
}

module.exports = {countPairs}