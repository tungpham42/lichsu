import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import gameWords from "../data/gameWords.json";
import GuessLetterModal from "./GuessLetterModal";
import EditPlayerNameModal from "./EditPlayerNameModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faRedo,
  faPlay,
  faAdd,
} from "@fortawesome/free-solid-svg-icons";

const prizes = [
  { label: "100", value: 100, color: "#FF5733" },
  { label: "200", value: 200, color: "#FFBD33" },
  { label: "300", value: 300, color: "#FFDA33" },
  { label: "400", value: 400, color: "#33FF57" },
  { label: "500", value: 500, color: "#33FFBD" },
  { label: "600", value: 600, color: "#33DAFF" },
  { label: "700", value: 700, color: "#5733FF" },
  { label: "800", value: 800, color: "#BD33FF" },
  { label: "900", value: 900, color: "#FF33A1" },
  { label: "1000", value: 1000, color: "#FF3333" },
  { label: "Mất điểm", value: 0, color: "#808080" },
  { label: "Mất lượt", value: 0, color: "#C0C0C0" },
];

const WordPuzzle = () => {
  const wordIndex = Math.floor(Math.random() * gameWords.length);
  const [word, setWord] = useState(gameWords[wordIndex].word);
  const [clue, setClue] = useState(gameWords[wordIndex].clue);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [letterToGuess, setLetterToGuess] = useState("");
  const [error, setError] = useState("");
  const [hasScore, setHasScore] = useState(false);

  // Player management
  const [players, setPlayers] = useState([
    {
      name: "Người chơi 1",
      score: 0,
    },
    {
      name: "Người chơi 2",
      score: 0,
    },
  ]);
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

  const startGame = () => {
    if (players.length === 0) {
      setMessage("Vui lòng thêm ít nhất một người chơi trước khi bắt đầu!");
      return;
    }
    const result = prizes[Math.floor(Math.random() * prizes.length)];
    const currentPlayer = players[currentPlayerIndex];
    if (result.label === "Mất điểm") {
      setPlayers((prev) =>
        prev.map((player, index) =>
          index === currentPlayerIndex ? { ...player, score: 0 } : player
        )
      );
      setMessage(`${currentPlayer.name} mất điểm!`);
      setHasScore(false);
      setShowModal(true);
    } else if (result.label === "Mất lượt") {
      setMessage(`${currentPlayer.name} mất lượt!`);
      nextPlayer();
      setHasScore(false);
      setShowModal(false);
    } else {
      setLetterToGuess(result.value);
      setMessage(`${currentPlayer.name} quay được ${result.label} điểm!`);
      setHasScore(true);
      setShowModal(true);
    }
  };

  const handleGuessLetter = (letter) => {
    if (players.length === 0) {
      setMessage("Vui lòng thêm ít nhất một người chơi trước khi đoán từ!");
      return;
    }

    const currentPlayer = players[currentPlayerIndex];

    if (letter && !guessedLetters.includes(letter)) {
      setGuessedLetters((prev) => [...prev, letter]);

      const isCorrectGuess = word.includes(letter);
      const letterCount = word.split("").filter((l) => l === letter).length;
      const scoreIncrement =
        isCorrectGuess && hasScore ? letterCount * letterToGuess : 0;

      setPlayers((prev) =>
        prev.map((player, index) =>
          index === currentPlayerIndex
            ? { ...player, score: player.score + scoreIncrement }
            : player
        )
      );

      setMessage(
        isCorrectGuess
          ? `Chúc mừng! ${currentPlayer.name} đoán đúng chữ "${letter}", chữ này đã xuất hiện ${letterCount} lần.`
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
    setHasScore(true);
  };

  const addPlayer = () => {
    const trimmedName = newPlayerName.trim();
    if (!trimmedName) {
      setError("Tên người chơi không thể để trống!");
      return;
    }
    if (
      players.some(
        (player) => player.name.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      setError("Tên người chơi đã tồn tại!");
      return;
    }
    setPlayers((prev) => [...prev, { name: trimmedName, score: 0 }]);
    setNewPlayerName("");
    setError("");
  };

  const removePlayer = (index) => {
    setPlayers((prevPlayers) => {
      const newPlayers = prevPlayers.filter((_, i) => i !== index);

      if (newPlayers.length === 0) {
        setCurrentPlayerIndex(0); // Reset if no players remain
      } else {
        setCurrentPlayerIndex((prevIndex) => {
          if (index === prevIndex) {
            // Move to the next available player or wrap around
            return prevIndex >= newPlayers.length ? 0 : prevIndex;
          } else if (index < prevIndex) {
            // Shift index back if a player before current one was removed
            return prevIndex - 1;
          }
          return prevIndex; // Keep the same if removing a player after the current one
        });
      }

      return newPlayers;
    });
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
      <h1 className="text-center mb-4">Ô Chữ</h1>
      {gameOver ? (
        <div className="text-center">
          <h3 className="text-center display-6">{getMaskedWord()}</h3>
          <h4>
            Trò chơi kết thúc! Người chiến thắng là{" "}
            {
              players.reduce(
                (prev, current) =>
                  prev.score > current.score ? prev : current,
                players[0]
              )?.name
            }
          </h4>
          <Button size="lg" onClick={restartGame}>
            <FontAwesomeIcon icon={faRedo} className="me-2" /> Chơi lại
          </Button>
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
              <Button size="lg" onClick={startGame}>
                <FontAwesomeIcon icon={faPlay} className="me-2" />
                Bắt đầu
              </Button>
            </Col>
          </Row>
          {players.length > 0 && (
            <div className="mt-3 text-center">
              <h4>Lượt chơi của {players[currentPlayerIndex]?.name}</h4>
              <h5>
                Số điểm của {players[currentPlayerIndex]?.name}:{" "}
                {players[currentPlayerIndex]?.score}
              </h5>
            </div>
          )}
          {message && <p className="text-center mt-3 lead">{message}</p>}
        </>
      )}

      <GuessLetterModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleGuessLetter}
        letterToGuess={letterToGuess}
        guessedLetters={guessedLetters}
        currentPlayerName={players[currentPlayerIndex]?.name}
      />

      <div className="mt-4 col-lg-6 col-md-8 col-sm-10 col-xs-12 mx-auto">
        <h4>Người chơi</h4>
        <Form onSubmit={(e) => e.preventDefault()} className="mb-3 mx-auto">
          <Row>
            <Col>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Nhập tên người chơi"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </Col>
            <Col xl={2} lg={2} md={2} sm={4} xs={12} className="mt-2 mt-sm-0">
              <Button
                size="lg"
                variant="success"
                onClick={addPlayer}
                disabled={!newPlayerName.trim()}
              >
                <FontAwesomeIcon icon={faAdd} />
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
                  size="sm"
                  variant="warning"
                  className="me-0 my-2"
                  onClick={() => handleEditButtonClick(index)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  className="me-2 my-2"
                  onClick={() => removePlayer(index)}
                >
                  <FontAwesomeIcon icon={faTrash} />
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
        players={players}
      />
    </>
  );
};

export default WordPuzzle;
