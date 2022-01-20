import { FC, useEffect, useState, useRef } from 'react';
import { doLifecycle, generateGrid, randomSpawn } from './core';
import { FaPlay, FaStop, FaPlus, FaMinus, FaForward, FaTrash, FaRandom } from 'react-icons/fa';
import { PatternLoader } from './PatternLoader';
import Grid from './Grid';
import './gol.css';

export const GameOfLife : FC = () => {

	const [fps, setFps] = useState<number>(5)
	const [size, setSize] = useState<number>(50)
	const [cleared, setCleared] = useState<number>(0)
	const [grid, setGrid] = useState<boolean[][]>(generateGrid(size));
	const gridRef = useRef(grid);
	const [intervalId, setIntervalId] = useState<NodeJS.Timer|null>(null); 

	const run = () => setGrid(doLifecycle(gridRef.current));

	const start = () => {
		setIntervalId(setInterval(() => run(), 1000 / fps));
	}

	const stop = () => {
		if (intervalId) {
			clearInterval(intervalId);
			setIntervalId(null);
		}
	}

	const clear = () => {
		setCleared(cleared + 1);
		setGrid(generateGrid(size));
	}

	useEffect(() => {
		gridRef.current = grid;
		if (grid.length !== size) {
			setSize(grid.length)
		}
	}, [grid])

	const resize = (amount: number) => {
		const newSize = Math.max(5, size + amount);
		setSize(newSize);
		setCleared(cleared + 1);
		setGrid(generateGrid(newSize, gridRef.current));
	};

	useEffect(() => {
		if (intervalId) {
			stop();
			start();
		}
	}, [fps])


  return (
    <div className="gol">
	  <div className="gol__grid-wrapper">
      	<Grid key={ 'grid-' + cleared } rows={ grid } cellClicked={ (x,y) => setGrid(updateCell(grid, x, y)) }></Grid>
	  </div>

	  <div className="gol__control-bar">
	  	<div className="gol__control-bar__panel">
			{ !intervalId && <button onClick={ start } title="Start"><FaPlay /></button> }
			{ !!intervalId && <button onClick={ stop } title="Stop"><FaStop /></button> }
			<button onClick={ () => run() } title="Single lifecycle"><FaForward /></button>
			<button onClick={ () => clear() } title="Clear"><FaTrash /></button>
			<button onClick={ () => setGrid(randomSpawn(grid)) } title="Shuffle"><FaRandom /></button>

		</div>
		<div className="gol__control-bar__panel">
			<PatternLoader onPatternLoaded={ (newGrid) => setGrid(newGrid) } currentGrid={ grid } />
		</div>

		<div className="gol__control-bar__panel">
			<button onClick={ () => resize(+10) } title="Increase grid size"><FaPlus /></button>
			{ size }x{ size }
			<button onClick={ () => resize(-10) } title="Decrease grid size"><FaMinus /></button>
		</div>

		<div className="gol__control-bar__panel">
			<button onClick={ () => setFps(fps + 1) } title="Speed up"><FaPlus /></button>
			{ fps } fps
			<button onClick={ () => setFps(Math.max(1, fps - 1)) } title="Slow down"><FaMinus /></button>
		</div>
	  </div>
    </div>
  );
}

function updateCell(grid: boolean[][], x: number, y: number) : boolean[][] {
	const newRow = [...grid[y]];
	if (newRow[x]) {
		return grid;
	}
	newRow[x] = !newRow[x];
	const newGrid = [...grid];
	newGrid[y] = newRow;
	return newGrid;
}




export default GameOfLife;
