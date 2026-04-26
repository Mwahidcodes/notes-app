import React, { useState, useEffect } from 'react';

function NoteForm({ addNote, editNote, updateNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content);
    }
  }, [editNote]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) return alert('Please fill all fields!');

    if (editNote) {
      updateNote(editNote._id, { title, content });
    } else {
      addNote({ title, content });
    }

    setTitle('');
    setContent('');
  };

  return (
    <div className="note-form">
      <h2>{editNote ? '✏️ Edit Note' : '➕ Add Note'}</h2>

      <input
        type="text"
        placeholder="Note Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
      />

      <button onClick={handleSubmit}>
        {editNote ? 'Update Note' : 'Add Note'}
      </button>
    </div>
  );
}

export default NoteForm;