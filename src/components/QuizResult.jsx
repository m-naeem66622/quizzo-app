import React, { useEffect, useState } from "react";
import timeStamp from "../helpers/timeStamp.js";
import Button from "./common/Button";

function QuizResult({ data, isTimerUp, timeToSolveQuiz }) {
  const [result, setResult] = useState(handleResultCalculator());

  function handleResultCalculator() {
    // initialize a temporary object for result
    const resultTemp = {
      totalTimeTaken: 0,
      questionsAttempted: 0,
      questionsSkipped: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      bestTime: timeToSolveQuiz,
      worstTime: 0,
      averageTime: 0,
    };

    data.forEach((quiz, index) => {
      // First check quiz is attempted or not
      if (quiz.isAttempted) {
        resultTemp.questionsAttempted = resultTemp.questionsAttempted + 1;

        // calculate best, worst & average time
        if (quiz.timeTaken < resultTemp.bestTime) {
          resultTemp.bestTime = quiz.timeTaken;
        } else if (quiz.timeTaken > resultTemp.worstTime) {
          resultTemp.worstTime = quiz.timeTaken;
        }

        // calculate correct & incorrect answers
        if (atob(quiz.selected) === atob(quiz.correct_answer)) {
          resultTemp.correctAnswers += 1;
        } else {
          resultTemp.incorrectAnswers += 1;
        }

        // adding time taken for each quiz
        resultTemp.averageTime += quiz.timeTaken;
        resultTemp.totalTimeTaken += quiz.timeTaken;
      } else if (quiz.isSkipped) {
        resultTemp.questionsSkipped = resultTemp.questionsSkipped + 1;
        // adding time taken for each quiz
        resultTemp.totalTimeTaken += quiz.timeTaken;
      }
    });

    // finally calculate average
    resultTemp.averageTime =
      resultTemp.averageTime / resultTemp.questionsAttempted;

    /* 
            if isTimerUp is true then set maximum time for the
            quiz that has been alloted otherwise total time
            is already calculated
    */
    if (isTimerUp) {
      resultTemp.totalTimeTaken = timeToSolveQuiz; // Maximum Time For Quiz in milliseconds
    }

    if (resultTemp.questionsAttempted === 0) {
      resultTemp.bestTime = 0;
      resultTemp.averageTime = 0;
    }

    return resultTemp;
  }

  return (
    <div className="bg-gradient-to-br from-blue-400 to-purple-600 text-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <div className="flex flex-col items-center space-y-6">
        <h2 className="text-4xl font-extrabold mb-4">🏆 Quiz Results 🏆</h2>
        <div className="grid grid-cols-2 gap-8">
          <div className="border-r-2 border-gray-400 pr-8">
            <p className="text-xl font-semibold mb-2">📊 Stats 📊</p>
            <p>
              ⏱️ Total Time Taken: {timeStamp(result.totalTimeTaken / 1000)}
            </p>
            <p>📝 Questions Attempted: {result.questionsAttempted}</p>
            <p>🤔 Questions Skipped: {result.questionsSkipped}</p>
            <p>❌ Incorrect Answers: {result.incorrectAnswers}</p>
            <p>✅ Correct Answers: {result.correctAnswers}</p>
          </div>
          <div className="pl-8">
            <p className="text-xl font-semibold mb-2">⏰ Timings ⏰</p>
            <p>🕒 Average Time: {timeStamp(result.averageTime / 1000)}</p>
            <p>⏱️ Best Time: {timeStamp(result.bestTime / 1000)}</p>
            <p>⏱️ Worst Time: {timeStamp(result.worstTime / 1000)}</p>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center">
        <Button className="px-6 py-3 text-xl font-semibold button-a-type">
          🚀 Explore Best Ever Result 🚀
        </Button>
      </div>
    </div>
  );
}

export default QuizResult;
