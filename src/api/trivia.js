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
 * Helper function to pause execution for a given duration.
 * @param {number} ms - Time to wait in milliseconds.
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetches the list of available trivia categories from the Open Trivia DB.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of category objects.
 */
export async function fetchCategories() {
  try {
    const response = await fetch(CATEGORY_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return data.trivia_categories;

  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch trivia categories.");
  }
}


/**
 * Fetches quiz questions based on user-selected parameters with retry logic.
 * @param {number} amount - The number of questions to fetch (e.g., 10).
 * @param {string | null} categoryId - The ID of the desired category, or 'any' or null for all categories.
 * @param {'easy' | 'medium' | 'hard' | null} difficulty - The difficulty level, or null for any difficulty.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of question objects.
 */
export async function fetchQuestions(amount = 10, categoryId = null, difficulty = null) {
  // 1. Construct the URL parameters
  const params = new URLSearchParams({
    amount: amount,
    type: 'multiple' 
  });

  if (categoryId && categoryId !== 'any') {
    params.append('category', categoryId);
  }

  if (difficulty) {
    params.append('difficulty', difficulty.toLowerCase());
  }

  const finalUrl = `${BASE_URL}?${params.toString()}`;
  console.log('Fetching questions from:', finalUrl);

  // --- Retry Logic for 429 Error ---
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
      try {
          const response = await fetch(finalUrl);

          if (response.ok) {
              const data = await response.json();
              
              // API Response Code Check
              if (data.response_code !== 0) {
                  const errorMap = {
                      1: "Could not return results. The API doesn't have enough questions for your query.",
                      2: "Invalid parameter was passed.",
                      default: "An unknown API error occurred."
                  };
                  throw new Error(errorMap[data.response_code] || errorMap.default);
              }
              
              // Success
              return data.results; 
          }

          // Rate Limit Check (429)
          if (response.status === 429) {
              attempt++;
              if (attempt < maxRetries) {
                  const delay = 1000 * Math.pow(2, attempt); // 2s, 4s, 8s delay
                  console.warn(`Rate limit hit (429). Retrying in ${delay / 1000} seconds...`);
                  await sleep(delay);
                  continue; // Try again
              } else {
                  // Max retries reached
                  throw new Error(`HTTP error! status: ${response.status}. Max retries exceeded.`);
              }
          } else {
              // Throw for other HTTP errors (e.g., 404, 500)
              throw new Error(`HTTP error! status: ${response.status}`);
          }

      } catch (error) {
          // Re-throw if it's not a temporary network error we are handling
          if (!error.message.includes('429')) {
              console.error("Error fetching quiz questions:", error);
              throw new Error(`Failed to fetch quiz questions: ${error.message || 'Check network connection.'}`);
          }
          // If it was an internal error during retry (e.g., network loss), the loop will continue
          attempt++;
          if (attempt >= maxRetries) {
              throw new Error(`Failed to fetch quiz questions after multiple retries: ${error.message}`);
          }
          const delay = 1000 * Math.pow(2, attempt);
          await sleep(delay);
      }
  }
}