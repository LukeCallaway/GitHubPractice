// add whatever parameters you deem necessary
function averagePair(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while(left < right){
        const res = (arr[left] + arr[right]) / 2
        if(res === target) return true;
        else if(res > target) right --;
        else left ++;
    }
    return false;
}

module.exports = {averagePair}