import React, { useState } from 'react';

/**
 * LoginPage component - Collects the user's name before starting the quiz.
 * @param {function} onLogin - Function to call when the user logs in, passing the userName.
 */
function LoginPage({ onLogin }) {
    const [userName, setUserName] = useState('');
    
    // Simple validation: ensure the user enters at least one character
    const isNameValid = userName.trim().length > 0;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isNameValid) {
            // Pass the name up to the parent component (App.jsx)
            onLogin(userName.trim());
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-lg mt-10 border-t-4 border-blue-500">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Welcome to Trivia Quiz Master!
            </h1>
            <p className="text-center text-gray-600 mb-8">
                Please enter your name to begin your challenge.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* User Name Input */}
                <div>
                    <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name:
                    </label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-4 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border shadow-sm"
                        placeholder="e.g., Alex Johnson"
                        required
                    />
                </div>

                {/* Start Button */}
                <button
                    type="submit"
                    disabled={!isNameValid}
                    className={`w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-lg font-bold text-white transition duration-150 ease-in-out
                        ${isNameValid 
                            ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            : 'bg-gray-400 cursor-not-allowed'
                        }`}
                >
                    Start Quiz Setup
                </button>
            </form>
        </div>
    );
}

export default LoginPage;