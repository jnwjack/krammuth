import React, { ReactNode, useState } from 'react';
import wizard from '../img/wizard.png';

interface SquareProps {
  lastInRow: boolean;
  lastInCol: boolean;
  callback: (x: number, y: number) => void;
}

interface TopLeftPosition {
  top: string;
  left: string;
}

interface Size {
  width: string;
  height: string;
}

interface GridCoordProps {
  x: number;
  y: number;
}

interface TokenProps {
  squareSize: number;
}

interface GridTokenProps {
  squareSize: number;
}

function Token({ squareSize }: TokenProps) {
  return (
    <img src={ wizard } width={ `${squareSize}`} height={ `${squareSize}` } ></img>
  )
}

function GridToken({x, y, squareSize }: GridTokenProps & GridCoordProps) {
  const positionStyle: TopLeftPosition & Size = { top: `${y * squareSize}px`, left: `${x * squareSize}px`, width: `${squareSize}px`, height: `${squareSize}px` };

  return (
    <div className='absolute' style={ positionStyle }>
      <img src={ wizard } className='absolute'></img>
    </div>
  );
}

function Square({ x, y, lastInCol, lastInRow, callback }: SquareProps & GridCoordProps) {
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

function Sidebar() {
  return (
    <ul className='fixed min-w-80 border-2 border-solid border-red-600 bg-amber-200'>
      <Token squareSize={64}></Token>
      <Token squareSize={64}></Token>
    </ul>
  );
}

export default function App() {
  let [squareSize, setSquareSize] = useState<number>(64);
  let [tokenCoords, setTokenCoords] = useState<GridCoordProps>({ x: 0, y: 0 });

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
      <Sidebar></Sidebar>
      <GridToken x={ tokenCoords.x } y={ tokenCoords.y } squareSize={ squareSize }></GridToken>
    </div>
  );
}