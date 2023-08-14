import HeroSection from "./HeroSection";
import categories from "../assets/category-types.json";
import CategoryRenderer from "./CategoryRenderer";
import { useNavigate } from "react-router-dom";
import Countdown from "./CountDown";
import { useState } from "react";

function Categories({ handleOnClick, setData }) {
  const data = JSON.stringify(categories);
  const json = JSON.parse(data);

  const navigate = useNavigate();
  const [startCountDown, setStartCountDown] = useState(false);
  const handleOnClickGetCardInfo = (obj) => {
    handleFetchQuizzes(obj);
  };

  const handleFetchQuizzes = async (obj) => {
    const {
      amount = 20,
      categoryId = 18,
      categoryName,
      difficulty = "medium",
      time,
    } = obj;

    try {
      const uri = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty.toLowerCase()}&type=multiple&encode=base64`;
      const data = await fetch(uri);
      const json = await data.json();
      if (json.response_code === 0) {
        setData({ results: json.results, time, category: categoryName });
        setStartCountDown(true);
        setTimeout(() => {
          setStartCountDown(false);
          navigate("/player");
          console.log("Redirected to player");
        }, 3000);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {startCountDown ? (
        <Countdown />
      ) : (
        <>
          <HeroSection />
          {json.map((category) => (
            <CategoryRenderer
              handleOnClick={handleOnClickGetCardInfo}
              key={category.id}
              id={category.id}
              category={category.name}
            />
          ))}
        </>
      )}
    </>
  );
}

export default Categories;
