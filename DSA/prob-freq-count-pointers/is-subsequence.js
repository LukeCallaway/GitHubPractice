// add whatever parameters you deem necessary
function isSubsequence(str1, str2) {
    let left = 0;
    let right = 0;
    
    while(left < str1.length){
        if(str1[left] !== str2[right]){
            right++;
        }else{
            left++;
            right++;
        }

        if(right > str2.length){
            return false;
        }
    }
    return true
}   

module.exports = {isSubsequence}