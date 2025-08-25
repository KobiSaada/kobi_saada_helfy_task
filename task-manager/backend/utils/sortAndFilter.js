const priorityValue = (p) => ({ low: 1, medium: 2, high: 3 })[p] || 0;

exports.sortAndFilter = (tasks, query = {}) => {
  const {
    q, search,
    status,             // 'pending' | 'completed'
    priority,           // 'low' | 'medium' | 'high'
    sort = 'createdAt',
    order = 'desc',
  } = query;

  const text = (q ?? search ?? '').toString().trim().toLowerCase();

  const statusToCompleted = (s) => {
    if (!s) return undefined;
    if (s === 'pending') return false;
    if (s === 'completed') return true;
    return undefined; // ערך לא מוכר → מתעלמים
  };
  const completedFilter = statusToCompleted(status);

  let items = tasks.filter((t) => {
    const byText =
      !text ||
      (t.title || '').toLowerCase().includes(text) ||
      (t.description || '').toLowerCase().includes(text);

    const byStatus =
      completedFilter === undefined ? true : t.completed === completedFilter;

    const byPriority = !priority || t.priority === priority;

    return byText && byStatus && byPriority;
  });

  items.sort((a, b) => {
    let cmp = 0;
    if (sort === 'createdAt') cmp = new Date(a.createdAt) - new Date(b.createdAt);
    else if (sort === 'priority') cmp = priorityValue(a.priority) - priorityValue(b.priority);
    else if (sort === 'title') cmp = (a.title || '').localeCompare(b.title || '');
    return order === 'asc' ? cmp : -cmp;
  });

  return { items, total: items.length };
};
