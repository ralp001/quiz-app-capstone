// src/components/ScoreSummary.jsx
import React from 'react';

/**
 * ScoreSummary component - Displays the final quiz results.
 * @param {object} props - Component props
 * @param {number} props.score - The number of correct answers.
 * @param {number} props.totalQuestions - The total number of questions asked.
 * @param {function} props.onRestart - Function to transition the app back to the 'start' screen.
 */
function ScoreSummary({ score, totalQuestions, onRestart }) {
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  
  let resultMessage = '';
  if (percentage >= 80) {
    resultMessage = "A perfect score! You're a trivia master! 🧠";
  } else if (percentage >= 60) {
    resultMessage = "Great job! You know your stuff. 👍";
  } else {
    resultMessage = "Good effort! Time to hit the books for the next round. 💪";
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-2xl rounded-xl mt-10 text-center border-t-8 border-green-500">
      <h2 className="text-4xl font-extrabold text-green-600 mb-4">Quiz Complete! 🎉</h2>
      
      <p className="text-2xl text-gray-700 mb-2">Your Final Score:</p>
      
      <div className="flex justify-center items-center my-6">
        <span className="text-7xl font-black text-blue-700">{score}</span>
        <span className="text-4xl text-gray-500"> / {totalQuestions}</span>
      </div>
      
      <p className="text-3xl font-bold text-gray-800 mb-6">{percentage}%</p>
      <p className="text-lg text-gray-600 mb-8 font-semibold">{resultMessage}</p>

      <button
        onClick={onRestart}
        className="w-full py-3 px-4 rounded-lg shadow-md text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out"
      >
        Start New Quiz
      </button>
    </div>
  );
}

export default ScoreSummary;