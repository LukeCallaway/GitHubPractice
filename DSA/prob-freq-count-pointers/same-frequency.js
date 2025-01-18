// add whatever parameters you deem necessary
function freqCounter(num){
    const str = num.toString();
    const strMap = new Map ();
    for(let num of str){
        strMap.set(num, strMap.get(num) + 1 || 1);
    }
    return strMap;
}

function sameFrequency(num1, num2) {
    const num1Freq = freqCounter(num1);
    const num2Freq = freqCounter(num2);
    if(num1Freq.size !== num2Freq.size) return false;

    for(let [num, value] of num1Freq){
        if(num1Freq.get(num) !== num2Freq.get(num)) return false;
    }
    return true;
}

module.exports = {freqCounter, sameFrequency}
