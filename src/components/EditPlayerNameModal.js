import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSave } from "@fortawesome/free-solid-svg-icons";

const EditPlayerNameModal = ({
  show,
  onClose,
  currentName,
  onSubmit,
  players,
}) => {
  const [newName, setNewName] = useState(currentName);
  const [error, setError] = useState("");

  // Update newName whenever currentName changes
  useEffect(() => {
    setNewName(currentName);
    setError(""); // Reset error when modal opens
  }, [currentName]);

  const handleSubmit = () => {
    const trimmedName = newName.trim();

    if (!trimmedName) {
      setError("Vui lòng nhập tên mới");
      return;
    }
    if (trimmedName.length > 25) {
      setError("Tên người chơi không được vượt quá 25 ký tự!");
      return;
    }
    if (
      players.some(
        (player) =>
          player.name.toLowerCase() === trimmedName.toLowerCase() &&
          player.name.toLowerCase() !== currentName.toLowerCase()
      )
    ) {
      setError("Tên người chơi đã tồn tại!");
      return;
    }

    onSubmit(trimmedName);
    setError("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sửa tên người chơi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập tên mới"
          maxLength="25"
          autoFocus
        />
        {error && <p className="text-danger mt-2">{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} className="me-2" />
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          <FontAwesomeIcon icon={faSave} className="me-2" />
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPlayerNameModal;
