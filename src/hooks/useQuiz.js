/**
 * src/hooks/useQuiz.js
 * Custom hook to fetch quiz questions based on user parameters.
 */
import { useState, useEffect } from 'react';
import { fetchQuestions } from '../api/trivia'; 

/**
 * Helper function to decode HTML entities (like &quot; or &#039;) from the API.
 * This ensures the question text and answers display correctly.
 * NOTE: Using a parser is the safest way to decode all entities.
 * @param {string} str - The string to decode.
 * @returns {string} The decoded string.
 */
function decodeHtml(str) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    return doc.documentElement.textContent;
}

/**
 * Custom hook to fetch quiz questions based on user parameters.
 * @param {object} params - Quiz parameters (amount, categoryId, difficulty).
 * @returns {{questions: Array, isLoading: boolean, error: string | null}} 
 * An object containing the question array, loading status, and any error message.
 */
export function useQuiz(params) {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!params) {
      setIsLoading(false);
      return; 
    }

    const loadQuestions = async () => {
      setIsLoading(true);
      setError(null);
      setQuestions([]);

      try {
        const fetchedQuestions = await fetchQuestions(
          params.amount, 
          params.categoryId, 
          params.difficulty
        );
        
        // 1. Data Transformation: Decode and Shuffle Answers
        const formattedQuestions = fetchedQuestions.map(q => {
            // Decode all strings from the API
            const decodedQuestion = decodeHtml(q.question);
            const decodedCorrectAnswer = decodeHtml(q.correct_answer);
            const decodedIncorrectAnswers = q.incorrect_answers.map(ans => decodeHtml(ans));
            
            // Create an array of all answers and randomize the order
            const allAnswers = [...decodedIncorrectAnswers, decodedCorrectAnswer];
            const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);
            
            return {
                ...q,
                question: decodedQuestion,
                correct_answer: decodedCorrectAnswer,
                incorrect_answers: decodedIncorrectAnswers,
                shuffled_answers: shuffledAnswers, // Store the randomized list
            };
        });

        setQuestions(formattedQuestions);

      } catch (err) {
        console.error("Quiz Fetch Error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
    
  }, [params]); 

  return { questions, isLoading, error };
}