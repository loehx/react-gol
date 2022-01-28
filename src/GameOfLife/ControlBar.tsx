import { FC } from "react";
import { PatternLoader } from "./PatternLoader";
import { FaPlay, FaStop, FaPlus, FaMinus, FaForward, FaTrash, FaRandom } from 'react-icons/fa';
import './control-bar.css'

interface Props {
  running: boolean,
  fps: number,
  size: number,
  start: () => void,
  stop: () => void,
  run: () => void,
  random: () => void,
  clear: () => void,
  resize: (n: number) => void,
  setFps: (n: number) => void,
  loadPattern: (name: string) => void
}

export const ControlBar : FC<Props> = ({ running, fps, size, start, stop, run, random, clear, resize, setFps, loadPattern }) => {

  return <div className="gol__control-bar">
          <div className="gol__control-bar__panel">
            { !running && <button onClick={ start } title="Start"><FaPlay /></button> }
            { running && <button onClick={ stop } title="Stop"><FaStop /></button> }
            <button onClick={ run } title="Single lifecycle"><FaForward /></button>
            <button onClick={ clear } title="Clear"><FaTrash /></button>
            <button onClick={ random } title="Shuffle"><FaRandom /></button>
          </div>
          <div className="gol__control-bar__panel">
            <PatternLoader loadPattern={ loadPattern } />
          </div>

          <div className="gol__control-bar__panel">
            <button onClick={ () => resize(size + 10) } title="Increase grid size"><FaPlus /></button>
            { size }x{ size }
            <button onClick={ () => resize(Math.max(5, fps - 10)) } title="Decrease grid size"><FaMinus /></button>
          </div>

          <div className="gol__control-bar__panel">
            <button onClick={ () => setFps(fps + 1) } title="Speed up"><FaPlus /></button>
            { fps } fps
            <button onClick={ () => setFps(Math.max(1, fps - 1)) } title="Slow down"><FaMinus /></button>
          </div>
			  </div>
} 
