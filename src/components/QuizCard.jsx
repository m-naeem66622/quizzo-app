import React, { useEffect, useState } from "react";
import shuffleArray from "../helpers/shuffler";
import Button from "./common/Button";

const QuizCard = ({
  currentQuizIndex,
  totalQuizzes,
  quizData,
  dispatch,
  counterState,
  isAllVisited, // Remember: isAllVisited only be true after all question submitted (isSkipped or isAttemped)
  isAllAttempted,
  isAnySkipped,
}) => {
  const { question, correct_answer, incorrect_answers, selected } = quizData;
  const { counter, setCounter } = counterState;
  const [choices, setChoices] = useState([]);
  // To count time for each question
  const [questionStartedAt, setQuestionStartedAt] = useState();

  const handleOnChange = (answer) => {
    dispatch({
      type: "UPDATE_SELECTION",
      payload: { index: currentQuizIndex, selected: answer },
    });
  };

  const handleOnClickNext = () => {
    const timeTaken = Date.now() - questionStartedAt;
    if (isAllVisited && !isAnySkipped) {
      // console.log("QuizCard: SUBMIT_QUIZ dispatched from nextHandle");
      console.log("QuizPlayer: quiz submitted after all attempted by user");
      dispatch({
        type: "SUBMIT_QUIZ",
        payload: { index: currentQuizIndex, timeTaken },
      });
      setCounter({ minute: 0, second: 0, count: 0 });
    } else {
      // console.log("QuizCard: UPDATE_NEXT dispatched from nextHandle");
      dispatch({
        type: "UPDATE_NEXT",
        payload: { index: currentQuizIndex, timeTaken },
      });
    }
  };

  const handleOnClickShowSkip = () => {
    const timeTaken = Date.now() - questionStartedAt;
    // This will executed once because of isAllVisited
    dispatch({
      type: "SHOW_SKIPPED_QUESTIONS",
      payload: { index: currentQuizIndex, timeTaken },
    });
  };

  const handleOnClickSkip = () => {
    const timeTaken = Date.now() - questionStartedAt;
    dispatch({
      type: "UPDATE_SKIPPED",
      payload: { index: currentQuizIndex, timeTaken },
    });
  };

  useEffect(() => {
    setChoices(shuffleArray([...incorrect_answers, correct_answer]));
    setQuestionStartedAt(Date.now());
  }, [currentQuizIndex]);

  return (
    <div className="bg-gradient-to-br from-blue-400 to-purple-600 text-white rounded-lg shadow-md p-6 w-full max-w-lg min-w-[28rem] mx-auto">
      <div className="text-center mb-4">
        <p className="text-gray-200 rounded-full bg-[#30323D] py-2 px-4 text-base">
          {currentQuizIndex + 1} of {totalQuizzes}
        </p>
      </div>
      <div className="mb-6">
        {/* atob() for decoding base64 string */}
        <p className="text-lg font-semibold">{atob(question)}</p>
      </div>
      <div className="space-y-4">
        {choices.map((answer, index) => (
          <label
            htmlFor={`answer-${index}`}
            key={currentQuizIndex + "-" + index}
            className="flex items-center p-3 border rounded-md cursor-pointer hover:text-black hover:bg-gray-100 transition duration-300"
          >
            <input
              onChange={(e) => handleOnChange(answer)}
              readOnly
              type="radio"
              id={`answer-${index}`}
              name="answer"
              className="mr-2 hidden"
            />
            <span className="relative flex items-center">
              <span
                className={`w-6 h-6 rounded-full ${
                  selected === answer
                    ? "bg-blue-500 border-2 border-white"
                    : "bg-gray-300"
                } transition duration-300`}
              ></span>
              <span className="ml-3 select-none">{atob(answer)}</span>
            </span>
          </label>
        ))}
      </div>
      <div className="mt-6 flex justify-between">
        {!quizData.isSkipped ? (
          <Button
            title="Skip this question to solve later"
            onClick={handleOnClickSkip}
            className="px-4 py-2 button-a-type"
          >
            Skip
          </Button>
        ) : (
          <p className="rounded-full bg-[#06B6D4] py-2 px-4 text-base font-semibold">
            Skipped Question
          </p>
        )}
        {/* If user is on the last question and isAllAttempted = false */}
        {isAnySkipped && currentQuizIndex + 1 === totalQuizzes ? (
          <Button
            onClick={handleOnClickShowSkip}
            disabled={selected === undefined}
            className={`px-4 py-2 button-c-type`}
          >
            Solve Skipped Questions
          </Button>
        ) : (
          <Button
            onClick={handleOnClickNext}
            disabled={selected === undefined}
            className={`px-4 py-2 ${
              (isAllVisited && !isAnySkipped) ||
              currentQuizIndex + 1 === totalQuizzes
                ? "button-b-type"
                : "button-a-type"
            }`}
          >
            {(isAllVisited && !isAnySkipped) ||
            currentQuizIndex + 1 === totalQuizzes
              ? "Submit"
              : "Next"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizCard;
