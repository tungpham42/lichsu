import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Modal,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHome,
  faBook,
  faChartLine,
  faPuzzlePiece,
  faQuestionCircle,
  faPoll,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      setShowModal(true);
      return;
    }
    navigate(
      `/tim-kiem?tu-khoa=${encodeURIComponent(search).replace(/%20/g, "+")}`
    );
  };

  return (
    <>
      <div className="hero">
        <Container>
          <Row className="d-flex align-items-center">
            <Col md={2} sm={3} xs={3}>
              <Link className="p-2" to="/">
                <div className="trongdong"></div>
              </Link>
            </Col>
            <Col md={10} sm={9} xs={9}>
              <span className="display-2 site-title">Lịch Sử Việt Nam</span>
            </Col>
          </Row>
        </Container>
      </div>
      <Navbar className="shadow-lg" bg="danger" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                className={location.pathname === "/" ? "active" : ""}
                to="/"
              >
                <FontAwesomeIcon icon={faHome} className="me-2" /> Trang Chủ
              </Nav.Link>
              <Nav.Link
                as={Link}
                className={location.pathname === "/bai-hoc" ? "active" : ""}
                to="/bai-hoc"
              >
                <FontAwesomeIcon icon={faBook} className="me-2" /> Bài Học
              </Nav.Link>
              <Nav.Link
                as={Link}
                className={location.pathname === "/tien-trinh" ? "active" : ""}
                to="/tien-trinh"
              >
                <FontAwesomeIcon icon={faChartLine} className="me-2" /> Tiến
                Trình
              </Nav.Link>
              <Nav.Link
                as={Link}
                className={location.pathname === "/o-chu" ? "active" : ""}
                to="/o-chu"
              >
                <FontAwesomeIcon icon={faPuzzlePiece} className="me-2" /> Ô Chữ
              </Nav.Link>
              <Nav.Link
                as={Link}
                className={location.pathname === "/cau-do" ? "active" : ""}
                to="/cau-do"
              >
                <FontAwesomeIcon icon={faQuestionCircle} className="me-2" /> Câu
                Đố
              </Nav.Link>
              <Nav.Link
                as={Link}
                className={location.pathname === "/khao-sat" ? "active" : ""}
                to="/khao-sat"
              >
                <FontAwesomeIcon icon={faPoll} className="me-2" /> Khảo Sát
              </Nav.Link>
            </Nav>
            <Form className="d-flex me-2" onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Điền từ khóa..."
                className="me-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button type="submit" variant="outline-light">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal for Empty Search Query */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Vui lòng nhập từ khóa tìm kiếm!</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
