import { FC, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { loadPattern } from './core';

const PATTERNS = [
	'period48glidergun',
	'smallspaceship',
	'spider'
];

interface Props {
	onPatternLoaded: (grid: boolean[][]) => void,
	currentGrid: boolean[][]
}

export const PatternLoader : FC<Props> = (props) => {

	const [patternName, setPatternName] = useState<string>(PATTERNS[0])

	const load = () => {
		loadPattern(patternName, 30, props.currentGrid)
			.then(props.onPatternLoaded);
	}

	return <>
			<select onChange={ e => setPatternName(String(e.target.value)) }>
				{ PATTERNS.map(p => <option value={ p }>{ p }</option>) }
			</select>
			<button onClick={ load } title="Load pattern"><FaUpload /></button>
		</>

}