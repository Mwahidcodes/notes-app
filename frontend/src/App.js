import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import './App.css';

const API = "http://localhost:5000/api/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);

  // GET NOTES
  const fetchNotes = async () => {
    try {
      const res = await axios.get(API);
      setNotes(res.data);
    } catch (err) {
      console.log("GET ERROR:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // ADD NOTE
  const addNote = async (note) => {
    try {
      await axios.post(API, note);
      fetchNotes();
    } catch (err) {
      console.log("POST ERROR:", err);
    }
  };

  // UPDATE NOTE (🔥 FIXED)
  const updateNote = async (id, note) => {
    console.log("Updating ID:", id); // DEBUG LINE

    if (!id) {
      alert("❌ Note ID missing!");
      return;
    }

    try {
      await axios.put(`${API}/${id}`, note);
      setEditNote(null);
      fetchNotes();
    } catch (err) {
      console.log("UPDATE ERROR:", err);
      alert("Update failed (check backend)");
    }
  };

  // DELETE NOTE
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchNotes();
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };

  return (
    <div className="app">
      <h1>📝 My Notes App</h1>

      <NoteForm
        addNote={addNote}
        editNote={editNote}
        updateNote={updateNote}
      />

      <NoteList
        notes={notes}
        deleteNote={deleteNote}
        setEditNote={setEditNote}
      />
    </div>
  );
}

export default App;