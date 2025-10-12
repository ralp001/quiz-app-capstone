// src/App.jsx
import React, { useState } from 'react';
import QuizStart from './components/QuizStart';
// Note: You don't *need* the fetchQuestions here yet, but it's good to know where it'll go!
// import { fetchQuestions } from './api/trivia'; 

function App() {
  const [quizState, setQuizState] = useState('start'); // 'start', 'quiz', 'results'
  const [quizParameters, setQuizParameters] = useState(null);

  /**
   * This function is passed to the QuizStart component and is called 
   * when the user submits their selections.
   * @param {object} params - The selected quiz parameters (amount, categoryId, difficulty).
   */
  const handleStartQuiz = (params) => {
    console.log("Quiz Parameters Selected:", params);
    // 1. Store the parameters
    setQuizParameters(params);
    // 2. Transition the state to 'quiz' (or whatever state manages the question fetching)
    setQuizState('quiz'); 
    
    // In Week 2, this is where you'll trigger the fetchQuestions!
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {quizState === 'start' && (
        <QuizStart onStartQuiz={handleStartQuiz} />
      )}
      
      {/* In Week 2, you'll add logic for 'quiz' and 'results' states here.
        Example:
        {quizState === 'quiz' && (
            // <QuizComponent params={quizParameters} />
            <div className="text-center p-8">Ready to fetch questions for: {JSON.stringify(quizParameters)}</div>
        )} 
      */}
      
      {quizState !== 'start' && (
        <div className="text-center p-8">
            <h2 className="text-2xl font-semibold">Quiz Flow Placeholder</h2>
            <p>Current State: **{quizState}**</p>
            <p>Parameters: {JSON.stringify(quizParameters)}</p>
            <p className='mt-4 text-blue-500'>*Come back to this in Week 2 to implement the quiz component!*</p>
        </div>
      )}
    </div>
  );
}

export default App;