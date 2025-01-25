import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Home from "./components/Home";
import HistoryLessons from "./components/HistoryLessons";
import Quiz from "./components/Quiz";

const App = () => {
  return (
    <Router>
      <Header />
      <Container className="my-5 pt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bai-hoc" element={<HistoryLessons />} />
          <Route path="/cau-do" element={<Quiz />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
