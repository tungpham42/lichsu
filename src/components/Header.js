import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar className="ps-3" bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">Lịch Sử Việt Nam</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Trang Chủ</Nav.Link>
          <Nav.Link href="/lessons">Bài Học</Nav.Link>
          <Nav.Link href="/quiz">Câu Đố</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
