import "./App.css";
import QuizPlayer from "./components/QuizPlayer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Categories from "./components/Categories";
import { ToastContainer } from "react-toastify";

function App() {
  const [data, setData] = useState({ results: [] });

  return (
    <div>
      <Router>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Routes>
          <Route path="/" element={<Categories setData={setData} />} />
          <Route path="/player" element={<QuizPlayer data={data} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
