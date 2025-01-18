// add whatever parameters you deem necessary
function twoArrayObject(arr1, arr2) {
    const newObj = {};
    let pointer = 0;
    while(pointer < arr1.length){
        // grab 2nd array value or null
        let arr2Pointer = pointer < arr2.length ? arr2[pointer] : null;

        newObj[arr1[pointer]] = arr2Pointer;
        pointer ++;
    }
    return newObj;
}

module.exports = {twoArrayObject}
