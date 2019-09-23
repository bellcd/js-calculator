import React from 'react';

let Button = ({icon, onButtonPress}) => {
  return (
    <div onClick={(e) => onButtonPress(e)}>{icon}</div>
  );
}

export default Button;