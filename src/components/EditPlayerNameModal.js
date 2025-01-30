import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSave } from "@fortawesome/free-solid-svg-icons";

const EditPlayerNameModal = ({ show, onClose, currentName, onSubmit }) => {
  const [newName, setNewName] = useState(currentName);
  const [error, setError] = useState("");

  // Update newName whenever currentName changes
  useEffect(() => {
    setNewName(currentName);
  }, [currentName]);

  const handleSubmit = () => {
    if (newName.trim()) {
      onSubmit(newName);
      setError(""); // Reset the error message
    } else {
      setError("Vui lòng nhập tên mới");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
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
