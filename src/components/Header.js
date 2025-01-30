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
            className={
              location.pathname === "/o-chu" ? "active" : ""
            }
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
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
