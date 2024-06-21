import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from './Card'

const GET_DECK = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

function DeckOfCards() {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([])
  const [remaining, setRemaining] = useState(52)

  // draw card and decrement the remaining amount
  async function drawCard() {
    const DRAW_URL = `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
    const res = await axios.get(DRAW_URL)
    setRemaining(remaining - 1)
    setCards([...cards, [res.data.cards[0].suit, res.data.cards[0].value]])
  };

  // shuffle deck, remove cards, set remaining to 52
  async function shuffleDeck(){
    const SHUFFLE_URL = `https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`
    const res = await axios.get(SHUFFLE_URL)
    setCards([])
    setRemaining(52)
  }

  // grab new deck on page load
  useEffect(function fetchDeckOfCards() {
    async function fetchDeck() {
      const res = await axios.get(GET_DECK);
      setDeck(res.data);
    }
    fetchDeck();
  }, []);

  return (
    <div>
        <button onClick={() => shuffleDeck()}>Shuffle Deck</button>
            {remaining > 0 ? 
                <button onClick={() => drawCard()}>Draw Card!</button>
                : 'No Cards Remaining'
            }
        <ol>{
            cards.length ? 
                cards.map(c => <Card value={c[1]} suit={c[0]} />) 
                : 'No Cards Drawn'
        }
        </ol>
    </div>
  );
};

export default DeckOfCards;
