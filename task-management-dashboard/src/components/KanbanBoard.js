import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import NewTaskForm from './NewTaskForm';

const API_URL = 'http://localhost:3001/tasks';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    userId: 1,
    status: 'To Do'
  });


  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = async () => {
    try {
      const resp = await fetch(API_URL);
      const data = await resp.json();
      
      const listOfMappedTask = data.map(task => ({
        ...task,
        status: task.status || (task.completed ? 'Done' : 'To Do')
      }));
      console.log('Tasks:', listOfMappedTask);
      setTasks(listOfMappedTask);
    } catch (error) {
      console.error('Error :', error);
    }
  };


  const handleAddTask = async () => {
    if (!newTask.title) return alert('Title is required');
    const saveFilledTask = {
      title: newTask.title,
      description: newTask.description,
      userId: newTask.userId,
      completed: newTask.status === 'Done'
    };
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saveFilledTask),
      });
      const savedTask = await response.json();
      setTasks([...tasks, { ...savedTask, status: newTask.status }]);
      setNewTask({ title: '', description: '', userId: 1, status: 'To Do' });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };


  const onDragEnd = (result) => {
    const { destination } = result;
    if (!destination) return;
    const NewupdatedTasks = [...tasks];

    const movedTaskIndex = NewupdatedTasks.findIndex(task => task.id.toString() === result.draggableId);
    if (movedTaskIndex === -1) {
      console.error('Moved task not found:', result.draggableId);
      return;
    }


    const [movedTask] = NewupdatedTasks.splice(movedTaskIndex, 1);

  
    movedTask.status = destination.droppableId;
    movedTask.completed = destination.droppableId === 'Done';


    NewupdatedTasks.splice(destination.index, 0, movedTask);

    const taskIds = NewupdatedTasks.map(task => task.id);
    const uniqueTaskIds = new Set(taskIds);
    if (taskIds.length !== uniqueTaskIds.size) {
      console.error('Duplicate task IDs :', taskIds);
      return;
    }

    console.log('Dragging task:', movedTask);
    console.log('Updated tasks:', NewupdatedTasks);


    setTasks(NewupdatedTasks);


    const taskToUpdate = {
      title: movedTask.title,
      description: movedTask.description,
      userId: movedTask.userId,
      completed: movedTask.completed
    };
    fetch(`${API_URL}/${movedTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskToUpdate),
    }).catch(error => {
      console.error('Error updating task:', error);
    });
  };


  const columns = {
    'To Do': tasks.filter(task => task.status === 'To Do'),
    'In Progress': tasks.filter(task => task.status === 'In Progress'),
    'Done': tasks.filter(task => task.status === 'Done')
  };


  console.log('Columns:', columns);

  return (
    <div className="kanban-board">
      <h1 >Task Management Dashboard</h1>
      <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>
        Add New Task
      </button>
      <NewTaskForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
        newTask={newTask}
        setNewTask={setNewTask}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns">
          {Object.entries(columns).map(([status, tasks]) => (
            <Column
              key={status}
              title={status}
              tasks={tasks}
              droppableId={status}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;