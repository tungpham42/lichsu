import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import HistoryLessons from "./components/HistoryLessons";
import Quiz from "./components/Quiz";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
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
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
