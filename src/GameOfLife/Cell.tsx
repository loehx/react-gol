import React, { useEffect, useRef } from 'react';
import './cell.css';

interface Props {
  active: boolean,
  onMouseMove: React.MouseEventHandler<HTMLDivElement>
}

export const Cell : React.FC<Props> = ({ active, onMouseMove }) => {
  const activeCount = useRef(0);

  useEffect(() => {
    activeCount.current = activeCount.current + (active ? 20 : 0);
  }, [active])

  const rgbCode = getHeatRgb(activeCount.current).join(',');

  return (
    <div 
      className={ active ? 'gol__cell gol__cell--active' : 'gol__cell' }
      onMouseMove={ onMouseMove }
      onClick={ onMouseMove }
      style={ { backgroundColor: `rgb(${rgbCode})` } }>
    </div>
  );
}

function getHeatRgb(n: number): Array<number> {
  return minMaxColors([ n - 100, n - 200, Math.min(150, n) ])
}

function minMaxColors(nArray: number[]): number[] {
  return nArray.map(n => Math.min(Math.max(0, n), 255));
}

export default Cell;
