import "./App.css";
import QuizPlayer from "./components/QuizPlayer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Categories from "./components/Categories";

function App() {
  const [data, setData] = useState({ results: [] });

  useEffect(() => {
    // console.log(data);
  }, [data]);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Categories setData={setData} />} />
          <Route
            path="/player"
            element={<QuizPlayer data={data} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
