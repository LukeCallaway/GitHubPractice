const express = require('express');
const ExpressError = require("./express-error")

const app = express();

app.use(express.json());

app.get('/', (req,res,next) => {
    return res.send('<h1>Home Page</h1>')
})

app.get('/mean', (req,res,next) =>{
try {
    let { nums = 0} = req.query
    numsArr = nums.split(',') // remove commas

    // make sure there are params to iterate over
    if(numsArr.length == 0 || numsArr[0] === ''){
        throw new ExpressError('nums are required', 400)
    }

    // make sure the params are numbers
    for(let num of numsArr){
        if(typeof(parseInt(num)) != 'number'){
            throw new ExpressError('must be numbers', 400)
        }
    }

    // get the total value from all the query param numbers
    let total = numsArr.reduce((accum, nextNum) =>{
        numAccum = parseInt(accum)
        return numAccum += parseInt(nextNum)
    })
    
    return res.json({'operation': 'mean', 'value': total / numsArr.length})
  } catch (e) {
    next(e)
  }
})

app.get('/median', (req,res,next) =>{
    try {
        let { nums = 0} = req.query
        numsArr = nums.split(',') // remove commas
    
        // make sure there are params to iterate over
        if(numsArr.length === 0 || numsArr[0] === ''){
            throw new ExpressError('nums are required', 400)
        }
    
        // make sure the params are numbers
        for(let num of numsArr){
            if(typeof(parseInt(num)) != 'number'){
                throw new ExpressError('must be numbers', 400)
            }
        }
    
        // grab middle index and capture its value
        middle = Math.floor(numsArr.length / 2)
        median = numsArr[middle]
        
        return res.json({'operation': 'median', 'value': median})
    } catch (e) {
        next(e)
      }
    })

app.get('/mode', (req,res,next) =>{
    try {
        let { nums = 0} = req.query
        numsArr = nums.split(',') // remove commas
    
        // make sure there are params to iterate over
        if(numsArr.length === 0 || numsArr[0] === ''){
            throw new ExpressError('nums are required', 400)
        }
    
        // make sure the params are numbers
        for(let num of numsArr){
            if(typeof(parseInt(num)) != 'number'){
                throw new ExpressError('must be numbers', 400)
            }
        }
    
        // iterate through arr and make a pojo of nums and frequency of each num
        const store = {}
        for(let num of numsArr){
            if(num in store){
                store[num] = store[num] + 1
                console.log('updating value')
            }else{
            store[num] = 1                
            }
        }

        // iterate store obj and return max value
        max = Object.keys(store).reduce((a, b) => store[a] > store[b] ? a : b);

        return res.json({'operation': 'mode', 'value': max})
    } catch (e) {
        next(e)
        }
    })

// no error in the params 
// only runs if no route is found
app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
  });
  
// error handler for other errors
app.use(function(err, req, res, next) {
    let status = err.status || 500;
    let message = err.message;
  
    // set the status and alert the user
    return res.status(status).json({
      error: {message, status}
    });
});

// starts the server on port 3000
app.listen(3000, ()=>{
    console.log('App on port 3000');
});