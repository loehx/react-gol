import { FC, useEffect, useState } from 'react';
import * as core from './core';
import Grid from './Grid';
import './index.css';
import { ControlBar } from './ControlBar';

export const GameOfLife : FC = () => {

	const [fps, setFps] = useState<number>(5)
	const [size, setSize] = useState<number>(50)
	const [cleared, setCleared] = useState<number>(0)
	const [grid, setGrid] = useState<boolean[][]>(core.generateGrid(size));
	const [intervalId, setIntervalId] = useState<NodeJS.Timer|null>(null); 

	const run = () => setGrid(grid => core.doLifecycle(grid));

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
		// setCleared(cleared + 1);
		setGrid(core.generateGrid(size));
	}

	const loadPattern = (name: string) => {
		core.loadPattern(name, 30, grid)
			.then((grid: boolean[][]) => setGrid(grid));
	}

	const resize = (amount: number) => {
		const newSize = Math.max(5, size + amount);
		setSize(newSize);
		setCleared(cleared + 1);
		setGrid(grid => core.generateGrid(newSize, grid));
	};

	useEffect(() => {
		if (grid.length !== size) {
			setSize(grid.length)
		}
	}, [grid])

	useEffect(() => {
		if (intervalId) {
			stop();
			start();
		}
	}, [fps])

  return (
    <div className="gol">
			<div className="gol__grid-wrapper">
					<Grid 
						key={ 'grid-' + cleared } 
						rows={ grid } 
						cellClicked={ (x,y) => setGrid(core.updateCell(grid, x, y)) }>
					</Grid>
			</div>

			<ControlBar 
				running={ !!intervalId }
				fps={ fps }
				size={ size }
				start={ start }
				stop={ stop }
				run={ run }
				random={ () => setGrid(core.randomSpawn(grid)) }
				clear={ clear }
				resize={ resize }
				setFps={ setFps }
				loadPattern={ loadPattern }
				/>
    </div>
  );
}

export default GameOfLife;
