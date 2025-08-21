
let nextId = 1;
const tasks = [];// In-memory repository for this task

const TaskShceme = {
  seed() {
    if (tasks.length) return;
    ['high','medium','low'].forEach((p, i) => {
      const now = new Date().toISOString();
      tasks.push({
        id: nextId++,
        title: `Task #${i+1}`,
        description: `Demo ${i+1}`,
        completed: false,
        createdAt: now,
        priority: p,
      });
    });
  },

  list() {
    // מחזיר את כל המשימות; הסינון (All/Completed/Pending) נעשה ב־frontend
    return [...tasks];
  },

  get(id) {
    const nid = Number(id);
    return tasks.find(t => t.id === nid);
  },

  create(data) {
    const now = new Date().toISOString();
    const task = {
      id: nextId++,
      title: data.title,
      description: data.description || '',
      completed: false,     // defualt
      createdAt: now,
      priority: data.priority,
    };
    tasks.push(task);
    return task;
  },

  update(id, patch) {
    const nid = Number(id);
    const t = tasks.find(x => x.id === nid);
    if (!t) return null;

    if (patch.title !== undefined) t.title = patch.title;
    if (patch.description !== undefined) t.description = patch.description;
    if (patch.priority !== undefined) t.priority = patch.priority;
    if (patch.completed !== undefined) t.completed = !!patch.completed;

    return t;
  },

  remove(id) {
    const nid = Number(id);
    const i = tasks.findIndex(t => t.id === nid);
    if (i === -1) return false;
    tasks.splice(i, 1);
    return true;
  },
generate(count = 5) {
  const now = new Date().toISOString();
  const prios = ['low', 'medium', 'high'];
  const newTasks = [];
  for (let i = 0; i < count; i++) {
    const task = {
      id: nextId++,
      title: `Generated Task #${i + 1}`,
      description: `This is a generated task ${i + 1}`,
      completed: false,
      createdAt: now,
      priority: prios[Math.floor(Math.random() * prios.length)],
    };
    tasks.push(task);
    newTasks.push(task);
  }
  return newTasks;
},

  toggle(id) {
    const nid = Number(id);
    const t = tasks.find(x => x.id === nid);
    if (!t) return null;
    t.completed = !t.completed;
    return t;
  },
};

module.exports = { TaskShceme };
