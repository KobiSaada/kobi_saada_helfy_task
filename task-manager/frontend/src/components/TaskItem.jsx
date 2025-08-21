import React, { useState } from 'react';

export default function TaskItem({ task, onUpdate, onDelete, onToggle }) {
  const [editing, setEdit] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [desc,  setDesc]  = useState(task.description || '');
  const [prio,  setPrio]  = useState(task.priority);

  const save = async () => {
    if (!title.trim()) return;
    await onUpdate(task.id, { title: title.trim(), description: desc, priority: prio });
    setEdit(false);
  };

  const onDragStart = (e) => {
    e.dataTransfer.setData('text/plain', String(task.id));
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`card priority-${task.priority} ${task.completed ? 'done' : ''}`}
      draggable
      onDragStart={onDragStart}
    >
      <div className="card-header">
        <div className="title-row">
          <h3>{task.title}</h3>
          <span className={`prio-pill prio-${task.priority}`}>{task.priority}</span>
        </div>
      </div>

      <p className="desc">{task.description}</p>

      <div className="meta">
        <span className="created">Created: {new Date(task.createdAt).toLocaleDateString()}</span>
        <span className={`status-pill ${task.completed ? 'ok' : 'pending'}`}>
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </div>

      {!editing ? (
        <div className="actions">
          <button onClick={() => onToggle(task.id)}>{task.completed ? 'Mark Pending' : 'Complete'}</button>
          <button onClick={() => setEdit(true)}>Edit</button>
          <button className="danger" onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      ) : (
        <>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} />
          <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} />
          <div className="grid-2">
            <select value={prio} onChange={(e)=>setPrio(e.target.value)}>
              {['low','medium','high'].map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="actions">
            <button onClick={save}>Save</button>
            <button onClick={()=>setEdit(false)}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}
