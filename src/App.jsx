// src/App.jsx
import './index.css'; 
import QuizStart from './QuizStart'; 

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-center py-6 bg-white shadow-md rounded-lg mb-8">
        <h1 className="text-4xl font-extrabold text-indigo-700">
          The Ultimate Trivia Quiz!
        </h1>
      </header>
      
      <main>
        <QuizStart />
      </main>

      <footer className="text-center mt-10 text-gray-500 text-sm">
        Data provided by Open Trivia Database
      </footer>
    </div>
  );
}

export default App;