// src/components/QuestionCard.jsx
import React, { useState, useEffect, useMemo } from 'react';

// The decodeHtml function is no longer needed here as it's handled in useQuiz.js.

/**
 * QuestionCard component - Displays a single question and handles user answer selection.
 * NOTE: All strings in questionData are now pre-decoded from the useQuiz hook.
 * @param {object} props - Component props
 * @param {object} props.questionData - The data for the current question (including shuffled_answers).
 * @param {function} props.onAnswerSelected - Function to call when an answer is clicked.
 */
function QuestionCard({ questionData, onAnswerSelected }) {
    // State to track if an answer has been selected for the current question
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    
    const { question, shuffled_answers, category, difficulty, correct_answer } = questionData;

    // Reset selectedAnswer state whenever the question changes
    useEffect(() => {
        setSelectedAnswer(null);
    }, [questionData]);

    // Handles the button click and passes the selected answer text back to the parent
    const handleAnswerClick = (answer) => {
        // Prevent selecting another answer if one is already selected
        if (selectedAnswer) return; 

        setSelectedAnswer(answer); 
        
        // Call the prop function to update score and advance question
        onAnswerSelected(answer); 
    };

    // Function to determine the CSS class based on answer state
    const getAnswerClass = (answer) => {
        // Default unselected state
        if (!selectedAnswer) {
            return "bg-gray-100 hover:bg-blue-200 text-gray-800 border-gray-300";
        }
        
        // Answer selected, apply feedback colors
        if (answer === correct_answer) {
            return "bg-green-100 border-green-500 text-green-700 pointer-events-none"; // Correct answer is always green
        }
        
        if (answer === selectedAnswer) {
            return "bg-red-100 border-red-500 text-red-700 pointer-events-none"; // Wrong answer selected is red
        }

        // Default style for incorrect, unselected answers after a choice is made
        return "bg-gray-50 border-gray-300 text-gray-400 cursor-default pointer-events-none";
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl border-t-4 border-blue-500">
            
            {/* Metadata */}
            <div className="flex justify-between text-sm text-gray-500 mb-3">
                <span>Category: {category}</span>
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
                {question}
            </h2>

            {/* Answer Buttons */}
            <div className="grid grid-cols-1 gap-4">
                {shuffled_answers.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerClick(answer)}
                        // Disable buttons globally if an answer has been selected
                        disabled={!!selectedAnswer} 
                        className={`
                            w-full py-3 px-4 rounded-lg shadow-md transition duration-150 ease-in-out 
                            text-left font-medium border border-2 
                            ${getAnswerClass(answer)}
                        `}
                    >
                        {answer}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default QuestionCard;