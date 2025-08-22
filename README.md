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

<img width="1256" height="617" alt="Screen Shot 2025-08-21 at 19 21 01" src="https://github.com/user-attachments/assets/5de6a0f4-cfc6-4a22-869f-c568b329a1a0" />

---


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
- Axios (for API calls)

---

## Getting Started

Follow these steps to **clone and run** the project locally:

```
# 1) Clone
git clone https://github.com/KobiSaada/kobi_saada_helfy_task.git
cd task-manager

# 2) Backend
cd backend
npm install
npm run dev     
# or: npm start

# 3) Frontend (new terminal)
cd frontend
npm install
npm run dev    
-----------
```
### Folder Structure

  ```
task-manager/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── routes/
│   └── middleware/
├── frontend/
│   ├── package.json
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.js
├── .gitignore
└── README.md

 
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
