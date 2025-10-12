// src/components/QuestionCard.jsx
import React from 'react';

/**
 * Helper function to decode HTML entities (like &quot; or &#039;) from the API.
 * This ensures the question text and answers display correctly.
 * @param {string} str - The string to decode.
 * @returns {string} The decoded string.
 */
function decodeHtml(str) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');
  return doc.documentElement.textContent;
}

/**
 * QuestionCard component - Displays a single question and handles user answer selection.
 * @param {object} props - Component props
 * @param {object} props.questionData - The data for the current question (including shuffled_answers).
 * @param {function} props.onAnswerSelected - Function to call when an answer is clicked.
 */
function QuestionCard({ questionData, onAnswerSelected }) {
  const { question, shuffled_answers, category, difficulty } = questionData;

  // Handles the button click and passes the selected answer text back to the parent
  const handleClick = (answer) => {
    onAnswerSelected(answer);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border-t-4 border-blue-500">
      
      {/* Metadata */}
      <div className="flex justify-between text-sm text-gray-500 mb-3">
        <span>Category: {decodeHtml(category)}</span>
        <span className={`font-semibold capitalize ${
            difficulty === 'easy' ? 'text-green-500' : 
            difficulty === 'medium' ? 'text-yellow-500' : 
            'text-red-500'
        }`}>
            {difficulty}
        </span>
      </div>

      {/* Question Text */}
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        {decodeHtml(question)}
      </h2>

      {/* Answer Buttons */}
      <div className="grid grid-cols-1 gap-4">
        {shuffled_answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleClick(answer)}
            className="w-full py-3 px-4 bg-gray-100 text-gray-800 rounded-lg shadow-md 
                       hover:bg-blue-200 transition duration-150 ease-in-out 
                       text-left font-medium border border-gray-300"
          >
            {decodeHtml(answer)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;