import React, { useState } from "react";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import lessons from "../data/lessons.json";

function HistoryLessons() {
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);

  const handleLessonClose = () => setShowLessonModal(false);
  const handleVideoClose = () => setShowVideoModal(false);

  const handleLessonShow = (lesson) => {
    setCurrentLesson(lesson);
    setShowLessonModal(true);
  };

  const handleVideoShow = (lesson) => {
    setCurrentLesson(lesson);
    setShowVideoModal(true);
  };

  return (
    <>
      <h2 className="mb-4">Bài Học Lịch Sử</h2>
      <Row>
        {lessons.map((lesson) => (
          <Col key={lesson.id} md={4} className="mb-4">
            <Card className="d-flex flex-column h-100 shadow-lg">
              <Card.Body>
                <Card.Title>{lesson.title}</Card.Title>
                <Card.Text>{lesson.description}</Card.Text>
                <div className="d-flex justify-content gap-3">
                  <Button
                    variant="primary"
                    onClick={() => handleLessonShow(lesson)}
                  >
                    Xem Chi Tiết
                  </Button>
                  {lesson.youtube_id && (
                    <Button
                      variant="success"
                      onClick={() => handleVideoShow(lesson)}
                    >
                      Xem Video
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for showing lesson details */}
      {currentLesson && (
        <Modal show={showLessonModal} onHide={handleLessonClose} size="lg">
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
            <Button variant="secondary" onClick={handleLessonClose}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal for YouTube video */}
      {currentLesson?.youtube_id && (
        <Modal show={showVideoModal} onHide={handleVideoClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{currentLesson.title} - Video</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${currentLesson.youtube_id}?start=${currentLesson.start_time}`}
                title={currentLesson.title}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleVideoClose}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default HistoryLessons;
