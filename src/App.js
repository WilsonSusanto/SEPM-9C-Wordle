import ColorChange from "./Component/ColorChange";
import Timer from "./Component/Timer";
import Dictionary from "./Component/Dictionary"
import Board from "./Component/Board"
import Keyboard from "./Component/Keyboard"
import { createContext, useState } from "react";
import { boardDefault } from "./Words";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterpos: 0});    
  
  const onSelectLetter = (keyVal) => {
     if (currAttempt.letterPos > 4) return;
        const newBoard = [...board];
        newBoard [currAttempt.attempt] [currAttempt.letterPos] = keyVal;
        setBoard(newBoard);
        setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos+1});

    
    
  }
  
  const onDelete = () => {
     if (currAttempt.letterPos === 0) return;
            const newBoard = [...board];
            newBoard [currAttempt.attempt] [currAttempt.letterPos - 1] = "";
            setBoard(newBoard)
            setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1});


    
  }
  
  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;
            setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos:0});
    
  }
  


  return <div>
                                     
      <ColorChange/>
      <Timer/>
        <Dictionary/>
      <br/>
     <AppContext.Provider value={{board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onDelete, onEnter}}> 
        <div className="game">
      <Board />
      <Keyboard />
        </div>
     </AppContext.Provider>                                
    </div>
}

export default App;