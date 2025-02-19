import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Container, Button, ButtonGroup } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useFontSize } from "../FontSizeContext";

const Layout = () => {
  const [showButton, setShowButton] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const { fontSize, increaseFontSize, decreaseFontSize, resetFontSize } =
    useFontSize();

  // Handles scroll and resize events
  useEffect(() => {
    const handleScrollResize = () => {
      setShowButton(window.scrollY > 148);
      setIsFixed(window.innerWidth > 991 && window.scrollY > 148);
    };

    window.addEventListener("scroll", handleScrollResize);
    window.addEventListener("resize", handleScrollResize);
    handleScrollResize(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScrollResize);
      window.removeEventListener("resize", handleScrollResize);
    };
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header />

      {/* Font Size Controls */}
      <Container className="d-flex justify-content-end py-2">
        <ButtonGroup>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={decreaseFontSize}
          >
            A-
          </Button>
          <Button variant="outline-primary" size="sm" onClick={resetFontSize}>
            A↺
          </Button>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={increaseFontSize}
          >
            A+
          </Button>
        </ButtonGroup>
      </Container>

      <Container
        className={`my-2 ${isFixed ? "pt-5" : "pt-0"}`}
        style={{
          fontSize: `${fontSize}px`,
          minHeight: "calc(100vh - 10rem)",
        }}
      >
        <Outlet />
      </Container>

      <Footer />

      {/* Scroll to Top Button */}
      {showButton && (
        <Button
          variant="primary"
          onClick={scrollToTop}
          className="position-fixed bottom-3 end-3 rounded-circle shadow-lg d-flex align-items-center justify-content-center"
          style={{
            bottom: "25px",
            right: "25px",
            width: "50px",
            height: "50px",
            fontSize: "20px",
          }}
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </Button>
      )}
    </>
  );
};

export default Layout;
