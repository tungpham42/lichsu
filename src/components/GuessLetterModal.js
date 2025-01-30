import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const GuessLetterModal = ({
  show,
  onClose,
  onSubmit,
  letterToGuess,
  guessedLetters,
  currentPlayerName,
}) => {
  const [letter, setLetter] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (letter && letter.length === 1) {
      if (guessedLetters.includes(letter.toUpperCase())) {
        setError('Đã đoán chữ "' + letter.toUpperCase() + '" rồi.');
      } else {
        onSubmit(letter.toUpperCase(), letterToGuess);
        resetForm();
      }
    } else {
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

  return (
    <Modal show={show} onHide={onClose} backdrop="static">
      <Modal.Header>
        <Modal.Title>Nhập chữ cái {currentPlayerName} muốn đoán</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          value={letter.toUpperCase()}
          onChange={(e) => setLetter(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength="1"
          autoFocus
        />
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
