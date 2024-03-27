let baseUrl = 'http://numbersapi.com/'
let elevenUrl = 'http://numbersapi.com/11?json'

// 1 fact from number 11
async function getElevenFacts(){
    try{
        let res = await axios.get(elevenUrl)
        console.log(res)
    }catch(e){
        console.log('ERROR', e)
    }
}

// get 1 fact from numbers 11, 13, and 15
async function getMultipleFacts(){
    try{
        let res = await axios.get(baseUrl + '11,13,15?json')
        console.log(res)
    }catch(e){
        console.log('ERROR', e)
    }
}

// get multiple facts from number 11
async function multipleElevenFacts(){
    let facts = await Promise.all([
        axios.get(elevenUrl),
        axios.get(elevenUrl),
        axios.get(elevenUrl),
        axios.get(elevenUrl)
    ]);
    console.log(facts[0])
    console.log(facts[1])
    console.log(facts[2])
    console.log(facts[3])
}