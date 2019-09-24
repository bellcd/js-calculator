import React from 'react';

let Display = ({display, previousCommand}) => {
  return (
    <div className="display-container">
      <div className="display">{display}</div>
      <div className="previous-command">{previousCommand}</div>
    </div>
  );
}

export default Display;