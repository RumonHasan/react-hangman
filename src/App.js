import React,{useState, useEffect} from "react";
// getting the word
import {wordList} from './services/words';
import Word from "./components/Word";
import Alert from "./components/Alert";
import './style.css';
import WrongLetter from "./components/WrongLetter";
import { gameWinnerChecker } from "./services/gameWinnerChecker";

const App = ()=>{
    // custom keyboard
    const alphaIndex = Array.from(Array(26)).map((e,i)=> i + 65);
    const keyBoardLetters = alphaIndex.map((letter)=> String.fromCharCode(letter));
    const keySeriesA = keyBoardLetters.slice(keyBoardLetters[0], keyBoardLetters.length - 13);
    const keySeriesB = keyBoardLetters.slice(keySeriesA.length , keyBoardLetters.length);

    // random word
    const randomIndex = Math.floor(Math.random()* wordList.length);
    let selectedWord = wordList[randomIndex];

    // states 
    const [correctLetters, setCorrectLetters] = useState([]);
    const [incorrectLetters, setIncorrectLetters] = useState([]);
    const [gameOver, setGameOver] = useState(false); // state to check game status
    const [gameStateMessages, setGameStateMessage] = useState('');
    const [word, setWord] = useState('');
    // lets call a word state
    const [selectWord, setSelectWord] = useState(selectedWord);
    // notification
    const [alert, setAlert] = useState({
        show: false,
        message: '',
    });

    // this function will enable us to call on alert notification
    const displayAlert = (show = false, message = '')=>{
        setAlert({
            show,
            message
        })
    };

    // game handler
    useEffect(()=>{
        const handleGameWinner = ()=>{
            if(gameWinnerChecker(correctLetters, selectWord, incorrectLetters) === 'winner'){
                setGameOver(true);
                setGameStateMessage('Game Won')
            };
            if(gameWinnerChecker(correctLetters, selectWord, incorrectLetters) === 'loss'){
                setGameOver(true);
                setGameStateMessage('Game lost');
                setWord(selectWord);
            }
        };
        handleGameWinner();
    });

    const handleGameStart = ()=>{
        // resetting random word
        const randomIndex = Math.floor(Math.random()* wordList.length);
        selectedWord = wordList[randomIndex];
        setSelectWord(selectedWord);
        setGameOver(false);
        // resetting the incorrect and correct letters
        setIncorrectLetters([]);
        setCorrectLetters([]);
    };

    if(gameOver) return (
            <div>
                <h1 style={{color:'white'}}>{gameStateMessages}: {
                    gameStateMessages === 'Game Won' ? 'Congratulations': `The Word was: ${word}`
                }</h1>
                <button onClick={handleGameStart}>Restart Game</button>
            </div>
        )
    
    // thats it for this video... the CSS is disastrous but the we still got a working ugly hang man game...
    // hope yall enjoyed it!!!
    

    // this function will contain the main game logic
    const handleKeyInputs = (key)=>{
        const letter = key.toLowerCase();
        if(selectWord.toLowerCase().includes(letter, 0)){
            if(!correctLetters.includes(letter)){
                setCorrectLetters((prevCorrectLetters)=>[...prevCorrectLetters, letter])
            }else{
                displayAlert(true, 'You have already guessed this letter!')
            }
        }else{
            if(!incorrectLetters.includes(letter)){
                setIncorrectLetters((prevIncorrectLetter)=>[...prevIncorrectLetter, letter]);
            }else{
                displayAlert(true, 'The incorrect letter is already present!')
            }
        };
    };

    return (
        <div className="game-container">
        {alert.show &&
                <div className="alert-container">
                    <Alert
                        removeAlert={displayAlert}
                        alert={alert}
                    />
                </div>
            }
            {/* <h1 className="wrong-header">Wrong Letters</h1> */}

            <div className="wrong-container">
                <WrongLetter
                    incorrectLetters={incorrectLetters}
                />
            </div>

            <div className="word-container">
                <Word
                    correctLetters={correctLetters}
                    selectedWord={selectWord}
                />
            </div>
            <div className="keyboard-container">
                <div className="keyboardA">
                {keySeriesA.map((letter, index)=>{
                    return (
                        <div key={index} className='key'>
                            <button className="letter" onClick={()=>handleKeyInputs(letter)}>{letter}</button>
                        </div>
                    )
                })}
                </div>
                <div className="keyboardB">
                    {keySeriesB.map((letter, index)=>{
                        return (
                            <div key={index} className='key'>
                                <button className="letter" onClick={()=>handleKeyInputs(letter)}>{letter}</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
};
export default App;