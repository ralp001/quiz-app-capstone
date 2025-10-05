import React, { useState, useEffect } from 'react';
import { fetchCategories } from './api/trivia'; // Import our new function

function QuizStart() {
    // 1. State for storing the categories list
    const [categories, setCategories] = useState([]);
    
    // 2. State for handling loading/fetching status
    const [isLoading, setIsLoading] = useState(true);

    // 3. State for handling errors
    const [error, setError] = useState(null);

    // useEffect hook runs code after the component renders
    useEffect(() => {
        // Function to handle the async fetch operation
        async function loadCategories() {
            try {
                const data = await fetchCategories();
                setCategories(data);
                setIsLoading(false); // Stop loading when successful
            } catch (err) {
                setError("Failed to load quiz categories. Please check your network connection.");
                setIsLoading(false); // Stop loading even if there's an error
            }
        }
        
        loadCategories();
    }, []); // Empty dependency array means this runs only ONCE after the initial render

    // --- RENDER LOGIC ---

    if (isLoading) {
        // Simple loading message using Tailwind classes
        return (
            <div className="text-center p-8 text-xl font-semibold text-gray-600">
                Loading categories...
            </div>
        );
    }

    if (error) {
        // Simple error message using Tailwind classes
        return (
            <div className="text-center p-8 text-red-600 font-bold bg-red-100 border border-red-400 rounded">
                Error: {error}
            </div>
        );
    }
    
    // Main component structure
    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Start a New Quiz</h2>

            <div className="space-y-4">
                {/* CATEGORY SELECTION */}
                <label htmlFor="category-select" className="block text-lg font-medium text-gray-700">
                    Select Category:
                </label>
                <select 
                    id="category-select" 
                    className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg rounded-md border"
                >
                    <option value="">Any Category</option>
                    {categories.map((category) => (
                        // Map over the fetched categories to create options
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                {/* DIFFICULTY SELECTION (Placeholder for now) */}
                <label htmlFor="difficulty-select" className="block text-lg font-medium text-gray-700 pt-4">
                    Select Difficulty:
                </label>
                <select 
                    id="difficulty-select" 
                    className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg rounded-md border"
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

            <div className="mt-8 text-center">
                <button 
                    className="px-6 py-3 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                    Start Quiz
                </button>
            </div>
        </div>
    );
}

export default QuizStart;