// src/components/TaskList.jsx
import React, { useEffect, useRef } from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onUpdate, onDelete, onToggle }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const animRef = useRef({ running: true });

  // סדר כרונולוגי יורד
  const ordered = tasks.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // לולאה אינסופית: מכפילים פעם אחת בלבד (לא פי 3)
  const looped = ordered.length ? [...ordered, ...ordered] : [];

  useEffect(() => {
    if (!trackRef.current || ordered.length === 0) return;
    const track = trackRef.current;
    const card = track.querySelector('.card');
    const w = card ? card.offsetWidth : 300;
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 16);
    const itemWidth = w + gap;

    let x = 0;
    const speed = 0.5;
    let raf;

    const step = () => {
      if (animRef.current.running) {
        x -= speed;
        track.style.transform = `translateX(${x}px)`;
        // כשעברנו אורך של רשימה אחת — חוזרים להתחלה
        const resetAfter = itemWidth * ordered.length;
        if (Math.abs(x) >= resetAfter) {
          track.style.transition = 'none';
          x = 0;
          track.style.transform = `translateX(${x}px)`;
          requestAnimationFrame(() => {
            track.style.transition = 'transform .2s linear';
          });
        }
      }
      raf = requestAnimationFrame(step);
    };

    track.style.transition = 'transform .2s linear';
    raf = requestAnimationFrame(step);

    const vp = viewportRef.current;
    const stop = () => (animRef.current.running = false);
    const start = () => (animRef.current.running = true);
    vp.addEventListener('mouseenter', stop);
    vp.addEventListener('mouseleave', start);

    return () => {
      cancelAnimationFrame(raf);
      vp.removeEventListener('mouseenter', stop);
      vp.removeEventListener('mouseleave', start);
    };
  }, [ordered]);

  if (!ordered.length) return null;

  return (
    <div className="carousel-viewport" ref={viewportRef}>
      <div className="carousel-track" ref={trackRef}>
        {looped.map((t, idx) => (
          <TaskItem
            key={`${t.id}-${idx}`}
            task={t}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}
