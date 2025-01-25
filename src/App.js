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
          <Route
            path="/"
            element={<Home headTitle="Trang chủ - Lịch sử Việt Nam" />}
          />
          <Route
            path="/bai-hoc"
            element={<HistoryLessons headTitle="Bài học - Lịch sử Việt Nam" />}
          />
          <Route
            path="/cau-do"
            element={<Quiz headTitle="Câu đố - Lịch sử Việt Nam" />}
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
