const fs = require('fs')
const axios = require('axios')

function cat(path, filename){
    fs.readFile(path, 'utf8', (err,data) =>{
        if(err){
            console.log('ERROR', err)
            process.kill(1)
        }
        handleData(data, filename)
    })
}

async function webCat(path, filename){
    try{
        const res = await axios.get(path)
        handleData(res.data, filename)
    }catch(err) {
        console.log('ERROR', err)
        process.kill(1)
    }
}

function handleData(data, filename){
    if(filename){
        fs.writeFile(filename, data, 'utf8', function(err) {
            if (err) {
              console.error('ERROR', err);
              process.exit(1);
            }
        });
    } else {
          console.log(data);
    }
}

let path;
let filename;

if(process.argv[2] === '--out'){
    path = process.argv[3]
    filename = process.argv[4]
}else{
    path = process.argv[2]
}

if(path.includes('.com')){
    webCat(path, filename)
}else{
    cat(path, filename)
}