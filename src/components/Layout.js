import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <Container
        className="my-5 pt-5"
        style={{ minHeight: "calc(4px - 10rem + 100vh)" }}
      >
        <Outlet /> {/* Renders child routes */}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
