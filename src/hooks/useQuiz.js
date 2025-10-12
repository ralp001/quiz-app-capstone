// src/hooks/useQuiz.js
import { useState, useEffect } from 'react';
import { fetchQuestions } from '../api/trivia'; 

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

  // useEffect runs whenever the 'params' object changes (i.e., when the quiz starts)
  useEffect(() => {
    // We only fetch if params are provided (i.e., not null)
    if (!params) {
      setIsLoading(false);
      return; 
    }

    const loadQuestions = async () => {
      // 1. Reset states before starting a new fetch
      setIsLoading(true);
      setError(null);
      setQuestions([]);

      try {
        // 2. Call the API function from Week 1
        const fetchedQuestions = await fetchQuestions(
          params.amount, 
          params.categoryId, 
          params.difficulty
        );
        
        // 3. Simple data transformation: Combine and randomize answers
        const formattedQuestions = fetchedQuestions.map(q => {
            // Create an array of all answers
            const allAnswers = [...q.incorrect_answers, q.correct_answer];
            
            // Randomize the order of the answers (a clean way to shuffle an array)
            const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);
            
            return {
                ...q,
                shuffled_answers: shuffledAnswers, // Store the randomized list
            };
        });

        setQuestions(formattedQuestions);

      } catch (err) {
        console.error("Quiz Fetch Error:", err);
        setError(err.message);
      } finally {
        // 4. Set loading to false once the operation is complete
        setIsLoading(false);
      }
    };

    loadQuestions();
    
    // The dependency array ensures the effect runs only when 'params' changes.
  }, [params]); 

  // The hook returns the essential data and status flags
  return { questions, isLoading, error };
}