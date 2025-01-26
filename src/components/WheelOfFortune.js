import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { Helmet } from "react-helmet";
import gameWords from "../data/gameWords.json";
import GuessLetterModal from "./GuessLetterModal";
import EditPlayerNameModal from "./EditPlayerNameModal";

const wheelItems = [
  { label: "100", value: 100 },
  { label: "200", value: 200 },
  { label: "300", value: 300 },
  { label: "400", value: 400 },
  { label: "500", value: 500 },
  { label: "600", value: 600 },
  { label: "700", value: 700 },
  { label: "800", value: 800 },
  { label: "900", value: 900 },
  { label: "Mất điểm", value: 0 },
  { label: "Mất lượt", value: 0 },
];

const WheelOfFortune = ({ headTitle }) => {
  let wordIndex = Math.floor(Math.random() * gameWords.length);
  const [word, setWord] = useState(gameWords[wordIndex].word);
  const [clue, setClue] = useState(gameWords[wordIndex].clue);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [letterToGuess, setLetterToGuess] = useState("");
  const [error, setError] = useState("");

  // Player management
  const [players, setPlayers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const getMaskedWord = () => {
    return word
      .split("")
      .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
      .join(" ");
  };

  useEffect(() => {
    if (!getMaskedWord().includes("_")) {
      setGameOver(true);
      setMessage("Chúc mừng! Từ đã được đoán xong!");
    } // eslint-disable-next-line
  }, [guessedLetters]);

  const handleSpinResult = (result) => {
    const currentPlayer = players[currentPlayerIndex];

    if (!currentPlayer) {
      setMessage("Lỗi: Không tìm thấy người chơi hiện tại.");
      return;
    }

    if (result.label === "Mất điểm") {
      setPlayers((prev) =>
        prev.map((player, index) =>
          index === currentPlayerIndex ? { ...player, score: 0 } : player
        )
      );
      setMessage(`${currentPlayer.name} mất điểm!`);
    } else if (result.label === "Mất lượt") {
      setMessage(`${currentPlayer.name} mất lượt!`);
      nextPlayer();
    } else {
      setLetterToGuess(result.value);
      setMessage(`${currentPlayer.name} quay được ${result.label} điểm!`);
    }

    setShowModal(true);
  };

  const spinWheel = () => {
    if (players.length === 0) {
      setMessage("Vui lòng thêm ít nhất một người chơi trước khi bắt đầu!");
      return;
    }

    const result = wheelItems[Math.floor(Math.random() * wheelItems.length)];
    handleSpinResult(result);
  };

  const handleGuessLetter = (letter) => {
    const currentPlayer = players[currentPlayerIndex];

    if (letter && !guessedLetters.includes(letter)) {
      setGuessedLetters((prev) => [...prev, letter]);

      const isCorrectGuess = word.includes(letter);
      const letterCount = word.split("").filter((l) => l === letter).length;
      const scoreIncrement = isCorrectGuess ? letterCount * letterToGuess : 0;

      setPlayers((prev) =>
        prev.map((player, index) =>
          index === currentPlayerIndex
            ? { ...player, score: player.score + scoreIncrement }
            : player
        )
      );

      setMessage(
        isCorrectGuess
          ? `Chúc mừng! ${currentPlayer.name} đoán đúng chữ "${letter}".`
          : `${currentPlayer.name} đoán sai.`
      );

      if (!isCorrectGuess) {
        nextPlayer();
      }
    } else {
      setMessage(
        `${currentPlayer.name}, chữ này đã đoán rồi hoặc bạn chưa nhập chữ!`
      );
    }
  };

  const nextPlayer = () => {
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
  };

  const restartGame = () => {
    if (players.length === 0) {
      setMessage(
        "Vui lòng thêm ít nhất một người chơi trước khi khởi động lại trò chơi!"
      );
      return;
    }

    const randomWord = gameWords[Math.floor(Math.random() * gameWords.length)];
    setWord(randomWord.word);
    setClue(randomWord.clue);
    setGuessedLetters([]);
    setGameOver(false);
    setMessage("");
    setPlayers((prev) => prev.map((player) => ({ ...player, score: 0 })));
    setCurrentPlayerIndex(0);
    setError("");
  };

  const addPlayer = () => {
    if (newPlayerName.trim()) {
      setPlayers((prev) => [...prev, { name: newPlayerName, score: 0 }]);
      setNewPlayerName("");
      setError("");
    }
    if (!newPlayerName.trim()) {
      setError("Tên người chơi không thể để trống!");
    }
  };

  const removePlayer = (index) => {
    setPlayers((prev) => prev.filter((_, i) => i !== index));
    if (index === currentPlayerIndex && players.length > 1) {
      nextPlayer(); // Skip to next player if the current player is removed
    }
  };

  const updatePlayerName = (index, newName) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player, i) =>
        i === index ? { ...player, name: newName } : player
      )
    );
  };

  const handleEditButtonClick = (index) => {
    setSelectedPlayerIndex(index);
    setShowEditModal(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addPlayer();
    }
  };

  return (
    <>
      <Helmet>
        <title>{headTitle}</title>
      </Helmet>
      <h1 className="text-center mb-4">Chiếc Nón Kỳ Diệu</h1>

      {gameOver ? (
        <div className="text-center">
          <h4>
            Trò chơi kết thúc! Người chơi thắng:{" "}
            {
              players.reduce(
                (prev, current) =>
                  prev.score > current.score ? prev : current,
                players[0]
              )?.name
            }
          </h4>
          <Button onClick={restartGame}>Chơi lại</Button>
        </div>
      ) : (
        <>
          <Row className="justify-content-center">
            <Col xs="auto">
              <h5>Gợi ý: {clue}</h5>
              <h3 className="text-center display-6">{getMaskedWord()}</h3>
            </Col>
          </Row>

          <Row className="justify-content-center mt-3">
            <Col xs="auto">
              <Button onClick={spinWheel}>Quay Nón</Button>
            </Col>
          </Row>

          <div className="mt-3 text-center">
            <h4>Lượt chơi của: {players[currentPlayerIndex]?.name}</h4>
            <h5>Điểm: {players[currentPlayerIndex]?.score}</h5>
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

      <div className="mt-4 col-12 mx-auto">
        <h4>Người chơi</h4>
        <Form onSubmit={(e) => e.preventDefault()} className="mb-3">
          <Row>
            <Col xs={10}>
              <Form.Control
                type="text"
                placeholder="Nhập tên người chơi"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </Col>
            <Col xs={2}>
              <Button onClick={addPlayer} disabled={!newPlayerName.trim()}>
                Thêm
              </Button>
            </Col>
          </Row>
        </Form>
        {error && <p className="text-danger">{error}</p>}

        <ul className="list-group">
          {players.map((player, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content gap-3 align-items-center"
            >
              <span>
                {player.name} - Điểm: {player.score}
              </span>
              <div className="position-absolute end-0 d-flex justify-content gap-2 py-2">
                <Button
                  variant="link"
                  onClick={() => handleEditButtonClick(index)}
                >
                  Sửa
                </Button>
                <Button variant="link" onClick={() => removePlayer(index)}>
                  Xóa
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <EditPlayerNameModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        currentName={players[selectedPlayerIndex]?.name || ""}
        onSubmit={(newName) => {
          updatePlayerName(selectedPlayerIndex, newName);
          setShowEditModal(false);
        }}
      />
    </>
  );
};

export default WheelOfFortune;
