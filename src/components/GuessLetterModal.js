import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const GuessLetterModal = ({
  show,
  onClose,
  onSubmit,
  letterToGuess,
  guessedLetters,
  currentPlayer,
}) => {
  const [letter, setLetter] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (letter && letter.length === 1) {
      if (guessedLetters.includes(letter.toUpperCase())) {
        setError("Đã đoán chữ này rồi.");
      } else {
        onSubmit(letter.toUpperCase(), letterToGuess); // Pass the letter and points to the parent
        resetForm(); // Clear the input and close the modal
      }
    } else {
      setError("Vui lòng nhập một chữ cái hợp lệ.");
    }
  };

  const resetForm = () => {
    setLetter(""); // Clear the input field
    setError(""); // Reset error message
    onClose(); // Close the modal
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static">
      <Modal.Header>
        <Modal.Title>Nhập chữ cái {currentPlayer} muốn đoán</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          value={letter}
          onChange={(e) => setLetter(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength="1"
          autoFocus
        />
        {error && <p className="text-danger">{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Đoán
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GuessLetterModal;
