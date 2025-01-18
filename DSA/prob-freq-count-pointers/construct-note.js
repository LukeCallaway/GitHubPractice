// add whatever parameters you deem necessary
function freqCounter(str){
    const strMap = new Map ();
    for(let letter of str){
        strMap.set(letter, strMap.get(letter) + 1 || 1);
    }
    return strMap;
}

function constructNote(str1, str2) {
    if(str1.length > str2.length) return false;
    const str1Freq = freqCounter(str1);
    const str2Freq = freqCounter(str2);
    for(let [key,value] of str1Freq){
        if(str1Freq.get(key) > str2Freq.get(key)) return false;
    }
    return true;
}

module.exports = {freqCounter, constructNote}