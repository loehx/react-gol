import { FC, useState } from 'react';
import { FaUpload } from 'react-icons/fa';

const PATTERNS = [
	'period48glidergun',
	'smallspaceship',
	'spider'
];

interface Props {
	loadPattern: (name: string) => void
}

export const PatternLoader : FC<Props> = ({ loadPattern }) => {

	const [patternName, setPatternName] = useState<string>(PATTERNS[0])

	return <>
			<select onChange={ e => setPatternName(String(e.target.value)) }>
				{ PATTERNS.map(p => <option key={ p } value={ p }>{ p }</option>) }
			</select>
			<button onClick={ () => loadPattern(patternName) } title="Load pattern"><FaUpload /></button>
		</>

}