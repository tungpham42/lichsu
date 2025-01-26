import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-dark text-white pt-3 pb-1 mt-5 shadow-lg">
      <Container>
        <p className="text-center">&copy; {currentYear} Phạm Tùng.</p>
      </Container>
    </footer>
  );
};

export default Footer;
