import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { timelineData } from "../data/timelines";

const Timeline = () => {
  return (
    <>
      <h1 className="mb-4 text-center">Tiến Trình Lịch sử Việt Nam</h1>
      {timelineData.map((item, index) => (
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
    </>
  );
};

export default Timeline;
