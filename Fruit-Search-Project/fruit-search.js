const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant',
'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig',
'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry',
'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew',
'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya',
'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry',
'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
	let results = [];
	for(let element of fruit){
		if(element.toLowerCase().includes(str.toLowerCase())){
			results.push(element)
		}
	} return results.slice(0, 5);
}

function liDeleter() {
	while (suggestions.firstChild) {
		suggestions.removeChild(suggestions.firstChild);
	}
}
		
function searchHandler(e) {
	liDeleter();

	let results = search(input.value);
	if(input.value !== ''){
		for(let result of results){
			let fruitList = document.createElement('li');
			suggestions.appendChild(fruitList);
			fruitList.innerText = result;
		}
	}
}

function useSuggestion(e) {
	if(e.target.tagName === "LI"){
		input.value = e.target.innerText;
		liDeleter();
	}
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);

suggestions.addEventListener("mouseover", function(e) {
    if(e.target.tagName === "LI"){
		e.target.style.opacity = "0.7";
    }
});
suggestions.addEventListener("mouseout", function(e) {
    if(e.target.tagName === "LI"){
		e.target.style.opacity = "1";
    }
});