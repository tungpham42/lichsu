import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
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
          <Nav.Item>
            <Link
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
              to="/"
            >
              Trang Chủ
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link
              className={`nav-link ${
                location.pathname === "/bai-hoc" ? "active" : ""
              }`}
              to="/bai-hoc"
            >
              Bài Học
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link
              className={`nav-link ${
                location.pathname === "/tien-trinh" ? "active" : ""
              }`}
              to="/tien-trinh"
            >
              Tiến trình
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link
              className={`nav-link ${
                location.pathname === "/chiec-non-ky-dieu" ? "active" : ""
              }`}
              to="/chiec-non-ky-dieu"
            >
              Chiếc nón kỳ diệu
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link
              className={`nav-link ${
                location.pathname === "/cau-do" ? "active" : ""
              }`}
              to="/cau-do"
            >
              Câu Đố
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
