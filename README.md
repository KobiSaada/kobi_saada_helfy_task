# kobi_saada_helfy_task
TaskManagment app for helfy
# Task Management App <img src="https://github.com/user-attachments/assets/7c944f2b-c9df-4204-a550-3b9076b67042" alt="helfy_icon" width="40" style="vertical-align: middle; margin-left: 8px;" />

A modern full-stack **Task Management** application.  
**Frontend:** React (Vite) with **plain CSS** only (per challenge rules).  
**Backend:** Node.js + Express + Zod, with **in-memory** data storage.  
Clean dashboard with **table & endless-carousel views**, filters, stats, dialogs for create/edit, and strict server-side validation.

> **Important:** According to the challenge guidelines, the UI uses **regular CSS only** (no CSS frameworks, preprocessors, or CSS-in-JS).

---

## Screenshots


---


---

## Architecture

**Backend (Express)**
- **routes/** – Maps REST endpoints.
- **controllers/** – HTTP orchestration (parse, delegate to service, respond).
- **services/** – Business logic (toggle, validation, errors).
- **repositories/** – In-memory data access (array store).
- **models/** – Zod schemas & enums for validation.
- **middleware/** – Validation (Zod) & error handling.
- **utils/** – Helpers (ids, sorting/filtering).

**Frontend (React + CSS)**
- **components/** –  
  `TaskList` (endless carousel), `TaskItem`, `TaskForm`, `TaskFilter`.
- **services/** – `api.js` (HTTP calls).
- **styles/** – **plain CSS** only (no frameworks).

**Principles**
- Clear separation of concerns.
- Server-side validation (Zod).
- RESTful design & meaningful HTTP codes.
- Smooth, performant **endless carousel** (vanilla React; no carousel libs).
- Responsive, accessible UI with simple CSS.

---

## Tech Stack

**Backend**
- Node.js, Express
- Zod (validation)
- cors, morgan

**Frontend**
- React, Vite
- **Plain CSS** (no frameworks)
- Fetch/Axios (for API calls)

---

## Getting Started

Follow these steps to **clone and run** the project locally:

```
# 1) Clone
git clone https://github.com/KobiSaada/kobi_saada_helfy_task.git
cd TaskManagementApp

# 2) Backend
cd backend
npm install
npm run dev     
# or: npm start

# 3) Frontend (new terminal)
cd frontend
npm install
npm run dev    
# If using CRA instead: npm start 
-----------
```
### Folder Structure

  ```TaskManagementApp/
  ├─ backend/
  │  ├─ package.json
  │  └─ src/
  │     ├─ server.js
  │     ├─ app.js                # Express wiring (CORS, JSON, routes, errors)
  │     ├─ routes/
  │     │  └─ taskRoutes.js      # CRUD + toggle
  │     ├─ controllers/
  │     │  └─ taskController.js
  │     ├─ services/
  │     │  └─ taskService.js     # Business logic
  │     ├─ repositories/
  │     │  └─ taskRepo.js        # In-memory store
  │     ├─ models/
  │     │  └─ taskModel.js       # Zod schemas
  │     ├─ middleware/
  │     │  └─ validate.js        # Input validation (Zod)
  │     └─ utils/
  │        ├─ id.js              # IDs
  │        └─ sortAndFilter.js   # Search/filter helpers
  │
  ├─ frontend/
  │  ├─ package.json
  │  ├─ public/
  │  └─ src/
  │     ├─ components/
  │     │  ├─ TaskList.jsx       # Endless carousel
  │     │  ├─ TaskItem.jsx
  │     │  ├─ TaskForm.jsx
  │     │  └─ TaskFilter.jsx
  │     ├─ services/
  │     │  └─ api.js
  │     ├─ styles/
  │     │  └─ app.css
  │     └─ App.jsx
  │
  └─ README.md
```  

-----------
# Task Model


{
  id: number,
  title: string,
  description: string,
  completed: boolean,
  createdAt: Date,
  priority: 'low' | 'medium' | 'high'
}

-----------

## API Endpoints

GET /api/tasks

POST /api/tasks

PUT /api/tasks/:id

DELETE /api/tasks/:id

PATCH /api/tasks/:id/toggle

-----------

## Time Spent

~(20 m) — Planning: contracts, API, UX

~(55 m) — Backend: Express setup, routes, validation, repo/service layers

~(45 m) — Frontend scaffold: React, state, app shell

~(40 m) — CRUD integration: hooks, API client, data flow

~(40 m) — UI polish: table, endless carousel, filters, badges

~(20 m) — Verification: curl/Postman, error handling

~(20 m) — README & screenshots
