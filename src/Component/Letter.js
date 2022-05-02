import React, { useContext, useState } from 'react';
import { AppContext } from "../App";

function Letter({letterPos, attemptVal}) {
    const { board } = useContext(AppContext);
    const [char, setChar] = useState("");
    const letter = board[attemptVal][letterPos];

    function receiveInput(event) {
      setChar(event.target.value);
      // If the current input field isn't empty, and the updated one is, it means they deleted, so focus on the block before
      // else it means they input a character so move forward a block
      if (char != "" && event.target.value == "") {
        if (letterPos -1 >= 0) {
          document.getElementById(String(attemptVal ) + "-" + String(letterPos - 1)).focus();
        }
      }
      else {
        if (letterPos + 1 <= 4) {
          document.getElementById(String(attemptVal ) + "-" + String(letterPos + 1)).focus();
        }
      }
    }

    function handleFocus() {
      // If the user clicks on a letter that is an empty spot, and isn't the first position, then their focus
      // is reshifted to the previous letter, then if that block is empty as well, since it has been focused
      // on, this function will re-run and will keep going until it either reaches the first input, or it 
      // reaches an input field where the one before it has a character in it.
      if (char == "" && letterPos > 0) {
        if (document.getElementById(String(attemptVal ) + "-" + String(letterPos - 1)).value === "") {
          document.getElementById(String(attemptVal ) + "-" + String(letterPos - 1)).focus();
        }
      }
      else if (char != "" && letterPos == 0) {
        document.getElementById(String(attemptVal ) + "-" + String(1)).focus();
      }
    }


    return  <input className='Letter' id={attemptVal + "-" + letterPos} type="text" placeholder={letter} maxLength='1' onChange={receiveInput} onFocus={handleFocus}></input>;
    
  }

export default Letter