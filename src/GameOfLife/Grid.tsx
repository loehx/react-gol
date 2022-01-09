import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './grid.css';
import Cell from './Cell';

interface Props {
  rows: boolean[][],
  cellClicked: (x: number, y: number) => void
}

interface State {
  clickActive: boolean
}

export const Grid : React.FC<Props> = ({ rows, cellClicked }) => {

  const [state, setState] = useState<State>({ clickActive: false })
  let setClickActive = (e : MouseEvent) => setState({ clickActive: e.button === 0 });
  let setClickInactive = (e : MouseEvent) => setState({ clickActive: state.clickActive && e.button === 0 })

  useEffect(() => {
    document.addEventListener('mousedown', setClickActive);
    document.addEventListener('mouseup', setClickInactive);
    return () => {
      document.removeEventListener('mousedown', setClickActive);
      document.removeEventListener('mouseup', setClickInactive);
    }
  }, [])

  return (
    <div className="gol__grid">
      { rows.map((row, y) => (
        <div key={ 'y' + y } className="gol__row">
          { row.map((active, x) => ( 
            <Cell key={ y + '-' + x } active={ active } onMouseMove={ () => state.clickActive && cellClicked(x, y) }></Cell>
          )) }
        </div>
      ))}
    </div>
  );
}

export default Grid;
