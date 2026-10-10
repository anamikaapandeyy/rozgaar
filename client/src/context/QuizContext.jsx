import { createContext, useContext, useEffect, useState } from 'react';

const QuizContext = createContext(null);

const emptyAnswers = { stage: '', interests: [], skills: [] };

function loadSaved() {
  try {
    const saved = localStorage.getItem('rozgaar-answers');
    return saved ? JSON.parse(saved) : emptyAnswers;
  } catch {
    return emptyAnswers;
  }
}

export function QuizProvider({ children }) {
  const [answers, setAnswers] = useState(loadSaved);

  useEffect(() => {
    localStorage.setItem('rozgaar-answers', JSON.stringify(answers));
  }, [answers]);

  function reset() {
    setAnswers(emptyAnswers);
  }

  return (
    <QuizContext.Provider value={{ answers, setAnswers, reset }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  return useContext(QuizContext);
}