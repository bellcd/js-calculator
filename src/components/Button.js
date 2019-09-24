import React from 'react';

let Button = ({icon, onButtonPress}) => {
  return (
    <div className="keypad-button" onClick={(e) => onButtonPress(e)}>{icon}</div>
  );
}

export default Button;