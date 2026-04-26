import React from 'react';
import NoteCard from './NoteCard';

function NoteList({ notes, deleteNote, setEditNote }) {
  if (notes.length === 0) {
    return <p className="empty">No notes yet 📝</p>;
  }

  return (
    <div className="note-list">
      {notes.map(note => (
        <NoteCard
          key={note._id}
          note={note}
          deleteNote={deleteNote}
          setEditNote={setEditNote}
        />
      ))}
    </div>
  );
}

export default NoteList;