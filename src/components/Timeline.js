import React, { useState } from "react";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faVideo, faTimes } from "@fortawesome/free-solid-svg-icons";
import lessons from "../data/lessons.json";

const Timeline = () => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleDetailShow = (item) => {
    setCurrentItem(item);
    setShowDetailModal(true);
  };

  const handleVideoShow = (item) => {
    setCurrentItem(item);
    setShowVideoModal(true);
  };

  const handleDetailClose = () => setShowDetailModal(false);
  const handleVideoClose = () => setShowVideoModal(false);

  return (
    <>
      <h1 className="mb-4 text-center">Tiến Trình Lịch sử Việt Nam</h1>
      {lessons.map((item, index) => (
        <Row
          key={item.id}
          className={`mb-4 ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
        >
          <Col md={6}>
            <Card className="shadow-lg">
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {item.period}
                </Card.Subtitle>
                <Card.Text>{item.description}</Card.Text>
                <div className="mt-auto d-flex justify-content-start gap-3">
                  <Button
                    variant="primary"
                    onClick={() => handleDetailShow(item)}
                  >
                    <FontAwesomeIcon icon={faBook} className="me-2" />
                    Xem Chi Tiết
                  </Button>
                  {item.youtube_id && (
                    <Button
                      variant="success"
                      onClick={() => handleVideoShow(item)}
                    >
                      <FontAwesomeIcon icon={faVideo} className="me-2" />
                      Xem Video
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            <div className="m-4 timeline-circle bg-primary text-white text-center shadow-lg">
              <strong>{item.period}</strong>
            </div>
          </Col>
        </Row>
      ))}

      {/* Detail Modal */}
      {currentItem && (
        <Modal show={showDetailModal} onHide={handleDetailClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{currentItem.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Giai đoạn:</strong> {currentItem.period}
            </p>
            <p>
              <strong>Sự kiện quan trọng:</strong>{" "}
              {currentItem.events.join(", ")}
            </p>
            <p>
              <strong>Nhân vật quan trọng:</strong>
            </p>
            <ul>
              {currentItem.important_figures.map((figure, index) => (
                <li key={index}>
                  {figure.name} - {figure.role}
                </li>
              ))}
            </ul>
            <p>
              <strong>Chi tiết:</strong>
            </p>
            <div dangerouslySetInnerHTML={{ __html: currentItem.content }} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDetailClose}>
              <FontAwesomeIcon icon={faTimes} className="me-2" />
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Video Modal */}
      {currentItem?.youtube_id && (
        <Modal show={showVideoModal} onHide={handleVideoClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{currentItem.title} - Video</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${currentItem.youtube_id}`}
                title={currentItem.title}
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
};

export default Timeline;
