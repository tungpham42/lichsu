import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const Home = () => {
  return (
    <Row>
      <Col>
        <Card className="shadow-lg">
          <Card.Body>
            <Card.Title className="display-6">
              Chào mừng đến với Lịch Sử Việt Nam
            </Card.Title>
            <Card.Text>
              <blockquote class="blockquote">
                <p>Không có gì quý hơn độc lập, tự do.</p>
                <footer>- Hồ Chí Minh</footer>
              </blockquote>
              <blockquote class="blockquote">
                <p>
                  Dân ta phải biết sử ta, cho tường gốc tích nước nhà Việt Nam.
                </p>
                <footer>- Hồ Chí Minh</footer>
              </blockquote>
              <blockquote class="blockquote">
                <p>Lịch sử là của nhân dân, không phải của kẻ mạnh.</p>
                <footer>- Trần Hưng Đạo</footer>
              </blockquote>
              <blockquote class="blockquote">
                <p>Đất nước ta không có gì quý hơn là một dân tộc đoàn kết.</p>
                <footer>- Nguyễn Ái Quốc</footer>
              </blockquote>

              <blockquote class="blockquote">
                <p>
                  Một dân tộc không biết giữ gìn lịch sử của mình sẽ không có
                  tương lai.
                </p>
                <footer>- Nguyễn Trãi</footer>
              </blockquote>
              <blockquote class="blockquote">
                <p>
                  Lịch sử Việt Nam là một lịch sử của những cuộc đấu tranh anh
                  dũng.
                </p>
                <footer>- Võ Nguyên Giáp</footer>
              </blockquote>
              <blockquote class="blockquote">
                <p>
                  Không có gì vĩ đại hơn khi một dân tộc tự mình làm chủ vận
                  mệnh của mình.
                </p>
                <footer>- Phan Bội Châu</footer>
              </blockquote>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Home;
