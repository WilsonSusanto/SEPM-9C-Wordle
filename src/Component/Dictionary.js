import React, {useState} from "react";
import axios from "axios";


const Dictionary = () => {
    const [guess, setGuess] = useState("")
    const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"

    async function checkValidWord() {
        document.querySelector(".currentQuery").textContent = "You queried: " + guess;
        // If the API request does not find the word, it will throw a 404, so the catch should only ever return the "Thats not a word" response,
        // but I put the ternery there just in case.
        try {
            const response = await axios.get(apiUrl+guess)
            document.querySelector(".isValidWord").textContent = (response.status == 200) ? "Thats a valid word 😎 " : "Thats not a word 😤";
            if (response.status == 200){
                compareWords(guess)
            }
        }
        catch (e) {
            document.querySelector(".isValidWord").textContent = "Thats not a word 😤"
        }
    }

    var wordOfTheDay = "hello" // Temporarily defining the word of the day for testing

    async function compareWords(guessedWord){
        console.log(guessedWord)
        var correctLocations = [];
        var incorrectLocations = [];  //Initialising arrays to store the locations of correct letter locations, and correct letter but incorrect location index's
    
        if(guessedWord != wordOfTheDay){
            const wordOfTheDayArray = wordOfTheDay.split("");
            const guessedWordArray = guessedWord.split("");  // Splitting the words into an array of it's letters

            for (let i = 0; i < wordOfTheDayArray.length; i++) {  // Loop through each letter of the word of the day
                if (wordOfTheDayArray[i] == guessedWordArray[i]){ // Compare the letters of the word of the day to the guessed word at the same index
                correctLocations.push(i)    // Adds the index of the correct letter location to the correct locations array
                }
                for (let j = 0; j < wordOfTheDayArray.length; j++) {  
                    if (wordOfTheDayArray[i] == guessedWordArray[j]){  // Loop through each letter of the guessed word and compare it to the current letter of the word of the day denoted by i
                        incorrectLocations.push(j)  // Adds the index of correct letter but incorrect location to the incorrect locations array
                    }

                }
            }
            document.querySelector(".correctLocations").textContent = "Correct letters in correct position index: " + correctLocations
            document.querySelector(".incorrectLocations").textContent = "Correct letters in incorrect position index: " + incorrectLocations
            console.log(incorrectLocations)
            console.log(correctLocations)
            for (let i = 0; i < 5; i++) {
                document.querySelector(".letters" + i).textContent = guessedWordArray[i]
              }

            for (let i = 0; i < 5; i++) {
                document.querySelector(".letters" + i).style.color = "red"
              }              

            for (let i = 0; i < incorrectLocations.length; i++) {
                document.querySelector(".letters" + incorrectLocations[i]).style.color = "orange"
              }
            for (let i = 0; i < correctLocations.length; i++) {
                document.querySelector(".letters" + correctLocations[i]).style.color = "green"
              }            

        } else{
            document.querySelector(".correctLocations").textContent = "You guessed the word!"
            document.querySelector(".incorrectLocations").textContent = ""
        }
    }

    return(
    <div className="guessField" style={{margin:"100px"}}>
    <h1>Query API for valid word</h1>
    <input placeholder="Check for a valid word" name="guess" onChange={(event) => setGuess(event.target.value)}></input>
    <button onClick={checkValidWord}>Submit Guess</button>
    <h2>Is this a valid word?</h2>
    <p className="currentQuery"></p>
    <p className="isValidWord"></p>
    <br></br>
    <h2>Is the word correct?</h2>
    <p className="correctLocations"></p>
    <p className="incorrectLocations"></p><br></br>

    <p className="letters0"></p>
    <p className="letters1"></p>
    <p className="letters2"></p>
    <p className="letters3"></p>
    <p className="letters4"></p>
    </div>
    )
}

export default Dictionary;