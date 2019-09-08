import React from 'react';

const Course = ({ parts, name }) => {
  const partRows = () => parts.map(part => 
    <p key={part.id}>{part.name} {part.exercises}</p>);

  const exercises = parts.map(part => part.exercises);

  const exerciseTotal = exercises.reduce((a, c) => a+c);

    return (
      <div>
        <h2>{name}</h2>
        {partRows()}
        Exercise Total: {exerciseTotal}
      </div>
    )
}

export default Course;