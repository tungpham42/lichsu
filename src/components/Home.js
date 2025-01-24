import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Chào mừng đến với Lịch Sử Việt Nam</Card.Title>
              <Card.Text>
                Học lịch sử Việt Nam qua các bài học và thử thách câu đố. Hãy
                bắt đầu hành trình tìm hiểu!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
