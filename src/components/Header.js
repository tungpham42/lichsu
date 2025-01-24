import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <Navbar className="ps-3" bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">Lịch Sử Việt Nam</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link
            className={location.pathname === "/" ? "active" : ""}
            href="/"
          >
            Trang Chủ
          </Nav.Link>
          <Nav.Link
            className={location.pathname === "/bai-hoc" ? "active" : ""}
            href="/bai-hoc"
          >
            Bài Học
          </Nav.Link>
          <Nav.Link
            className={location.pathname === "/cau-do" ? "active" : ""}
            href="/cau-do"
          >
            Câu Đố
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
