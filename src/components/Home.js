import React from "react";
import { Row, Col, Card, ListGroup, ListGroupItem } from "react-bootstrap";

const quotes = [
  {
    text: "Tôi muốn đi ra nước ngoài xem họ làm thế nào rồi trở về giúp đồng bào mình.",
    author: "Hồ Chí Minh",
  },
  {
    text: "Nước ta bị mất, nhân dân ta đau khổ, tôi không thể ngồi yên.",
    author: "Hồ Chí Minh",
  },
  { text: "Không có gì quý hơn độc lập, tự do.", author: "Hồ Chí Minh" },
  {
    text: "Dân ta phải biết sử ta, cho tường gốc tích nước nhà Việt Nam.",
    author: "Hồ Chí Minh",
  },
  {
    text: "Các vua Hùng đã có công dựng nước, Bác cháu ta phải cùng nhau giữ lấy nước.",
    author: "Hồ Chí Minh",
  },
  {
    text: "Lịch sử là của nhân dân, không phải của kẻ mạnh.",
    author: "Trần Hưng Đạo",
  },
  {
    text: "Đất nước ta không có gì quý hơn là một dân tộc đoàn kết.",
    author: "Nguyễn Ái Quốc",
  },
  {
    text: "Một dân tộc không biết giữ gìn lịch sử của mình sẽ không có tương lai.",
    author: "Nguyễn Trãi",
  },
  {
    text: "Lịch sử Việt Nam là một lịch sử của những cuộc đấu tranh anh dũng.",
    author: "Võ Nguyên Giáp",
  },
  {
    text: "Không có gì vĩ đại hơn khi một dân tộc tự mình làm chủ vận mệnh của mình.",
    author: "Phan Bội Châu",
  },
];

const Home = () => {
  return (
    <>
      <h1 className="mb-4 text-center">Chào mừng đến với Lịch Sử Việt Nam</h1>
      <Row>
        <Col>
          <Card className="shadow-lg p-4 bg-white rounded">
            <Card.Body>
              <ListGroup>
                {quotes.map((quote, index) => (
                  <ListGroupItem key={index}>
                    <em className="h3">"{quote.text}"</em>
                    <span className="h4"> - {quote.author}</span>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Home;
