import React, { useEffect, useState, useRef } from 'react';
import './grid.css';
import Cell from './Cell';

interface Props {
  rows: boolean[][],
  cellClicked: (x: number, y: number) => void
}

export const Grid : React.FC<Props> = ({ rows, cellClicked }) => {

  const clickActiveRef = useRef(false);

  useEffect(() => {
    let onMouseDown = (e : MouseEvent) => {
      if (e.button === 0) clickActiveRef.current = true;
    }
    let onMouseUp = (e : MouseEvent) => {
      if (e.button === 0) clickActiveRef.current = false;
    };

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    }
  }, [])
  
  return (
    <div className="gol__grid">
      { rows.map((row, y) => (
        <div key={ 'y' + y } className="gol__row">
          { row.map((active, x) => ( 
            <Cell key={ x } active={ active } onMouseMove={ () => clickActiveRef.current && cellClicked(x, y) }></Cell>
          )) }
        </div>
      ))}
    </div>
  );
}

export default Grid;
