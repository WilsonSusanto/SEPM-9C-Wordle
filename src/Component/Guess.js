import React, { useState, useContext } from "react";
import axios from "axios";
import { ColorContext } from "../Context/ColorContext";

const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

async function checkValidWord(guess) {
  document.querySelector(".currentQuery").textContent =
    "You queried: " + guess.toUpperCase();
  // If the API request does not find the word, it will throw a 404, so the catch should only ever return the "Thats not a word" response,
  // but I put the ternery there just in case.
  if (guess.length == 5) {
    try {
      const response = await axios.get(apiUrl + guess);
      if (response.status == 200) {
        return true;
      }
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
}

var wordOfTheDay = "HELLO"; // Temporarily defining the word of the day for testing

export const CompareWords = (guessedWord, attempt, color1, color2, color3) => {
  guessedWord = guessedWord.toUpperCase();
  var correctLocations = [];
  var incorrectLocations = []; //Initialising arrays to store the locations of correct letter locations, and correct letter but incorrect location index's
  document.querySelector(".isWordCorrect").textContent = "";

  const wordOfTheDayArray = wordOfTheDay.split("");
  const guessedWordArray = guessedWord.split(""); // Splitting the words into an array of it's letters

  if (guessedWord != wordOfTheDay) {
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

    for (let i = 0; i < 5; i++) {
      document.getElementById(String(attempt) + "-" + i).style.backgroundColor =
        color3;
    }

    for (let i = 0; i < incorrectLocations.length; i++) {
      document.getElementById(
        String(attempt) + "-" + incorrectLocations[i]
      ).style.backgroundColor = color2;
    }
    for (let i = 0; i < correctLocations.length; i++) {
      document.getElementById(
        String(attempt) + "-" + correctLocations[i]
      ).style.backgroundColor = color1;
    }
    return false;
  } else {
    for (let i = 0; i < 5; i++) {
      document.getElementById(String(attempt) + "-" + i).style.backgroundColor =
        color1;
    }
    return true;
  }

  // }
};

export { checkValidWord };
