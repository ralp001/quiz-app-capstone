// src/components/QuizApp.jsx
import React, { useState } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import QuestionCard from './QuestionCard'; // We will create this next!
import ScoreSummary from './ScoreSummary'; // We will create this in Week 3!

/**
 * QuizApp component - Manages the core quiz logic, state, and flow.
 * @param {object} props - Component props
 * @param {object} props.quizParams - The parameters selected by the user from QuizStart.
 * @param {function} props.onRestart - Function to transition the app back to the 'start' screen.
 */
function QuizApp({ quizParams, onRestart }) {
  // Use the custom hook to fetch questions and manage loading/error states
  const { questions, isLoading, error } = useQuiz(quizParams);
  
  // State to track the current position in the quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // State to track the user's score
  const [score, setScore] = useState(0);
  // State to track if the quiz is over
  const [hasFinished, setHasFinished] = useState(false);

  /**
   * Handles a user clicking an answer button.
   * @param {string} selectedAnswer - The text of the answer the user clicked.
   */
  const handleAnswerSelected = (selectedAnswer) => {
    // 1. Check if the answer is correct
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;
    
    // 2. Update the score if correct
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    
    // 3. Determine next step (next question or finish)
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      // There are more questions, move to the next one
      setCurrentQuestionIndex(nextIndex);
    } else {
      // This was the last question, show the results
      setHasFinished(true);
    }
  };

  // --- Render Logic ---

  if (isLoading) {
    return (
      <div className="text-center p-8 text-2xl font-semibold text-blue-600">
        Loading quiz questions... 🚀
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-red-100 text-red-700 rounded-lg mt-10">
        <h2 className="text-xl font-bold mb-2">Error!</h2>
        <p>{error}</p>
        <button 
            onClick={onRestart} 
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
            Try New Quiz
        </button>
      </div>
    );
  }

  if (hasFinished) {
    // When finished, show the ScoreSummary (Week 3 component)
    return (
        <ScoreSummary 
            score={score} 
            totalQuestions={questions.length} 
            onRestart={onRestart} 
        />
    );
  }
  
  // Show the current question
  return (
    <div className="max-w-lg mx-auto p-4">
        <div className="text-center text-xl font-medium mb-4 text-gray-700">
            Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        
        {/* Pass the current question and the answer handler to QuestionCard */}
        <QuestionCard 
            questionData={questions[currentQuestionIndex]}
            onAnswerSelected={handleAnswerSelected}
        />
        
        <div className="text-right mt-4 text-2xl font-bold text-blue-700">
            Score: {score}
        </div>
    </div>
  );
}

export default QuizApp;