const apiKey = "q3ohxCTRNoNMW4UaRqusXJLRr78mLaeu";
const searchBox = document.querySelector('#giphy-type');
const searchForm = document.querySelector("#giphy-form");
const giphyArea = document.querySelector("#all-giphys");
const removeBtn = document.querySelector('#giphy-removal');

async function searchGiphy(){
    let inputRes = searchBox.value;
    const res = await axios.get(`http://api.giphy.com/v1/gifs/search`, {params: {api_key:apiKey, q: inputRes}});
    const resLength = res.data.data.length;
    let randomIdx = Math.floor(Math.random() * resLength);
    const finalRes = res.data.data[randomIdx].images.fixed_width.url; 
    const newGiphy = document.createElement('img');
    newGiphy.src = finalRes
    giphyArea.appendChild(newGiphy);
    searchBox.value = '';
}

searchForm.addEventListener("submit", function(e){
    e.preventDefault();
    searchGiphy();
});

removeBtn.addEventListener("click", function () {
	while (giphyArea.firstChild) {
		giphyArea.removeChild(giphyArea.firstChild);
	}
});