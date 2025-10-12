/**
 * src/api/trivia.js
 * * Open Trivia DB API service module.
 * This module exports functions to fetch categories and quiz questions.
 */

// Base URL for fetching quiz questions
const BASE_URL = 'https://opentdb.com/api.php';
// URL for fetching the list of categories
const CATEGORY_URL = 'https://opentdb.com/api_category.php';

/**
 * Fetches the list of available trivia categories from the Open Trivia DB.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of category objects.
 */
export async function fetchCategories() {
  try {
    const response = await fetch(CATEGORY_URL);
    
    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // The categories are nested inside 'trivia_categories'
    return data.trivia_categories;

  } catch (error) {
    // Log the error for debugging and re-throw to be handled by the caller
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch trivia categories.");
  }
}


/**
 * Fetches quiz questions based on user-selected parameters.
 * @param {number} amount - The number of questions to fetch (e.g., 10).
 * @param {string | null} categoryId - The ID of the desired category, or 'any' or null for all categories.
 * @param {'easy' | 'medium' | 'hard' | null} difficulty - The difficulty level, or null for any difficulty.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of question objects.
 */
export async function fetchQuestions(amount = 10, categoryId = null, difficulty = null) {
  // 1. Construct the URL parameters
  const params = new URLSearchParams({
    // Always include the amount
    amount: amount,
    // We'll focus on multiple-choice questions for simplicity
    type: 'multiple' 
  });

  // 2. Add optional parameters if they are provided
  if (categoryId && categoryId !== 'any') {
    params.append('category', categoryId);
  }

  if (difficulty) {
    params.append('difficulty', difficulty.toLowerCase());
  }

  const finalUrl = `${BASE_URL}?${params.toString()}`;
  console.log('Fetching questions from:', finalUrl);

  try {
    const response = await fetch(finalUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // The Open Trivia DB uses response code 0 for success.
    if (data.response_code !== 0) {
      // Response code 1: No Results, 2: Invalid Parameter, 3: Token Not Found, 4: Token Empty
      const errorMap = {
        1: "Could not return results. The API doesn't have enough questions for your query.",
        2: "Invalid parameter was passed.",
        default: "An unknown API error occurred."
      };
      throw new Error(errorMap[data.response_code] || errorMap.default);
    }

    // Returns the array of question objects
    return data.results; 

  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    // Re-throw a user-friendly error
    throw new Error(`Failed to fetch quiz questions: ${error.message || 'Check network connection.'}`);
  }
}