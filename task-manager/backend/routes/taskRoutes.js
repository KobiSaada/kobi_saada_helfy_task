const express = require('express');
const router = express.Router();

const { TaskService } = require('../services/taskService'); // ודא נתיב נכון
const { validateBody, validateParams } = require('../middleware/validate');

// Init once
TaskService.init();

/**
 * Endpoints:
 * GET    /api/tasks
 * GET    /api/tasks/:id
 * POST   /api/tasks
 * PUT    /api/tasks/:id
 * DELETE /api/tasks/:id
 * PATCH  /api/tasks/:id/toggle
 * POST   /api/generate?count=5
 */

router.get('/tasks', (req, res, next) => {
  try {
    const data = TaskService.list();
    res.json(data);
  } catch (e) { next(e); }
});

router.get('/tasks/:id',
  validateParams(TaskService.schemas.IdParams),
  (req, res, next) => {
    try {
      const t = TaskService.getOrThrow(req.params.id); // ← תוקן
      res.json(t);
    } catch (e) { next(e); }
  }
);

router.post('/tasks',
  validateBody(TaskService.schemas.TaskCreate),
  (req, res, next) => {
    try {
      const t = TaskService.create(req.body);
      res.status(201).json(t);
    } catch (e) { next(e); }
  }
);

router.put('/tasks/:id',
  validateParams(TaskService.schemas.IdParams),
  validateBody(TaskService.schemas.TaskUpdate),
  (req, res, next) => {
    try {
      const t = TaskService.update(req.params.id, req.body);
      res.json(t);
    } catch (e) { next(e); }
  }
);

router.delete('/tasks/:id',
  validateParams(TaskService.schemas.IdParams),
  (req, res, next) => {
    try {
      TaskService.remove(req.params.id);
      res.status(204).end();
    } catch (e) { next(e); }
  }
);
router.get('/tasks', (req,res,next)=>{
  try { res.json(TaskService.list(req.query)); }
  catch(e){ next(e); }
});


router.post('/generate', (req, res, next) => {
  try {
    const count = parseInt(req.query.count, 10) || 5;
    const newTasks = TaskService.generate(count); // ← תוקן
    res.status(201).json({
      message: `${newTasks.length} tasks generated successfully`,
      tasks: newTasks
    });
  } catch (e) { next(e); }
});

router.patch('/tasks/:id/toggle',
  validateParams(TaskService.schemas.IdParams),
  (req, res, next) => {
    try {
      const t = TaskService.toggle(req.params.id);
      res.json(t);
    } catch (e) { next(e); }
  }
);

module.exports = router;
