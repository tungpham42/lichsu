import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import HistoryLessons from "./components/HistoryLessons";
import Quiz from "./components/Quiz";
import Timeline from "./components/Timeline";
import WordPuzzle from "./components/WordPuzzle";
import Survey from "./components/Survey";

// Utility component to update title and meta tags dynamically
const DynamicMeta = ({ title }) => {
  const location = useLocation();

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create og:title
    let metaOgTitle = document.querySelector("meta[property='og:title']");
    if (!metaOgTitle) {
      metaOgTitle = document.createElement("meta");
      metaOgTitle.setAttribute("property", "og:title");
      document.head.appendChild(metaOgTitle);
    }
    metaOgTitle.setAttribute("content", title);

    // Update or create og:url
    const currentUrl = `${window.location.origin}${location.pathname}`;
    let metaOgUrl = document.querySelector("meta[property='og:url']");
    if (!metaOgUrl) {
      metaOgUrl = document.createElement("meta");
      metaOgUrl.setAttribute("property", "og:url");
      document.head.appendChild(metaOgUrl);
    }
    metaOgUrl.setAttribute("content", currentUrl);
  }, [title, location]);

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
                  <DynamicMeta title={title} />
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
