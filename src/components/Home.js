import React from "react";
import { Row, Col, Card, ListGroup, ListGroupItem } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <h1 className="mb-4 text-center">Chào mừng đến với Lịch Sử Việt Nam</h1>
      <Row>
        <Col>
          <Card className="shadow-lg p-4 bg-white rounded">
            <Card.Body>
              <ListGroup>
                <ListGroupItem>
                  <em className="h3">
                    "Tôi muốn đi ra nước ngoài xem họ làm thế nào rồi trở về
                    giúp đồng bào mình."
                  </em>
                  <span className="h4"> - Hồ Chí Minh</span>
                </ListGroupItem>
                <ListGroupItem>
                  <em className="h3">
                    "Nước ta bị mất, nhân dân ta đau khổ, tôi không thể ngồi
                    yên."
                  </em>
                  <span className="h4"> - Hồ Chí Minh</span>
                </ListGroupItem>
                <ListGroupItem>
                  <em className="h3">"Không có gì quý hơn độc lập, tự do."</em>
                  <span className="h4"> - Hồ Chí Minh</span>
                </ListGroupItem>
                <ListGroupItem>
                  <em className="h3">
                    "Dân ta phải biết sử ta, cho tường gốc tích nước nhà Việt
                    Nam."
                  </em>
                  <span className="h4"> - Hồ Chí Minh</span>
                </ListGroupItem>
                <ListGroupItem>
                  <em className="h3">
                    "Các vua Hùng đã có công dựng nước, Bác cháu ta phải cùng
                    nhau giữ lấy nước."
                  </em>
                  <span className="h4"> - Hồ Chí Minh</span>
                </ListGroupItem>
                <ListGroupItem>
                  <em className="h3">
                    "Lịch sử là của nhân dân, không phải của kẻ mạnh."
                  </em>
                  <span className="h4"> - Trần Hưng Đạo</span>
                </ListGroupItem>
                <ListGroupItem>
                  <em className="h3">
                    "Đất nước ta không có gì quý hơn là một dân tộc đoàn kết."
                  </em>
                  <span className="h4"> - Nguyễn Ái Quốc</span>
                </ListGroupItem>

                <ListGroupItem>
                  <em className="h3">
                    "Một dân tộc không biết giữ gìn lịch sử của mình sẽ không có
                    tương lai."
                  </em>
                  <span className="h4"> - Nguyễn Trãi</span>
                </ListGroupItem>
                <ListGroupItem>
                  <em className="h3">
                    "Lịch sử Việt Nam là một lịch sử của những cuộc đấu tranh
                    anh dũng."
                  </em>
                  <span className="h4"> - Võ Nguyên Giáp</span>
                </ListGroupItem>
                <ListGroupItem>
                  <em className="h3">
                    "Không có gì vĩ đại hơn khi một dân tộc tự mình làm chủ vận
                    mệnh của mình."
                  </em>
                  <span className="h4"> - Phan Bội Châu</span>
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Home;
