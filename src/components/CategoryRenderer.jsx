import React from "react";

const CategoryRenderer = ({ id, category, handleOnClick }) => {
  const cards = [
    { difficulty: "Easy", time: 60, numQuestions: 10 },
    {
      difficulty: "Medium",
      time: 120,
      numQuestions: 20,
    },
    {
      difficulty: "Hard",
      time: 180,
      numQuestions: 30,
    },
  ];

  return (
    <div className="mb-10">
      <h2 className="text-4xl font-bold text-left mb-4 text-green-400">
        {category}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between h-64"
          >
            <div className="text-gray-300">
              <p className="font-bold text-blue-500 text-lg mb-2">
                Difficulty: {card.difficulty}
              </p>
              <p className="text-blue-200 text-lg">
                No. of Questions: {card.numQuestions}
              </p>
              <p className="text-blue-200 text-lg">Time: {card.time} min</p>
            </div>
            <button
              onClick={() =>
                handleOnClick({
                  categoryId: id,
                  categoryName: category,
                  amount: card.numQuestions,
                  difficulty: card.difficulty,
                  time: card.time,
                })
              }
              className="mt-4 px-4 py-2 text-lg bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 text-white rounded-md transition duration-300"
            >
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryRenderer;
