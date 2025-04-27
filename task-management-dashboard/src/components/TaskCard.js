import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TaskCard = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(dropData) => (
        <div
          className="task-card"
          ref={dropData.innerRef}
          {...dropData.draggableProps}
          {...dropData.dragHandleProps}
        >
          <h4>{task.title}</h4>
          <p>{task.description || 'No description'}</p>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;