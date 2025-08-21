import React, { useState } from 'react';

const priorities = ['low','medium','high'];

export default function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [priority, setPrio] = useState('medium');
  const [dueDate, setDue] = useState(''); 

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), description, priority, dueDate });
    setTitle(''); setDesc(''); setPrio('medium'); setDue('');
  };

  return (
    <form className="form" onSubmit={submit}>
      <label>Title
        <input value={title} onChange={(e)=>setTitle(e.target.value)} required />
      </label>
      <label>Description
        <textarea value={description} onChange={(e)=>setDesc(e.target.value)} />
      </label>
      <div className="grid-2">
        <label>Priority
          <select value={priority} onChange={(e)=>setPrio(e.target.value)}>
            {priorities.map(p=><option key={p} value={p}>{p}</option>)}
          </select>
        </label>
        <label>Due date
          <input type="date" value={dueDate} onChange={(e)=>setDue(e.target.value)} />
        </label>
      </div>
      <button type="submit" className="btn">Add Task</button>
    </form>
  );
}
