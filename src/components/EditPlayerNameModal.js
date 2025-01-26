import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditPlayerNameModal = ({ show, onClose, currentName, onSubmit }) => {
  const [newName, setNewName] = useState(currentName);

  const handleSubmit = () => {
    if (newName.trim()) {
      onSubmit(newName);
      setNewName(""); // Reset the input field after submission
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
          placeholder="Nhập tên mới"
        />
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
