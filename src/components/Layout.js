import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Layout = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 148);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header />
      <Container
        className="my-5 pt-0"
        style={{ minHeight: "calc(4px - 10rem + 100vh)" }}
      >
        <Outlet />
      </Container>
      <Footer />

      {showButton && (
        <Button
          variant="primary"
          onClick={scrollToTop}
          className="d-flex align-items-center justify-content-center position-fixed bottom-3 end-3 rounded-circle shadow-lg"
          style={{
            bottom: "25px",
            right: "25px",
            width: "50px",
            height: "50px",
            fontSize: "20px",
          }}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </Button>
      )}
    </>
  );
};

export default Layout;
