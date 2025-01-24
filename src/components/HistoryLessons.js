import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import lessons from "../data/lessons.json";

function HistoryLessons() {
  const [showModal, setShowModal] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = (lesson) => {
    setCurrentLesson(lesson);
    setShowModal(true);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Bài Học Lịch Sử</h2>
      <Row>
        {lessons.map((lesson) => (
          <Col key={lesson.id} md={4} className="mb-4">
            <Card className="d-flex flex-column h-100">
              <Card.Body>
                <Card.Title>{lesson.title}</Card.Title>
                <Card.Text>{lesson.description}</Card.Text>
                <Button variant="primary" onClick={() => handleShow(lesson)}>
                  Xem Chi Tiết
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for showing lesson details */}
      {currentLesson && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{currentLesson.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Giai đoạn:</strong> {currentLesson.period}
            </p>
            <p>
              <strong>Sự kiện quan trọng:</strong>{" "}
              {currentLesson.events.join(", ")}
            </p>
            <p>
              <strong>Nhân vật quan trọng:</strong>
            </p>
            <ul>
              {currentLesson.important_figures.map((figure, index) => (
                <li key={index}>
                  {figure.name} - {figure.role}
                </li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default HistoryLessons;
