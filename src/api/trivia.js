// Base URL for the Open Trivia Database API
const API_BASE_URL = 'https://opentdb.com';

// ... (fetchCategories function remains the same) ...

/**
 * Fetches the quiz questions from the API based on user parameters.
 * @param {number} categoryId - The ID of the chosen category (9 for General Knowledge, 0 for Any).
 * @param {string} difficulty - The chosen difficulty level ('easy', 'medium', 'hard', or 'any').
 * @param {number} amount - The number of questions to fetch (default is 10).
 * @returns {Promise<Array>} A promise that resolves to an array of question objects.
 */
export async function fetchQuizQuestions(categoryId, difficulty, amount = 10) {
    // 1. Construct the API URL using template literals and the parameters
    let url = `${API_BASE_URL}/api.php?amount=${amount}&type=multiple`;

    if (categoryId && categoryId !== 0) {
        url += `&category=${categoryId}`;
    }

    if (difficulty && difficulty !== 'any') {
        url += `&difficulty=${difficulty}`;
    }
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // The questions are inside the 'results' array
        return data.results;

    } catch (error) {
        console.error("Error fetching quiz questions:", error);
        throw error; 
    }
}