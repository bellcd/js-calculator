import React from 'react';
import Button from './Button.js';

let Grid = () => {
  let icons = ['clear', '%', '+/-', '/', 7, 8, 9, 'x', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', 'delete', '='];
  let buttonElements = icons.map((number) => <Button icon={number} key={number}/>);
  return (
    <div class="grid">
      {buttonElements}
    </div>
  );
}

export default Grid;