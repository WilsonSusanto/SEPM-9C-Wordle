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
        }
        catch (e) {
            document.querySelector(".isValidWord").textContent = "Thats not a word 😤"
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
    </div>
    )
}

export default Dictionary;