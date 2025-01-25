import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Container className="my-5 pt-5">
        <Outlet /> {/* Renders child routes */}
      </Container>
    </>
  );
};

export default Layout;
