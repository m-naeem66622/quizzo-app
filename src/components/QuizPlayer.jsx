import React, { useEffect, useReducer, useState } from "react";
import QuizCard from "./QuizCard";
import quizSampleData from "../assets/quiz-sample.json";
import quizzesReducer from "../helpers/quizzesReducer";
import QuizResult from "./QuizResult";

function QuizPlayer() {
  // To be removed and integrate API
  const data = JSON.stringify(quizSampleData);
  const json = JSON.parse(data);

  const [allQuestionsVisited, setAllQuestionsVisited] = useState(false);
  const [allQuestionsAttempted, setAllQuestionsAttempted] = useState(false);
  const [anyQuestionAttempted, setAnyQuestionAttempted] = useState(false);

  const [quizzes, dispatch] = useReducer(quizzesReducer, {
    showResult: false,
    isTimerUp: false,
    currentIndex: 0,
    total: 0,
    data: [],
  });
  const [counter, setCounter] = useState({
    minute: "05",
    second: "00",
    count: 300,
  });

  useEffect(() => {
    // Check if all questions (both attempted and skipped) have been visited
    const allQuestionsAreVisited = quizzes.data.length
      ? quizzes.data.every((quiz) => quiz.timeTaken || quiz.selected)
      : false;

    // check if all question have been attempted
    const allQuestionsAreAttempted = quizzes.data.length
      ? quizzes.data.every((quiz) => quiz.isAttempted)
      : false;

    const questionIsSkipped = quizzes.data.length
      ? quizzes.data.some((quiz) => quiz.isSkipped)
      : false;

    // console.log(
    //   "QuizPlayer: ",
    //   "visted:",
    //   allQuestionsAreVisited,
    //   "attempted: ",
    //   allQuestionsAreAttempted,
    //   "skipped: ",
    //   questionIsSkipped
    // );
    setAllQuestionsVisited(allQuestionsAreVisited);
    setAllQuestionsAttempted(allQuestionsAreAttempted);
    setAnyQuestionAttempted(questionIsSkipped);
    // console.log("QuizPlayer: quizzes upadted", quizzes);
  }, [quizzes]);

  // Update the counter every second
  useEffect(() => {
    if (allQuestionsAttempted && counter.count > 0) {
      console.log("QuizPlayer: quiz auto submitted after all attempted");
      // Show skipped questions when all questions have been visited and there is remaining time
      dispatch({ type: "SUBMIT_QUIZ", payload: {} });
      setCounter({ minute: 0, second: 0, count: 0 });
    }
    // Stop the timer when it reaches zero
    if (counter.count > 0) {
      // Use setTimeout to delay the update by one second
      const timer = setTimeout(
        () =>
          setCounter((prev) => {
            const minute = Math.floor(((prev.count - 1) % 3600) / 60);
            const second = Math.floor(((prev.count - 1) % 3600) % 60);
            const counter = prev.count - 1;
            return { minute, second, count: counter };
          }),
        1000
      );
      // Clear the timeout when the component unmounts or the counter changes
      return () => clearTimeout(timer);
    } else if (!quizzes.showResult) {
      console.log("QuizPlayer: quiz auto submitted after timer up");
      setTimeout(() => {
        dispatch({ type: "SUBMIT_QUIZ", payload: { isTimerUp } });
      }, 1000);
      setCounter({ minute: 0, second: 0, count: 0 });
    }
  }, [counter, allQuestionsAttempted]);

  useEffect(() => {
    dispatch({ type: "ADD_QUIZZES", payload: json.results });
  }, []);

  return (
    <>
      {/* Show Category and Difficulty only when data
      length is defined and showResult is false */}
      {quizzes.data.length && !quizzes.showResult && (
        <div className="text-xl font-semibold mb-2 flex justify-between">
          <span className="rounded-full bg-[#06B6D4] py-2 px-4 text-base">
            Category: {atob(quizzes.data[quizzes.currentIndex].category)}
          </span>
          <span className="rounded-full bg-[#06B6D4] py-2 px-4 text-base">
            Difficulty: {atob(quizzes.data[quizzes.currentIndex].difficulty)}
          </span>
        </div>
      )}

      {/* Show timer only when showResult is false */}
      {!quizzes.showResult && (
        <h2 className="text-2xl font-bold mb-3">
          Remaining Time: {counter.minute + ":" + counter.second}
        </h2>
      )}

      {/* Show QuizCard only when data
      length is defined and showResult is false */}
      {quizzes.data.length && !quizzes.showResult && (
        <QuizCard
          currentQuizIndex={quizzes.currentIndex}
          totalQuizzes={quizzes.data.length}
          quizData={quizzes.data[quizzes.currentIndex]}
          dispatch={dispatch}
          counterState={{ counter, setCounter }}
          isAllVisited={allQuestionsVisited}
          isAllAttempted={allQuestionsAttempted}
          isAnySkipped={anyQuestionAttempted}
        />
      )}

      {/* Show QuizReuslt only when showResult is true */}
      {quizzes.showResult && (
        <QuizResult isTimerUp={quizzes.isTimerUp} data={quizzes.data} />
      )}
    </>
  );
}

export default QuizPlayer;
