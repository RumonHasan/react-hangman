import React,{useState, useEffect} from "react";
// getting the word
import {wordList} from './services/words';
import Word from "./components/Word";
import Alert from "./components/Alert";
import './style.css';
import WrongLetter from "./components/WrongLetter";

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