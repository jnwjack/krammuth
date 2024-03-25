import React, { useState } from 'react';
import { Token, SidebarToken, GridToken } from './BoardEntity';
import { GridCoordProps } from './CommonTypes';


enum EntityType {
  PlainEntity = 0, // Things like doors, gates, environmental stuff
  TokenEntity = 1, // Characters
}

interface BoardEntity {
  type: EntityType,
  id: number
}

interface SquareProps {
  lastInRow: boolean;
  lastInCol: boolean;
  callback: (x: number, y: number) => void;
}

interface SidebarProps {
  boardElementCallback: (e: BoardEntity) => void;
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

function Sidebar({ boardElementCallback }: SidebarProps) {
  const squareSize: number = 64;
  let [currentTab, setCurrentTab] = useState<number>(0);

  function onElementClicked(id: number) {
    if (currentTab == 0) {
      boardElementCallback({ type: EntityType.TokenEntity, id: id });
    } else {
      boardElementCallback({ type: EntityType.PlainEntity, id: id });
    }
  }

  function makeRequest() {
    fetch('http://localhost:3000/download_map/27', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res: Response) => {
      if (res.status == 200) {
        return res.json();
      }

      return { val: 0 };
    })
    .then(json => {
      if (json.val === 1234) {
        setCurrentTab(1);
      }
    })
    .catch(error => {
      console.log('Error: ' + error);
    })
  }

  const elements: React.ReactNode[] = [];
  if (currentTab == 0) {
    elements.push(<SidebarToken callback={ onElementClicked } squareSize={ squareSize } id={ 0 } key={ 0 }></SidebarToken>);
    elements.push(<SidebarToken callback={ onElementClicked } squareSize={ squareSize } id={ 1 } key={ 1 }></SidebarToken>);
  } else {
    elements.push(<SidebarToken callback={ onElementClicked } squareSize={ squareSize } id={ 2 } key={ 2 }></SidebarToken>);
    elements.push(<SidebarToken callback={ onElementClicked } squareSize={ squareSize } id={ 3 } key={ 3 }></SidebarToken>);
    elements.push(<SidebarToken callback={ onElementClicked } squareSize={ squareSize } id={ 4 } key={ 4 }></SidebarToken>);
    // elements.push(<Token squareSize={ squareSize } id={2}></Token>)
    // elements.push(<Token squareSize={ squareSize } id={3}></Token>)
    // elements.push(<Token squareSize={ squareSize } id={4}></Token>)
  }

  return (
    <div className='fixed min-w-80 border-2 border-solid border-red-600 bg-amber-200'>
      <ul className="flex flex-row border-b-2 border-slate-400">
        <li className="grow" onClick={ () => setCurrentTab(0) }>Tokens</li>
        <li className="grow" onClick={ () => setCurrentTab(1) }>Structures</li>
        <button onClick={ makeRequest }>Click Me</button>
      </ul>
      <ul>
        { elements }
      </ul>
    </div>
  );
}

export default function App() {
  let [squareSize, setSquareSize] = useState<number>(64);
  let [tokenCoords, setTokenCoords] = useState<GridCoordProps>({ x: 0, y: 0 });
  let [currentTokenID, setCurrentTokenID] = useState<number>(1);
  let [selectedEntity, setSelectedEntity] = useState<BoardEntity | null>(null);
  let [boardEntities, setBoardEntities] = useState<(BoardEntity & GridCoordProps)[]>([]);

  function onSquareClick(newX: number, newY: number) {
    if (selectedEntity) {
      setBoardEntities([
        ...boardEntities,
        { x: newX, y: newY, ...selectedEntity }
      ]);
    }
    setTokenCoords({ x: newX, y: newY });
  }

  function onSidebarTokenClick(id: number) {
    setCurrentTokenID(id);
  }

  function onSidebarElementClick(e : BoardEntity) {
    setSelectedEntity(e);
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

  key = 0;
  const entityNodes: React.ReactNode[] = boardEntities.map((obj: BoardEntity & GridCoordProps) => {
    let node: React.ReactNode = <GridToken x={ obj.x } y={ obj.y } squareSize={ squareSize } id={ obj.id } key={ key }></GridToken>;
    key++;
    return node;
  });

  // const className: string = `grid grid-cols-auto-fill-new grid-rows-auto-fill-new aspect-square w-screen`;
  const className: string = `grid grid-cols-auto-fill-new grid-rows-auto-fill-new aspect-square`;
  return (

    <div className={ className } style = { style }>
      { squares }
      <Sidebar boardElementCallback={ onSidebarElementClick } ></Sidebar>
      { entityNodes }
      {/* <GridToken x={ tokenCoords.x } y={ tokenCoords.y } squareSize={ squareSize } id={ currentTokenID }></GridToken> */}
    </div>
  );
}