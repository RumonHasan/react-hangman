import React from 'react';

const WrongLetter = (props) => {
  const {incorrectLetters} = props;
  const wrongLetterStyles = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
  }
  return (
        <div style={{color: 'black'}} style={wrongLetterStyles}>
            {incorrectLetters.map((letter, index)=>{
                return (
                    <h2 key={index} style={{textAlign:'center'}}>
                        {letter}
                    </h2>
                )
            })}
        </div>
    )
};

export default WrongLetter;
