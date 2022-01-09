import React from 'react';
import logo from './logo.svg';
import './cell.css';

interface Props {
  active: boolean,
  onMouseMove: React.MouseEventHandler<HTMLDivElement>
}

export const Cell : React.FC<Props> = ({ active, onMouseMove }) => {
  return (
    <div 
		className={ active ? 'gol__cell gol__cell--active' : 'gol__cell' }
		onMouseMove={ onMouseMove }
		onClick={ onMouseMove }>
    </div>
  );
}



export default Cell;
