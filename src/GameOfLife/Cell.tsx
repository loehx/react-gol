import React, { useEffect, useState, useRef } from 'react';
import logo from './logo.svg';
import './cell.css';

interface Props {
  active: boolean,
  onMouseMove: React.MouseEventHandler<HTMLDivElement>
}

export const Cell : React.FC<Props> = ({ active, onMouseMove }) => {
  const activeCount = useRef(0);

  useEffect(() => {
    activeCount.current = Math.min(510, activeCount.current + (active ? 50 : 0));
  }, [active])

  return (
    <div 
      className={ active ? 'gol__cell gol__cell--active' : 'gol__cell' }
      onMouseMove={ onMouseMove }
      onClick={ onMouseMove }
      style={ { backgroundColor: active ? undefined : `rgb(${activeCount.current - 100},${activeCount.current - 200},${Math.min(150, activeCount.current - 0)})` } }>
    </div>
  );
}



export default Cell;
