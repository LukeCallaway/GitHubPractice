let baseUrl = 'http://numbersapi.com/'
let elevenUrl = 'http://numbersapi.com/11?json'

// single request
axios.get(elevenUrl)
.then((res) => {
    console.log(res)
})

// multiple numbers request
axios.get(baseUrl + '11,13,15?json')
.then(res => {
    console.log(res)
})
.catch(err =>{
    console.log(err)
})

// multiple request for a single number
axios.get(elevenUrl)
.then(res =>{
    console.log(res.data.text)
    return axios.get(elevenUrl)
})
.then(res =>{
    console.log(res.data.text)
    return axios.get(elevenUrl)
})
.then(res =>{
    console.log(res.data.text)
    return axios.get(elevenUrl)
})
.then(res =>{
    console.log(res.data.text)
})
