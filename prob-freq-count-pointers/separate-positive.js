// add whatever parameters you deem necessary
function separatePositive(nums) {
    let left = 0;
    let right = nums.length - 1
    while(left < right){

        // swap nums if the left num is negative and the right num is positive
        if(nums[left] < 0 && nums[right] > 0){
            let temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
        }
        
        if(nums[left] > 0) left ++;
        if(nums[right] < 0) right --;
    }
    return nums;
}

module.exports = {separatePositive}