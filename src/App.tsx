import React, { ReactNode, useState } from 'react';
import wizard from '../img/wizard.png';
import fighter from '../img/fighter.png';

interface SquareProps {
  lastInRow: boolean;
  lastInCol: boolean;
  callback: (x: number, y: number) => void;
}

interface SidebarProps {
  callback: (id: number) => void;
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
  id: number;
}

function Token({ squareSize, id }: TokenProps) {
  function imageFromID(tokenID: number): string {
    switch (tokenID) {
      case 0:
        return wizard;
      case 1:
        return fighter;
      default:
        console.log('Error: invalid token ID');
        return '';
    }
  }

  return (
    <img src={ imageFromID(id) } width={ `${squareSize}`} height={ `${squareSize}` } ></img>
  )
}

function GridToken({x, y, squareSize, id }: TokenProps & GridCoordProps) {
  const positionStyle: TopLeftPosition & Size = { top: `${y * squareSize}px`, left: `${x * squareSize}px`, width: `${squareSize}px`, height: `${squareSize}px` };

  return (
    <div className='absolute' style={ positionStyle }>
      <Token squareSize={ squareSize } id={ id }></Token>
    </div>
  );
}

function SidebarToken({ squareSize, id, callback }: TokenProps & SidebarProps) {
  return (
    <div onClick={ () => callback(id) } style={ { width: squareSize } }>
      <Token squareSize={ squareSize } id={ id }></Token>
    </div>
  );
}

function Square({ x, y, lastInCol, lastInRow, callback }: SquareProps & GridCoordProps) {
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

function Sidebar({ callback }: SidebarProps) {
  return (
    <ul className='fixed min-w-80 border-2 border-solid border-red-600 bg-amber-200'>
      <SidebarToken callback={ callback } squareSize={ 64 } id={ 0 }></SidebarToken>
      <SidebarToken callback={ callback } squareSize={ 64 } id={ 1 }></SidebarToken>
    </ul>
  );
}

export default function App() {
  let [squareSize, setSquareSize] = useState<number>(64);
  let [tokenCoords, setTokenCoords] = useState<GridCoordProps>({ x: 0, y: 0 });
  let [currentTokenID, setCurrentTokenID] = useState<number>(1);

  function onSquareClick(newX: number, newY: number) {
    setTokenCoords({ x: newX, y: newY });
  }

  function onSidebarTokenClick(id: number) {
    console.log('heyo!');
    setCurrentTokenID(id);
  }

  const numRows: number = Math.floor(window.innerHeight / squareSize);
  const numCols: number = Math.floor(window.innerWidth / squareSize);
  const containerWidth = numCols * squareSize;
  const style = { width: `${containerWidth}px`};

  let key: number = 0;
  const squares: React.ReactNode[] = [];
  for (let i: number = 0; i < numRows; i++) {
    for (let j: number = 0; j < numCols; j++) {
      squares.push(<Square x={j} y={i} lastInRow={ j == (numCols - 1) } lastInCol={ i == (numRows - 1) } callback={ onSquareClick } key={ key }></Square>);
      key++;
    }
  }

  // const className: string = `grid grid-cols-auto-fill-new grid-rows-auto-fill-new aspect-square w-screen`;
  const className: string = `grid grid-cols-auto-fill-new grid-rows-auto-fill-new aspect-square`;
  return (

    <div className={ className } style = { style }>
      { squares }
      <Sidebar callback={ onSidebarTokenClick }></Sidebar>
      <GridToken x={ tokenCoords.x } y={ tokenCoords.y } squareSize={ squareSize } id={ currentTokenID }></GridToken>
    </div>
  );
}