import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button, Modal } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
    navigate(`/tim-kiem?tu-khoa=${encodeURIComponent(search)}`);
  };

  return (
    <>
      <Navbar
        className="ps-3 fixed-top shadow-lg"
        bg="danger"
        variant="dark"
        expand="lg"
      >
        <Navbar.Brand as={Link} to="/">
          Lịch Sử Việt Nam
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              className={location.pathname === "/" ? "active" : ""}
              to="/"
            >
              Trang Chủ
            </Nav.Link>
            <Nav.Link
              as={Link}
              className={location.pathname === "/bai-hoc" ? "active" : ""}
              to="/bai-hoc"
            >
              Bài Học
            </Nav.Link>
            <Nav.Link
              as={Link}
              className={location.pathname === "/tien-trinh" ? "active" : ""}
              to="/tien-trinh"
            >
              Tiến Trình
            </Nav.Link>
            <Nav.Link
              as={Link}
              className={location.pathname === "/o-chu" ? "active" : ""}
              to="/o-chu"
            >
              Ô Chữ
            </Nav.Link>
            <Nav.Link
              as={Link}
              className={location.pathname === "/cau-do" ? "active" : ""}
              to="/cau-do"
            >
              Câu Đố
            </Nav.Link>
            <Nav.Link
              as={Link}
              className={location.pathname === "/khao-sat" ? "active" : ""}
              to="/khao-sat"
            >
              Khảo Sát
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
