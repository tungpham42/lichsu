import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import useSound from "use-sound";
import buzzSound from "../sounds/buzz.mp3";

const GuessLetterModal = ({
  show,
  onClose,
  onSubmit,
  letterToGuess,
  guessedLetters,
  currentPlayerName,
  message,
}) => {
  const [letter, setLetter] = useState("");
  const [error, setError] = useState("");
  const [playBuzz] = useSound(buzzSound);

  const handleSubmit = () => {
    if (letter && letter.length === 1) {
      if (guessedLetters.includes(letter.toUpperCase())) {
        playBuzz();
        setError('Đã đoán chữ "' + letter.toUpperCase() + '" rồi.');
      } else {
        onSubmit(letter.toUpperCase(), letterToGuess);
        resetForm();
      }
    } else {
      playBuzz();
      setError("Vui lòng nhập một chữ cái hợp lệ.");
    }
  };

  const resetForm = () => {
    setLetter("");
    setError("");
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
    if (e.key === " ") {
      e.preventDefault();
    }
  };
  const validateLetter = (letter) => {
    return letter
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/\s+/g, "") // Remove spaces
      .toUpperCase();
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static" centered>
      <Modal.Header>
        <Modal.Title>Nhập một ký tự {currentPlayerName} muốn đoán</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          size="lg"
          value={validateLetter(letter)}
          onChange={(e) => setLetter(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength="1"
          autoFocus
          className="masked-word"
        />
        {message && <p className="mt-2 h4">{message}</p>}
        {error && <p className="text-danger mt-2">{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          <FontAwesomeIcon icon={faCheck} className="me-2" />
          Đoán
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GuessLetterModal;
