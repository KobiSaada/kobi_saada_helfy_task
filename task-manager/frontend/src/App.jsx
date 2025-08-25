import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { api } from './services/api';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './styles/index.css';


const getThemeVars = (mode) => ({
  '--bg':          mode === 'light' ? '#ffffff' : '#0a0f1a',
  '--panel':       mode === 'light' ? '#f8fafc' : '#0f172a',
  '--text':        mode === 'light' ? '#0b1020' : '#e5e7eb',
  '--muted':       mode === 'light' ? '#475569' : '#9aa5b1',
  '--accent':      '#10b981',
  '--border':      mode === 'light' ? '#d7dee6' : '#1f2937',
  '--danger':      '#ef4444',
  '--prio-low':    '#10b981',
  '--prio-medium': '#f59e0b',
  '--prio-high':   '#ef4444',
});

function App() {
  const [mode, setMode] = useState('light');
  const [trashOver, setTrashOver] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  
  const themeVars = useMemo(() => getThemeVars(mode), [mode]);
  useEffect(() => { Object.entries(themeVars).forEach(([k,v]) => document.documentElement.style.setProperty(k,v)); }, [themeVars]);
  const toggleTheme = () => setMode(p => p === 'light' ? 'dark' : 'light');

  // Data
  const [tasks, setTasks] = useState([]);
  const [loading, setLoad] = useState(false);
  const [err, setErr] = useState('');

  const load = async (params={}) => {
    try { setLoad(true); setErr(''); setTasks(await api.list(params)); }
    catch { setErr('Failed to load tasks'); }
    finally { setLoad(false); }
  };
  useEffect(()=>{ load(); }, []);

  const refresh = async () => load({ q: search.trim() });
  const onCreate = async (payload) => { await api.create(payload); await refresh(); };
  const onUpdate = async (id, patch) => { await api.update(id, patch); await refresh(); };
  const onDelete = async (id) => { await api.remove(id); await refresh(); };
  const onToggle = async (id) => { await api.toggle(id); await refresh(); };



  // Stats
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  // Trash handlers
  const onTrashDragOver = (e) => { e.preventDefault(); setTrashOver(true); };
  const onTrashDragLeave = () => setTrashOver(false);
  const onTrashDrop = async (e) => {
    e.preventDefault(); setTrashOver(false);
    const id = e.dataTransfer.getData('text/plain');
    if (id) await onDelete(id);
  };
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter(t =>
      (t.title||'').toLowerCase().includes(q) ||
      (t.description||'').toLowerCase().includes(q)
    );
  }, [tasks, search]);
  
  // Search submit
  const onSearch = (e) => { e.preventDefault(); load({ q: search.trim() }); };

  return (
    <div className="page">
      {/* Trash bottom-left */}
      <div className={`trash ${trashOver ? 'over' : ''}`} onDragOver={onTrashDragOver} onDragLeave={onTrashDragLeave} onDrop={onTrashDrop} title="גרור לכאן למחיקה">🗑</div>

 
      <div className="add-task-btn" onClick={()=>setShowForm(true)} title="Add Task / הוספת משימה">➕</div>

      <header className="header">
        <div className="brand">
          <img className="brand-logo" src="/helfy_icon.jpeg" alt="logo" />
          <h1>Task Manager</h1>
        </div>
        <div className="controls">
          <button className="btn outline" onClick={toggleTheme}>{mode === 'light' ? 'Dark Mode' : 'Light Mode'}</button>
      
        </div>
      </header>

      {/* Search */}
      <form className="searchbar" onSubmit={onSearch}>
        <input placeholder="Search tasks…" value={search} onChange={e=>setSearch(e.target.value)} />
        <button className="btn outline" type="submit">Search</button>
      </form>

      {/* Stats */}
      <div className="stats">
        <div className="stat"><span className="icon">≡</span><div><strong>{total}</strong><small>Total</small></div></div>
        <div className="stat"><span className="icon ok">✓</span><div><strong>{completed}</strong><small>Completed</small></div></div>
        <div className="stat"><span className="icon pend">⧗</span><div><strong>{pending}</strong><small>Pending</small></div></div>
      </div>

      <main className="main only-main">
        {loading && <div className="hint">Loading…</div>}
        {err && <div className="error">{err}</div>}
        {!loading && tasks.length === 0 && <div className="empty">אין משימות זמינות</div>}
        {tasks.length > 0 && (
          <TaskList tasks={filtered} onUpdate={onUpdate} onDelete={onDelete} onToggle={onToggle} />
        )}
      </main>

 {showForm && (
  <div className="modal">
    <div className="modal-card">
      <div className="modal-head">
        <h2>Add New Task</h2>
        <button className="icon-btn" onClick={() => setShowForm(false)}>✖</button>
      </div>
      <div className="modal-body">
        <TaskForm
          onSubmit={async (data) => {
            await onCreate(data);
            setShowForm(false);
          }}
        />
      </div>
      <div className="modal-foot">
        <button className="btn outline" onClick={() => setShowForm(false)}>Cancel</button>
      </div>
    </div>
  </div>
)}


    </div>
  );
}

const rootEl = document.getElementById('root');
createRoot(rootEl).render(<React.StrictMode><App /></React.StrictMode>);
export default App;
