import React, { useContext, useState } from 'react';
import { AppContext } from "../App";

function Letter({letterPos, attemptVal}) {
    const { board } = useContext(AppContext);
    const letter = board[attemptVal][letterPos];

    return <div className='Letter' id={attemptVal + "-" + letterPos}><p>{letter}</p></div>
    
  }

export default Letter