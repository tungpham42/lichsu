import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const Home = () => {
  return (
    <Row>
      <Col>
        <Card className="shadow-lg">
          <Card.Body>
            <Card.Title>Chào mừng đến với Lịch Sử Việt Nam</Card.Title>
            <Card.Text>
              Học lịch sử Việt Nam qua các bài học và thử thách câu đố. Hãy bắt
              đầu hành trình tìm hiểu!
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Home;
