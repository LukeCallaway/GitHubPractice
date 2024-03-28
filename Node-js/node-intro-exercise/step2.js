const fs = require('fs')
const axios = require('axios')

function cat(path){
    fs.readFile(path, 'utf8', (err,data) =>{
        if(err){
            console.log('ERROR', err)
            process.kill(1)
        }
        console.log('DATA', data)
    })
}

async function webCat(url){
    try{
        const res = await axios.get(url)
        console.log(res)
    }catch(err) {
        console.log('ERROR', err)
        process.kill(1)
    }
}

if(process.argv[2].includes('.com')){
    webCat(process.argv[2])
}else{
    cat(process.argv[2])
}

