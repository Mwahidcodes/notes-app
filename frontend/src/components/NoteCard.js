import React from 'react';

function NoteCard({ note, deleteNote, setEditNote }) {
  const date = new Date(note.createdAt).toLocaleDateString();

  return (
    <div className="note-card">
      <div className="note-header">
        <h3>{note.title}</h3>
        <span className="date">{date}</span>
      </div>

      <p>{note.content}</p>

      <div className="note-actions">
        <button onClick={() => setEditNote(note)} className="edit-btn">
          ✏️ Edit
        </button>

        <button onClick={() => deleteNote(note._id)} className="delete-btn">
          🗑️ Want to Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;