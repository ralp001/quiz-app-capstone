// src/App.jsx
import React, { useState } from 'react';
import QuizStart from './components/QuizStart';
import QuizApp from './components/QuizApp'; // <-- Import the new component

function App() {
  const [quizState, setQuizState] = useState('start'); // 'start', 'quiz', 'results'
  const [quizParameters, setQuizParameters] = useState(null);

  const handleStartQuiz = (params) => {
    // Store the parameters and transition to the 'quiz' state
    setQuizParameters(params);
    setQuizState('quiz'); 
  };
  
  const handleRestart = () => {
    // Reset state to show the QuizStart component again
    setQuizState('start');
    setQuizParameters(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-center py-6">
        <h1 className="text-4xl font-extrabold text-gray-800">Trivia Quiz Master</h1>
      </header>

      {/* Conditional Rendering based on quizState */}
      {quizState === 'start' && (
        <QuizStart onStartQuiz={handleStartQuiz} />
      )}
      
      {quizState === 'quiz' && quizParameters && (
        // Pass the parameters and a restart function to the QuizApp
        <QuizApp 
            quizParams={quizParameters} 
            onRestart={handleRestart} 
        />
      )}
      
      {/* The results state is handled internally by QuizApp for now, using hasFinished */}

    </div>
  );
}

export default App;