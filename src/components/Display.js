import React from 'react';

let Display = ({display, previousCommand}) => {
  return (
    <div className="display">
      <div>{display}</div>
      <div>{previousCommand}</div>
    </div>
  );
}

export default Display;