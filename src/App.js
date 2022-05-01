import ColorChange from "./Component/ColorChange";
import Timer from "./Component/Timer";
import Dictionary from "./Component/Dictionary";
import Board from "./Component/Board";
import Keyboard from "./Component/Keyboard";
import { createContext, useState } from "react";
import { boardDefault } from "./Words";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterpos: 0 });

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;
    setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
  };

  return (
    <div>
      <ColorChange />
      <Timer />
      <Dictionary />
      <br />
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onSelectLetter,
          onDelete,
          onEnter,
        }}
      >
        {/* <div className="game">
          <Board />
          <Keyboard />
        </div> */}
      </AppContext.Provider>
    </div>
  );
}

export default App;

var wordOfTheDay = "hello";

function compareWords() {
  var guessedWord = document
    .getElementById("wordGuess")
    .value.toString()
    .toLower(); // Converts inputted word to a lowercase string
  var correctLocations = [];
  var incorrectLocations = []; //Initialising arrays to store the locations of correct letter locations, and correct letter but incorrect location index's

  if (guessedWord != wordOfTheDay) {
    const wordOfTheDayArray = wordOfTheDay.split("");
    const guessedWordArray = guessedWord.split(""); // Splitting the words into an array of it's letters

    for (let i = 0; i < wordOfTheDayArray.length; i++) {
      // Loop through each letter of the word of the day
      if (wordOfTheDayArray[i] == guessedWordArray[i]) {
        // Compare the letters of the word of the day to the guessed word at the same index
        correctLocations.push(i); // Adds the index of the correct letter location to the correct locations array
      }
      for (let j = 0; j < wordOfTheDayArray.length; j++) {
        if (wordOfTheDayArray[i] == guessedWordArray[j]) {
          // Loop through each letter of the guessed word and compare it to the current letter of the word of the day denoted by i
          incorrectLocations.push(j); // Adds the index of correct letter but incorrect location to the incorrect locations array
        }
      }
    }
    console.log(correctLocations);
    console.log(incorrectLocations);
  } else {
    window.alert("You guessed the word!");
  }
}
