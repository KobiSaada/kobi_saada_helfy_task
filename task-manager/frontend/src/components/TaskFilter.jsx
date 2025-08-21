import React from 'react';

export default function TaskFilter({ value, onChange }) {
  return (
    <div className="filters">
      {['all','pending','completed'].map(v => (
        <button
          key={v}
          className={value === v ? 'chip active' : 'chip'}
          onClick={() => onChange(v)}
        >
          {v[0].toUpperCase() + v.slice(1)}
        </button>
      ))}
    </div>
  );
}
