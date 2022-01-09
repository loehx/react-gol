import React, { useEffect, useState } from 'react';
import Grid from './Grid';

const x = 50;
const y = 50;

interface Size {
	x: number, 
	y: number
}

export const GameOfLife : React.FC = () => {

	const [running, setRunning] = useState<number>(0)
	const [speed, setSpeed] = useState<number>(600)
	const [size, setSize] = useState<number>(50)
	const [grid, setGrid] = useState<boolean[][]>(newGrid(size));

	useEffect(() => {
		setGrid(newGrid(size, grid))
	}, [size])

	useEffect(() => {
		if (running > 0) {
			run(grid, setGrid);
		}
	}, [running]);

	useEffect(() => {
		if (running == 0) return;
		setTimeout(() => {
			setRunning(running + 1)
		}, speed);
	}, [grid]);

  return (
    <div className="game-of-life">
      { !running && <button onClick={ () => setRunning(1) }>Start</button> }
      { !!running && <button onClick={ () => setRunning(0) }>Stop</button> }
	  <button onClick={ () => run(grid, setGrid) }>Tick</button>
      <button onClick={ () => setGrid(newGrid(size)) }>Clear</button>
	  <button onClick={ () => setGrid(randomGrid(size, .5)) }>Random</button>
	  &nbsp;Size: { size }&nbsp;
	  <button onClick={ () => setSize(size + 10) }>+</button>
	  <button onClick={ () => setSize(size - 10) }>-</button>
	  &nbsp;Interval: { speed }&nbsp;
	  <button onClick={ () => setSpeed(speed + 100) }>+</button>
	  <button onClick={ () => setSpeed(Math.max(20, speed - 200)) }>-</button>
      <Grid rows={ grid } cellClicked={ (x,y) => setGrid(updateCell(grid, x, y)) }></Grid>
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

function newGrid(size: number, oldGrid?: boolean[][]) : boolean[][] {
	const result = Array(size).fill(null).map(y => new Array(size).fill(false));
	if (oldGrid) {
		const oldSize = oldGrid.length;
		const diff = (size - oldSize) / 2;
		oldGrid.forEach((row, y) => row.forEach((value, x) => {
			const r = result[y + diff];
			if (r && (x + diff >= 0 && x + diff < r.length)) {
				r[x + diff] = value;
			}
		}))
	}
	return result;
}

function run(grid: boolean[][], setGrid: React.Dispatch<React.SetStateAction<boolean[][]>>) {
	const size = grid.length;
	const newGrid = Array(size).fill(null).map(y => new Array(size).fill(false));

	const isActive = (y: number, x: number) => !grid[y] ? 0 : (grid[y][x] ? 1 : 0);

	for(let y = 0; y < size; y++) {
		for(let x = 0; x < size; x++) {
			const current = grid[y][x];
			const activeNeighbours = 
				isActive(y-1, x-1)
				+isActive(y, x-1)
				+isActive(y+1, x-1)
				+isActive(y-1, x)
				+isActive(y+1, x)
				+isActive(y-1, x+1)
				+isActive(y, x+1)
				+isActive(y+1, x+1)
			
			if (current) {
				
				if (activeNeighbours < 2 || activeNeighbours > 3) {
					// Any live cell with fewer than two live neighbours dies, as if by underpopulation.
					// Any live cell with more than three live neighbours dies, as if by overpopulation.
					newGrid[y][x] = false;
				}
				else {
					// Any live cell with two or three live neighbours lives on to the next generation.	
					newGrid[y][x] = true;
				}
			}
			else {
				// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction
				if (activeNeighbours == 3) {
					// Any live cell with two or three live neighbours lives on to the next generation.	
					newGrid[y][x] = true;
				}
			}
		}
	}

	setGrid(newGrid);
}

function randomGrid(size: number, activeQuota: number = .5) : boolean[][] {
	return Array(size).fill(null).map(y => new Array(size).fill(false).map(c => Math.random() > activeQuota));
}

export default GameOfLife;
