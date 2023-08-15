import HeroSection from "./HeroSection";
import categories from "../assets/category-types.json";
import CategoryRenderer from "./CategoryRenderer";
import { useNavigate } from "react-router-dom";
import Countdown from "./CountDown";
import { useState } from "react";
import Loader from "./Loader";
import { toast } from "react-toastify";

function Categories({ setData }) {
  const data = JSON.stringify(categories);
  const json = JSON.parse(data);

  const navigate = useNavigate();
  const [startCountDown, setStartCountDown] = useState(false);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const uri = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty.toLowerCase()}&type=multiple&encode=base64`;
      const data = await fetch(uri);
      const json = await data.json();

      // make sure loader will be displayed at least for 2000ms
      setTimeout(() => {
        setLoading(false);
        if (json.response_code === 0) {
          setData({ results: json.results, time, category: categoryName });
          setStartCountDown(true);
          setTimeout(() => {
            setStartCountDown(false);
            navigate("/player");
            console.log("Redirected to player");
          }, 3000);
        } else if (json.response_code === 1) {
          if (json.results.length) {
            toast.info(
              `Found ${json.results} Questions in the Quantum Realm (Requested: ${amount})`
            );
          } else {
            toast.error(
              "Oh no, our Quantum Database is empty for this request!"
            );
          }
        } else {
          toast.error(
            "Oh no, There's something unexpected occured in the Quantum Realm"
          );
        }
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading && <Loader />}
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
