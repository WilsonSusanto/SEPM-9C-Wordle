import React, { useContext, useState } from 'react';
import { AppContext } from "../App";

function Letter({letterPos, attemptVal}) {
    const { board } = useContext(AppContext);
    const [char, setChar] = useState("");
    const letter = board[attemptVal][letterPos];

    function receiveInput(event) {
      console.log(event.target.value)
      setChar(event.target.value);
      document.querySelector(".0-1").textContent = "TEST"
    }



  return  <input className={"Letter " + attemptVal + "-" + letterPos} type="text" placeholder={letter} maxLength='1' onChange={receiveInput}></input>;
  
}

export default Letter