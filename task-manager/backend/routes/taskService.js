const { z } = require('zod');
const { TaskShceme } = require('./taskShceme'); 
const Priority = z.enum(['low','medium','high']);

const TaskCreate = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  priority: Priority,
});

const TaskUpdate = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  priority: Priority.optional(),
  completed: z.boolean().optional(),
});

const IdParams = z.object({ id: z.string().min(1) });

const TaskService = {
  init() { TaskShceme.seed(); },

  list() { return TaskShceme.list(); },

  // שם יותר קריא; משאיר גם getByid כדי לא לשבור קריאות קיימות
  getOrThrow(id) {
    const t = TaskShceme.get(id);
    if (!t) {
      const err = new Error('Task not found');
      err.status = 404;
      throw err;
    }
    return t;
  },

  // תאימות לאחור (אם יש מקומות שקוראים לשם הישן)
  getByid(id) { return this.getOrThrow(id); },

  create(data) { return TaskShceme.create(data); },

  update(id, patch) {
    const t = TaskShceme.update(id, patch);
    if (!t) {
      const err = new Error('Task not found');
      err.status = 404;
      throw err;
    }
    return t;
  },

  remove(id) {
    const ok = TaskShceme.remove(id);
    if (!ok) {
      const err = new Error('Task not found');
      err.status = 404;
      throw err;
    }
  },

  toggle(id) {
    const t = TaskShceme.toggle(id);
    if (!t) {
      const err = new Error('Task not found');
      err.status = 404;
      throw err;
    }
    return t;
  },

  list(q){ return TaskShceme.list(q); } // ושם להפעיל sortAndFilter
,
  generate(count) { return TaskShceme.generate(count); },

  schemas: { TaskCreate, TaskUpdate, IdParams }
};

module.exports = { TaskService };
