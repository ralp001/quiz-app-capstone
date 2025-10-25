import React, { useState } from 'react';
import LoginPage from './components/LoginPage'; // <-- New import
import QuizStart from './components/QuizStart';
import QuizApp from './components/QuizApp';

function App() {
  // Initial state is now 'login'
  const [quizState, setQuizState] = useState('login'); // 'login', 'start', 'quiz'
  const [quizParameters, setQuizParameters] = useState(null);
  
  // New state to store the user's name
  const [userName, setUserName] = useState(''); 

  /**
   * Handles the login from the LoginPage component.
   * @param {string} name - The name entered by the user.
   */
  const handleLogin = (name) => {
    setUserName(name);
    // Transition from 'login' to 'start' (Quiz Setup)
    setQuizState('start'); 
  };

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
        {/* Update the header to show the user name */}
        <h1 className="text-4xl font-extrabold text-gray-800">
          Trivia Quiz Master 
          {userName && <span className="text-blue-600 block text-2xl mt-1">Hello, {userName}!</span>}
        </h1>
      </header>

      {/* Conditional Rendering based on quizState */}
      
      {/* 1. Login Screen */}
      {quizState === 'login' && (
        <LoginPage onLogin={handleLogin} />
      )}
      
      {/* 2. Quiz Setup Screen */}
      {quizState === 'start' && (
        <QuizStart onStartQuiz={handleStartQuiz} />
      )}
      
      {/* 3. Quiz In Progress */}
      {quizState === 'quiz' && quizParameters && (
        <QuizApp 
            quizParams={quizParameters} 
            onRestart={handleRestart} 
        />
      )}
    </div>
  );
}

export default App;