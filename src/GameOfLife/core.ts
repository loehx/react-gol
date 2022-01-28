

export function generateGrid(size: number, oldGrid?: boolean[][]) : boolean[][] {
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

const SIMMETRY = [
	[0,0,0,1,0,0,0,0,0], // DEAD
	[0,0,1,1,0,0,0,0,0] // ALIVE
];

export function doLifecycle(grid: boolean[][]): boolean[][] {
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
			

			newGrid[y][x] = SIMMETRY[current ? 1 : 0][activeNeighbours]

		}
	}

	return newGrid;
}

export function updateCell(grid: boolean[][], x: number, y: number) : boolean[][] {
	const newRow = [...grid[y]];
	if (newRow[x]) {
		return grid;
	}
	newRow[x] = !newRow[x];
	const newGrid = [...grid];
	newGrid[y] = newRow;
	return newGrid;
}

export function randomSpawn(grid: boolean[][], activeQuota: number = .8) : boolean[][] {
	const size = grid.length;
	const result = Array(size).fill(null).map(y => new Array(size).fill(false));
	for(let y = 0; y < size; y++) {
		for(let x = 0; x < size; x++) {
			result[y][x] = grid[y][x] || (Math.random() > activeQuota);
		}
	}

	return result;
}

export function loadPattern(name: string, padding: number, oldGrid?: boolean[][]): Promise<boolean[][]> {
	return import('./patterns/' + name + '.txt')
		.then(m => fetch(m.default))
		.then(r => r.text())
		.then((txt) => {
			console.log(txt);
			const lines = txt.split('\n').filter(line => line[0] !== '!');
			const matrix = lines.map((line: string) => line.split(''));
			const width = Math.max(...matrix.map(r => r.length));
			const height = matrix.length;
			const size = Math.max(width, height) + (padding * 2);
			const grid = generateGrid(size, oldGrid);

			for (let y = 0; y < height; y++) {
				for (let x = 0; x < width; x++) {
					const val = matrix[y][x];
					if (val === 'O' || val === 'X' || val === '1') {
						grid[y + padding][x + padding] = true;
					}
				}
			}
			
			return grid;
		})

}