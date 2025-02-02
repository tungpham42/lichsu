import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import HistoryLessons from "./components/HistoryLessons";
import Quiz from "./components/Quiz";
import Timeline from "./components/Timeline";
import WordPuzzle from "./components/WordPuzzle";
import Survey from "./components/Survey";

// Utility component to update title and meta tags dynamically
const DynamicTitle = ({ title }) => {
  useEffect(() => {
    document.title = title;

    // Update or create the og:title meta tag
    let metaOgTitle = document.querySelector("meta[property='og:title']");
    if (!metaOgTitle) {
      metaOgTitle = document.createElement("meta");
      metaOgTitle.setAttribute("property", "og:title");
      document.head.appendChild(metaOgTitle);
    }
    metaOgTitle.setAttribute("content", title);
  }, [title]);

  return null;
};

// Define route configurations
const routes = [
  { path: "/", title: "Trang Chủ - Lịch sử Việt Nam", element: <Home /> },
  {
    path: "/bai-hoc",
    title: "Bài Học - Lịch sử Việt Nam",
    element: <HistoryLessons />,
  },
  {
    path: "/tien-trinh",
    title: "Tiến Trình - Lịch sử Việt Nam",
    element: <Timeline />,
  },
  {
    path: "/o-chu",
    title: "Ô Chữ - Lịch sử Việt Nam",
    element: <WordPuzzle />,
  },
  {
    path: "/chiec-non-ky-dieu",
    title: "Chiếc Nón Kỳ Diệu - Lịch sử Việt Nam",
    element: <WordPuzzle />,
  },
  { path: "/cau-do", title: "Câu Đố - Lịch sử Việt Nam", element: <Quiz /> },
  {
    path: "/khao-sat",
    title: "Khảo Sát - Lịch sử Việt Nam",
    element: <Survey />,
  },
];

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes.map(({ path, title, element }) => (
            <Route
              key={path}
              path={path}
              element={
                <>
                  <DynamicTitle title={title} />
                  {element}
                </>
              }
            />
          ))}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
