import React,{useState, useEffect} from "react";
// getting the word
import {wordList} from './services/words';
import Word from "./components/Word";
import './style.css';

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

    return (
        <div className="game-container">

            <div className="word-container">
                <Word
                    correctLetters={correctLetters}
                    selectedWord={selectedWord}
                />
            </div>

            <div className="keyboard-container">
                <div className="keyboardA">
                {keySeriesA.map((letter, index)=>{
                    return (
                        <div key={index} className='key'>
                            <button className="letter">{letter}</button>
                        </div>
                    )
                })}
                </div>
                <div className="keyboardB">
                    {keySeriesB.map((letter, index)=>{
                        return (
                            <div key={index} className='key'>
                                <button className="letter">{letter}</button>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
};
export default App;