import { useState, useEffect } from 'react';
// CAMBIA LA IMPORTACIÓN AL NUEVO COMPONENTE
import StudentCard from './components/student/StudentCard'; // <--- ¡AQUÍ!
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/data/students.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Fetched data is not an array.");
        setStudents(data);
      } catch (e) {
        setError(e.message);
        console.error("Error fetching student data:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mis niñas consentidas</h1>
      </header>
      <main>
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">Error: {error}</p>}
        <div className="student-list">
          {!loading && !error && students.length > 0 && (
            students.map((student) => (
              <StudentCard key={student.id} student={student} /> // Usa el componente importado
            ))
          )}
          {!loading && !error && students.length === 0 && <p>No students to display.</p>}
        </div>
      </main>
    </div>
  );
}

export default App;