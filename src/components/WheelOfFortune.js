import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import gameWords from "../data/gameWords.json";
import GuessLetterModal from "./GuessLetterModal";

// Define wheel items
const wheelItems = [
  { label: "100", value: 100 },
  { label: "200", value: 200 },
  { label: "300", value: 300 },
  { label: "400", value: 400 },
  { label: "500", value: 500 },
  { label: "Mất điểm", value: 0 },
  { label: "Mất lượt", value: 0 },
];

const WheelOfFortune = ({ headTitle }) => {
  // State hooks
  const [word, setWord] = useState(gameWords[0].word);
  const [clue, setClue] = useState(gameWords[0].clue);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [score, setScore] = useState(0);
  const [turns, setTurns] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [letterToGuess, setLetterToGuess] = useState("");

  // Get the word with guessed letters revealed
  const getMaskedWord = () => {
    return word
      .split("")
      .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
      .join(" ");
  };

  // Check if the game is over (all letters guessed)
  useEffect(() => {
    if (!getMaskedWord().includes("_")) {
      setGameOver(true);
      setMessage("Chúc mừng bạn đã đoán đúng hết từ!");
    } // eslint-disable-next-line
  }, [guessedLetters]); // Re-run when guessedLetters changes

  // Handle the result of spinning the wheel
  const handleSpinResult = (result) => {
    setMessage(
      result.label === "Mất điểm"
        ? "Oh no! Bạn đã bị mất hết điểm."
        : result.label === "Mất lượt"
        ? "Mất lượt rồi! Tiếp tục..."
        : `Bạn quay được ${result.label} điểm.`
    );

    if (result.label === "Mất điểm") {
      setScore(0);
    } else if (result.label === "Mất lượt") {
      setTurns(turns - 1);
    } else {
      setLetterToGuess(result.value);
    }

    setShowModal(true);
  };

  // Start spinning the wheel
  const spinWheel = () => {
    const result = wheelItems[Math.floor(Math.random() * wheelItems.length)];
    handleSpinResult(result);
  };

  // Handle letter guess
  const handleGuessLetter = (letter) => {
    if (letter && !guessedLetters.includes(letter)) {
      setGuessedLetters((prev) => [...prev, letter]);

      const isCorrectGuess = word.includes(letter);
      const letterCount = word.split("").filter((l) => l === letter).length;
      const scoreIncrement = isCorrectGuess ? letterCount * letterToGuess : 0;
      setScore((prevScore) => prevScore + scoreIncrement);

      setMessage(
        isCorrectGuess
          ? `Chúc mừng! Bạn đã đoán đúng chữ "${letter}"`
          : `Chữ "${letter}" không có trong từ.`
      );
    } else {
      setMessage("Bạn đã đoán chữ này rồi hoặc không nhập chữ.");
    }
  };

  // Restart the game
  const restartGame = () => {
    setTurns(3);
    setScore(0);
    setGuessedLetters([]);
    setGameOver(false);
    setMessage("");

    const randomWord = gameWords[Math.floor(Math.random() * gameWords.length)];
    setWord(randomWord.word);
    setClue(randomWord.clue);
  };

  return (
    <>
      <Helmet>
        <title>{headTitle}</title>
        <meta property="og:title" content={headTitle} />
      </Helmet>
      <h1 className="mb-4">Chiếc Nón Kỳ Diệu</h1>

      {gameOver ? (
        <div className="text-center">
          <h4>Chúc mừng! Bạn đã hoàn thành trò chơi với {score} điểm!</h4>
          <Button onClick={restartGame}>Chơi lại</Button>
        </div>
      ) : (
        <>
          <Row className="justify-content-center">
            <Col xs="auto">
              <h5>Gợi ý: {clue}</h5>
              <h3 className="text-center">{getMaskedWord()}</h3>
            </Col>
          </Row>
          <Row className="justify-content-center mt-3">
            <Col xs="auto">
              <Button onClick={spinWheel}>Quay Nón</Button>
            </Col>
          </Row>
          <div className="mt-3 text-center">
            <h4>Điểm của bạn: {score}</h4>
            <h5>Lượt chơi còn lại: {turns}</h5>
          </div>
          {message && <p className="text-center mt-3">{message}</p>}
        </>
      )}

      <GuessLetterModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleGuessLetter}
        letterToGuess={letterToGuess}
        guessedLetters={guessedLetters}
      />
    </>
  );
};

export default WheelOfFortune;
