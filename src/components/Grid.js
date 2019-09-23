import React from 'react';
import Button from './Button.js';

let Grid = ({onButtonPress}) => {
  let icons = ['clear', '%', '+/-', '/', 7, 8, 9, 'x', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', 'delete', '='];
  let buttonElements = icons.map((number) => {
    return <Button
      icon={number}
      key={number}
      onButtonPress={onButtonPress}
    />
  });
  return (
    <div className="grid">
      {buttonElements}
    </div>
  );
}

export default Grid;