function guessingGame() {
    const winningNum = Math.floor(Math.random() * 100)
    let count = 0;
    let won = false;
    return function game(guess){
        let result;
        if(won){
            return 'The game is over, you have already won!';
        }
        count++;

        if(winningNum > guess) result = `${guess} is too low!`;
        if(winningNum < guess) result = `${guess} is too high!`;
        
        if(winningNum === guess){
            won = true;
            result = `You win! You found ${winningNum} in ${count} guesses.`;
        } 

        return result;
    }
}


module.exports = { guessingGame };
