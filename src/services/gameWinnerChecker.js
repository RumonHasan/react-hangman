export const gameWinnerChecker = (correctLetters, selectWord, incorrectLetters)=>{
    const GAME_STATES = {
        winner: 'winner',
        loss: 'loss'
    };
    const MAX_LIFE = 6;
    let gameStatus = GAME_STATES.winner; // default state

    // checking for winning
    const selectWordArray = selectWord.split('');
    for(let letterIndex = 0; letterIndex < selectWordArray.length; letterIndex++){
        if(!correctLetters.includes(selectWordArray[letterIndex].toLowerCase())){
            gameStatus = '';
        }
    };

    // checking for loss
    if(incorrectLetters.length >= MAX_LIFE){
        gameStatus = GAME_STATES.loss;
    }

    return gameStatus;
};