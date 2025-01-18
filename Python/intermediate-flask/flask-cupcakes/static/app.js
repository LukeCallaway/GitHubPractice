const newCupcakeForm = document.querySelector('#cupcake-form');
const cupcakeList = document.querySelector('#cupcake-list');
const flavorInput = document.querySelector('#flavor');
const sizeInput = document.querySelector('#size');
const ratingInput = document.querySelector('#rating');
const imageInput = document.querySelector('#image');

function addToList(cupcakes){
    for(let cupcake of cupcakes){
        const resultLi = document.createElement('li');
        resultLi.innerText = `Flavor: ${cupcake.flavor} Size: ${cupcake.size} Rating: ${cupcake.rating}`;
        cupcakeList.appendChild(resultLi);
    }
}

function liDeleter() {
	while (cupcakeList.firstChild) {
		cupcakeList.removeChild(cupcakeList.firstChild);
	}
}

async function retrieveCupcakes(){
    let results = await axios.get('/api/cupcakes');
    let cupcakes = results.data.cupcakes;
    addToList(cupcakes);
}

async function createCupcake(){
    let flavor = flavorInput.value;
    let size = sizeInput.value;
    let rating = ratingInput.value;
    let image = imageInput.value;
    let cupcake = await axios.post('/api/cupcakes', {'flavor': flavor, 'size': size, 'rating': rating, 'image': image});
    flavorInput.value = '';
    sizeInput.value = ''; 
    ratingInput.value = '';
    imageInput.value = '';
}

newCupcakeForm.addEventListener("submit", (e) => {  
    e.preventDefault() 
    liDeleter();
    createCupcake()
    .then(() => retrieveCupcakes())
});

addEventListener("load", (e) => {
    retrieveCupcakes()
});
