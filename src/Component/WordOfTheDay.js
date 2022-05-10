import React from "react";
import App from "../App";

var words = require('an-array-of-english-words')
var wordOfTheDay = ""

function setRandomWordOfTheDay(){
words = words.filter(d => /^.{5}$/.test(d))
wordOfTheDay = words[getRandomInt()].toUpperCase()
console.log(wordOfTheDay)
}

function getRandomInt() {
    return Math.floor(Math.random() * 12634);
}

function getWordOfTheDay(){
    return wordOfTheDay
}
export { getWordOfTheDay, setRandomWordOfTheDay }
export default words;