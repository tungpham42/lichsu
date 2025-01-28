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
import WheelOfFortune from "./components/WheelOfFortune";
import Survey from "./components/Survey";

// Utility component to handle dynamic title and meta tag updates
const DynamicTitle = ({ title }) => {
  const location = useLocation();

  useEffect(() => {
    // Update the document title
    document.title = title;

    // Update the og:title meta tag
    const metaOgTitle = document.querySelector("meta[property='og:title']");
    if (metaOgTitle) {
      metaOgTitle.setAttribute("content", title);
    } else {
      // If the meta tag doesn't exist, create it
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:title");
      meta.setAttribute("content", title);
      document.head.appendChild(meta);
    }
  }, [location, title]);

  return null; // This component does not render any UI
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <>
                <DynamicTitle title="Trang chủ - Lịch sử Việt Nam" />
                <Home />
              </>
            }
          />
          <Route
            path="/bai-hoc"
            element={
              <>
                <DynamicTitle title="Bài học - Lịch sử Việt Nam" />
                <HistoryLessons />
              </>
            }
          />
          <Route
            path="/tien-trinh"
            element={
              <>
                <DynamicTitle title="Tiến trình - Lịch sử Việt Nam" />
                <Timeline />
              </>
            }
          />
          <Route
            path="/chiec-non-ky-dieu"
            element={
              <>
                <DynamicTitle title="Chiếc nón kỳ diệu - Lịch sử Việt Nam" />
                <WheelOfFortune />
              </>
            }
          />
          <Route
            path="/cau-do"
            element={
              <>
                <DynamicTitle title="Câu đố - Lịch sử Việt Nam" />
                <Quiz />
              </>
            }
          />
          <Route
            path="/khao-sat"
            element={
              <>
                <DynamicTitle title="Khảo sát - Lịch sử Việt Nam" />
                <Survey />
              </>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
