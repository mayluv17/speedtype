import React, { useState, useEffect, useRef } from "react";
import "./App.css";
// import useGameLogic from "./hooks/useGameLogic";

function App() {
  // function useGameLogic(startingTime = 10) {
  const startingTime = 30;
  const [formData, setFormData] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(startingTime);
  const [gameStart, setGameStart] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const inputRef = useRef(null);

  function formValue(e) {
    const { value } = e.target;
    setFormData(value);
    // console.log(value);
  }

  function calculateWordCount(text) {
    const wordArray = text.trim().split(" ");
    //trim out excess space int the beging and ending of the text
    //then split into array
    const filteredWords = wordArray.filter((word) => word !== "");
    return filteredWords.length;
  }

  function startGame() {
    inputRef.current.focus();
    setTimeRemaining(startingTime);
    setGameStart(true);
    setFormData("");
    //console.log(inputRef.current);
    //i had to set the DOM to not disabled before the ref.current.focus works
    inputRef.current.disabled = false;
    inputRef.current.focus();
  }
  function endGame() {
    setGameStart(false);
    setWordCount(calculateWordCount(formData));
  }

  useEffect(() => {
    //wait one second and decriment the timer state
    if (timeRemaining > 0 && gameStart) {
      setTimeout(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      endGame();
      //const wordCounter = wordCount(formData);
    }
  }, [timeRemaining, gameStart]);

  return (
    <div>
      <h1>How fast do you type?</h1>
      <textarea
        ref={inputRef}
        value={formData}
        onChange={formValue}
        disabled={!gameStart}
      />
      <h4>TIme Remaining: {timeRemaining} seconds</h4>
      {/* we passed in the state into the function on click  */}
      <button onClick={startGame} disabled={gameStart}>
        Start Game
      </button>
      <h1>Word Count: {wordCount}</h1>
    </div>
  );
}

export default App;
