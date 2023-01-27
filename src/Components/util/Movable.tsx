import React, { useEffect, useRef, useState } from 'react'
import { useMovable } from './MovableContext'

/**
 * TPoint2D type describes x and y coordinates
 */
type TPoint2D = {
  x: number,
  y: number
}

/**
 * TMovableProps describes the props that the Movable component takes
 *
 * @prop children - Children components that the Movable component wraps
 */
type TMovableProps = {
  children: React.ReactNode
}

/**

  Movable is a functional component that allows for draggable functionality of its children element by either mouse or touch events.
  @param {TMovableProps} props - The props for the component, it requires a children prop to be passed.
  @returns {JSX.Element} - Returns a JSX div element that has the draggable functionality implemented
*/
export const Movable = ( {children}:TMovableProps ): JSX.Element => {
  const [coord,setCoord] = useState<TPoint2D>();
  const [offset, setOffset] = useState<TPoint2D>();
  const iconRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState<DOMRect>();
  const [isDown, setIsDown] = useState<boolean>(false);
  const { addMovableItems, removeMovableItem } = useMovable();

  useEffect(() => {
    if (!iconRef || !iconRef.current) return;
    setBounds(iconRef.current.getBoundingClientRect())
  }, [coord]);
    

  /**
   * handleDown is a function that sets the initial position of the children component
   * when the user starts moving it using mouse or touch events.
   *
   * @param e - MouseEvent or TouchEvent
   */
  function handleDown(e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!bounds) throw new Error('No bounds found for object');
    removeMovableItem(bounds);
    setIsDown(true);

    if ('touches' in e) {
      setOffset({
        x: e.touches[0].clientX - bounds.left,
        y: e.touches[0].clientY - bounds.top,
      });
    } else {
      setOffset({
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top,
      });    
    }
  }

  /**
   * handleMove is a function that updates the position of the children component
   * as the user moves it using mouse or touch events.
   *
   * @param e - MouseEvent or TouchEvent
   */
  function handleMove(e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!isDown || !offset) return;


    if ('touches' in e) {
      const { clientX, clientY } = e.touches[0];
      setCoord({
        x: clientX - offset.x,
        y: clientY - offset.y,
      });
    } else {
      setCoord({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  }

  /**
   * handleStop is a function that stops the movement of the children component
   * when the user releases the mouse button or touch event.
   *
   * @param e - MouseEvent or TouchEvent
   */
  function handleStop(e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!bounds) throw new Error('No bounds found for object');
    addMovableItems([bounds]);
    setIsDown(false);
    // Reset the offset values when the user stops moving the element
    setOffset({
      x: 0,
      y: 0,
    });
  }

  return (
    <div 
      ref = {iconRef}
      style={{
        position: 'absolute',
        left: `${coord?.x}px`,
        top: `${coord?.y}px`
      }}
      // Desktop control using mouse events
      onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleDown(e)}
      onMouseMove={(e) => handleMove(e)}
      onMouseUp={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleStop(e)}
      // Mobile control using Touch API
      onTouchMove={(e: React.TouchEvent<HTMLDivElement>)=>handleMove(e)}
      onTouchStart={(e: React.TouchEvent<HTMLDivElement>)=>handleDown(e)}
      onTouchEnd={(e: React.TouchEvent<HTMLDivElement>)=>handleStop(e)}
    >
      {children}
    </div>
  )
}
