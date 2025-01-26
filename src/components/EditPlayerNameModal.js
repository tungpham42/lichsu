import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

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
    }
    if (!newName.trim()) {
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
        />
        {error && <p className="text-danger">{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPlayerNameModal;
