// src/components/QuizStart.jsx
import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../api/trivia';

// Hardcoded options for Amount and Difficulty
const AMOUNT_OPTIONS = [5, 10, 15, 20];
const DIFFICULTY_OPTIONS = ['Any Difficulty', 'easy', 'medium', 'hard'];

/**
 * QuizStart component - Allows the user to select quiz parameters.
 * @param {object} props - Component props
 * @param {function} props.onStartQuiz - Function to call when the user clicks 'Start Quiz', 
 * passing the selected parameters.
 */
function QuizStart({ onStartQuiz }) {
  // State for user selections
  const [quizParams, setQuizParams] = useState({
    amount: 10,
    category: 'any', // category ID (e.g., '9' for General Knowledge) or 'any'
    difficulty: 'Any Difficulty',
  });
  
  // State for fetched categories
  const [categories, setCategories] = useState([]);
  // State for loading and error handling for categories fetch
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect Hook to fetch categories when the component mounts
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        // Add a default "Any Category" option at the start
        const categoryOptions = [{ id: 'any', name: 'Any Category' }, ...data];
        setCategories(categoryOptions);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    getCategories();
  }, []); // Empty dependency array means this runs only once after the initial render
  
  
  // Handles changes in form inputs (select fields)
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Update the corresponding key in the quizParams state
    setQuizParams(prevParams => ({
      ...prevParams,
      [name]: value,
    }));
  };

  // Handles the form submission (Start Quiz button click)
  const handleSubmit = (event) => {
    event.preventDefault();
    // Prepare data for the parent component, converting values to the expected type/format
    const finalParams = {
        amount: Number(quizParams.amount), // Ensure amount is a number
        categoryId: quizParams.category,   // Category ID (or 'any')
        difficulty: quizParams.difficulty === 'Any Difficulty' ? null : quizParams.difficulty, // null if 'Any Difficulty'
    };
    
    // Call the prop function to start the quiz flow in the main App component
    onStartQuiz(finalParams);
  };

  if (isLoading) {
    return <div className="text-center p-8 text-xl">Loading categories... ⏳</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-xl text-red-600">Error loading categories: {error} ❌</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-lg mt-10 border-t-4 border-blue-500">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Setup Your Quiz!</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* --- 1. Amount Selection --- */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Questions:
          </label>
          <select
            id="amount"
            name="amount"
            value={quizParams.amount}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
          >
            {AMOUNT_OPTIONS.map(amount => (
              <option key={amount} value={amount}>{amount}</option>
            ))}
          </select>
        </div>

        {/* --- 2. Category Selection --- */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Select Category:
          </label>
          <select
            id="category"
            name="category"
            value={quizParams.category}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
          >
            {categories.map((cat) => (
              // The API uses the category ID for fetching questions
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* --- 3. Difficulty Selection --- */}
        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
            Select Difficulty:
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={quizParams.difficulty}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
          >
            {DIFFICULTY_OPTIONS.map(difficulty => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>
        </div>

        {/* --- Start Button --- */}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          Start Quiz
        </button>
      </form>
    </div>
  );
}

export default QuizStart;