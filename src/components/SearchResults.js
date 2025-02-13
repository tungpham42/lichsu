import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card, Button, Modal, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faVideo, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const [lessons, setLessons] = useState([]);
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const location = useLocation();
  const query =
    new URLSearchParams(location.search).get("tu-khoa")?.trim() || "";

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get("/data/lessons.json");
        setLessons(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  useEffect(() => {
    if (query && lessons.length > 0) {
      const lowerQuery = query.toLowerCase();
      setFilteredLessons(
        lessons.filter(
          ({
            title,
            description,
            period,
            content,
            events,
            important_figures,
          }) =>
            title.toLowerCase().includes(lowerQuery) ||
            description.toLowerCase().includes(lowerQuery) ||
            period.toLowerCase().includes(lowerQuery) ||
            content.toLowerCase().includes(lowerQuery) ||
            events.some((event) => event.toLowerCase().includes(lowerQuery)) ||
            important_figures.some(
              ({ name, role }) =>
                name.toLowerCase().includes(lowerQuery) ||
                role.toLowerCase().includes(lowerQuery)
            )
        )
      );
    } else {
      setFilteredLessons([]);
    }
  }, [query, lessons]);

  const handleLessonShow = (lesson) => {
    setCurrentLesson(lesson);
    setShowLessonModal(true);
  };

  const handleLessonClose = () => setShowLessonModal(false);
  const handleVideoShow = (lesson) => {
    setCurrentLesson(lesson);
    setShowVideoModal(true);
  };
  const handleVideoClose = () => setShowVideoModal(false);

  return (
    <>
      <h1 className="text-center mb-4">Kết quả tìm kiếm cho "{query}"</h1>

      {loading && <Alert variant="info">Đang tải dữ liệu...</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Row className="mt-3">
          {filteredLessons.length === 0 ? (
            <Col>
              <Alert variant="warning">Không có kết quả phù hợp.</Alert>
            </Col>
          ) : (
            filteredLessons.map((lesson) => (
              <Col
                key={lesson.id}
                xxl={4}
                xl={4}
                lg={6}
                md={6}
                sm={12}
                className="mb-4"
              >
                <Card className="d-flex flex-column h-100 shadow-lg">
                  <Card.Img
                    variant="top"
                    src={`/images/${lesson.id}.webp`}
                    alt={lesson.title}
                    style={{ height: "210px", width: "auto" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{lesson.title}</Card.Title>
                    <Card.Text>{lesson.description}</Card.Text>
                    <div className="mt-auto d-flex justify-content-start gap-3">
                      <Button
                        variant="primary"
                        onClick={() => handleLessonShow(lesson)}
                      >
                        <FontAwesomeIcon icon={faBook} className="me-2" /> Xem
                        Chi Tiết
                      </Button>
                      {lesson.youtube_id && (
                        <Button
                          variant="success"
                          onClick={() => handleVideoShow(lesson)}
                        >
                          <FontAwesomeIcon icon={faVideo} className="me-2" />{" "}
                          Xem Video
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      )}

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
              {currentLesson.events?.join(", ")}
            </p>
            <p>
              <strong>Nhân vật quan trọng:</strong>
            </p>
            <ul>
              {currentLesson.important_figures?.map((figure, index) => (
                <li key={index}>
                  {figure.name} - {figure.role}
                </li>
              ))}
            </ul>
            <p>
              <strong>Chi tiết:</strong>
            </p>
            <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleLessonClose}>
              <FontAwesomeIcon icon={faTimes} className="me-2" /> Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      )}

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
              <FontAwesomeIcon icon={faTimes} className="me-2" /> Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default SearchResults;
