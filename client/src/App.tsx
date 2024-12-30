import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Note as NoteModel} from './models/notes';
import Note from './components/Note';

function App() {
  const [count, setCount] = useState(0);
  const [notes, setNotes] = useState<NoteModel[]>([]); // array of notes

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch ("http://localhost:5001/api/notes", {method: "GET"});
        const notes = await response.json(); // because of the endpoint sending json
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []); // empty array, executes on first render, no array, execute on every render

  return (
    <div className="App">
      {notes.map(note => (
        <Note note={note} key={note._id} />
      ))}
    </div>
  );
}

export default App
