import React from 'react';

const Word = (props) => {
  const {correctLetters, selectedWord} = props;
  console.log(selectedWord);
  return (
      <div>
        <div className='letter-container' style={{display:'flex'}}>
          {selectedWord.split('').map((selectedLetter, index)=>{
              return (
                <div key={index} style={{margin:10}}>
                  {correctLetters.includes(selectedLetter.toLowerCase()) ? selectedLetter : '_'}
                </div>
              )
            })}
        </div>
      </div>
    );
};

export default Word;
