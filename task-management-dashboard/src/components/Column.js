import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const Column = ({ title, tasks, droppableId }) => {
  console.log(title, droppableId)
  const columnClass = droppableId === 'To Do' ? 'column-to-do' :
  droppableId === 'In Progress' ? 'column-in-progress' :
  'column-done';
  return (
    <div className={`column ${columnClass}`}>
      <h2 className='column-title'>{title}</h2>
      <Droppable droppableId={droppableId}>
        {(dropData) => (
          <div
            className="task-list"
            ref={dropData.innerRef}
            {...dropData.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {dropData.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;