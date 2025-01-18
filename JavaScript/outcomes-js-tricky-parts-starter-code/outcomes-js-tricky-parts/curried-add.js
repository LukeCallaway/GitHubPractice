function curriedAdd() {
    let sumTotal = 0;
    return function add(total){
        if(total){
            sumTotal += total;
        }else{
            return sumTotal;
        }
    }; 
}

module.exports = { curriedAdd };