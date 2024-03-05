import React, { ReactNode, useState } from 'react';
import wizard from '../img/wizard.png';

interface SquareProps {
  x: number;
  y: number;
  lastInRow: boolean;
  lastInCol: boolean;
  callback: (x: number, y: number) => void;
}

interface StringCoords {
  top: string;
  left: string;
}

interface GridCoords {
  x: number;
  y: number;
}

interface TokenProps {
  x: number;
  y: number;
  squareSize: number;
}

function Token({x, y, squareSize }: TokenProps) {
  const positionStyle: StringCoords = { top: `${y * squareSize}px`, left: `${x * squareSize}px` };

  return (
    <img src={ wizard } className='absolute' style={ positionStyle } width={ `${squareSize}`} height={ `${squareSize}` } ></img>
  );
}

function Square({ x, y, lastInCol, lastInRow, callback }: SquareProps) {
  function sayCoords() {
    console.log('My coords are x: ' + x + ' y: ' + y);
  }

  let classNames: string = 'text-xs border-l-2 border-t-2 border-dashed border-slate-600'
  if (lastInCol) {
    classNames += ' border-b-2';
  }
  if (lastInRow) {
    classNames += ' border-r-2';
  }

  return (
    <div className={ classNames }  onClick={ () => { callback(x, y); } }>
    </div>
  );
}

export default function App() {
  let [squareSize, setSquareSize] = useState<number>(64);
  let [tokenCoords, setTokenCoords] = useState<GridCoords>({ x: 0, y: 0 });

  function onSquareClick(newX: number, newY: number) {
    setTokenCoords({ x: newX, y: newY });
  }

  const numRows: number = window.innerHeight / squareSize;
  const numCols: number = window.innerWidth / squareSize;

  let key: number = 0;
  const squares: React.ReactNode[] = [];
  for (let i: number = 0; i < numRows; i++) {
    for (let j: number = 0; j < numCols; j++) {
      squares.push(<Square x={j} y={i} lastInRow={ j == (numCols - 1) } lastInCol={ i == (numRows - 1) } callback={ onSquareClick } key={ key }></Square>);
      key++;
    }
  }

  const className: string = `grid grid-cols-auto-fill-new grid-rows-auto-fill-new aspect-square w-screen`;
  return (

    <div className={ className }>
      { squares }
      <Token x={ tokenCoords.x } y={ tokenCoords.y } squareSize={ squareSize }></Token>
    </div>
  );
}