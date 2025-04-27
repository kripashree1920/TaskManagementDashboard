# Task Management Dashboard (React.js)

## Overview

This project is a **Task Management Dashboard** built using **React.js**.  
A responsive Kanban-style task management dashboard built with React, using json-server for a mock API and react-beautiful-dnd for drag-and-drop functionality.
Features

Users can:
- View tasks categorized into To Do, In Progress, and Done
- Add new tasks via a modal form
- Drag and drop tasks between columns to update their status
- Persist tasks using a mock REST API

---

## Features
- 3-column Kanban board: To Do, In Progress, Done
- Add New Task with title, description and status
- Drag & Drop functionality between columns (using `react-beautiful-dnd`)
- API Integration using **Fetch API**
- Fully responsive design for mobile and desktop screens

---

## Technologies Used
- React.js
- Fetch API
- React Modal
- React Beautiful DnD
- CSS Flexbox (for responsiveness)

---

## API Details
`Install Dependencies`
npm install -g json-server

- Start json-server:Place the db.json file in the project root and run:
- json-server --watch db.json --port 3001

---

## Running the Project Locally

1. Clone the repository:

```bash
git clone https://github.com/kripashree1920/TaskManagementDashboard.git
cd task-management-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Start the application:

```bash
npm start
```

The app will open at [http://localhost:3000]

---

## Folder Structure

src/
├── components/
   ── KanbanBoard.js
   ── Column.js
   ── TaskCard.js
   ── NewTaskForm.js

├── App.js

├── App.css

|── index.js

|__ db.json

---

## Architecture
- Components:
- App: Entry point linking all components.
- KanbanBoard: Manages tasks, drag-and-drop, and renders columns.
- Column: Renders a single column with tasks.
- TaskCard: Displays an individual task.
- NewTaskForm: Modal form for adding new tasks.
- API: Uses json-server to simulate a REST API with endpoints for GET, POST, and PUT operations.
- Styling: Custom CSS in App.css for a responsive and clean UI.
- Drag-and-Drop: Implemented using react-beautiful-dnd.

## Future Improvements
- Implement a real backend (Node.js, Firebase, etc.) to persist tasks
- Add search and filter functionality
- Add task priorities and deadlines
- Add loading indicators and notifications (success/error toasts)

---


