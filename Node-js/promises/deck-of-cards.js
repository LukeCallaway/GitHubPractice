let deck_id;
let newDeck = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
let drawCard = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
let drawButton = document.querySelector('#draw-card')
let cardList = document.querySelector('.cards-drawn')

axios.get(newDeck)
.then(res =>{
    drawCard = `https://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=1`
    console.log(res)
})

drawButton.addEventListener('click', (e) =>{
    e.preventDefault()
    axios.get(drawCard)
    .then(res => {
        // if no cards hide draw button
        if(res.data.remaining < 1){
            drawButton.style.display = 'none';
        }
        // show card
        let card = document.createElement('li');
        cardList.appendChild(card);
        cardList.innerText = `${res.data.cards[0].value} of ${res.data.cards[0].suit}`;
    })
})