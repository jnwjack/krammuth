import React from 'react';
import { GridCoordProps } from './CommonTypes';
import wizard from '../img/wizard.png';
import fighter from '../img/fighter.png';
import fence from '../img/fence.png';
import fenceOpen from '../img/fence_open.png';
import fenceVertical from '../img/fence_vertical.png';

interface TokenProps {
  squareSize: number;
  id: number;
}

interface TopLeftPosition {
  top: string;
  left: string;
}

interface Size {
  width: string;
  height: string;
}


export function Token({ squareSize, id }: TokenProps) {
  function imageFromID(tokenID: number): string {
    switch (tokenID) {
      case 0:
        return wizard;
      case 1:
        return fighter;
      case 2:
        return fence;
      case 3:
        return fenceOpen;
      case 4:
        return fenceVertical;
      default:
        return '';
    }
  }

  return (
    <img src={ imageFromID(id) } width={ `${squareSize}`} height={ `${squareSize}` } ></img>
  )
}

export function GridToken({x, y, squareSize, id }: TokenProps & GridCoordProps) {
  const positionStyle: TopLeftPosition & Size = { top: `${y * squareSize}px`, left: `${x * squareSize}px`, width: `${squareSize}px`, height: `${squareSize}px` };

  return (
    <div className='absolute' style={ positionStyle }>
      <Token squareSize={ squareSize } id={ id }></Token>
    </div>
  );
}

export function SidebarToken({ squareSize, id, callback }: TokenProps & { callback: (id: number) => void } ) {
  return (
    <div onClick={ () => callback(id) } style={ { width: squareSize } }>
      <Token squareSize={ squareSize } id={ id }></Token>
    </div>
  );
}