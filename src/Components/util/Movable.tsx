import React, { useRef, useState } from 'react'

type TPoint2D = {
  x: number,
  y: number
}

type TMovableProps = {
  children: React.ReactNode
}

export const Movable = ( {children}:TMovableProps ): JSX.Element => {
  const [coord,setCoord] = useState<TPoint2D>();
  const [offset, setOffset] = useState<TPoint2D>();
  const iconRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState<boolean>(false);

  function handleDown(e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!iconRef.current || !iconRef) {
      throw new Error('No reference found to icon for mobile touch')
    }
    const icon = iconRef.current.getBoundingClientRect();
    setIsDown(true);

    if ('touches' in e) {
      setOffset({
        x: e.touches[0].clientX - icon.left,
        y: e.touches[0].clientY - icon.top,
      });
    } else {
      setOffset({
        x: e.clientX - icon.left,
        y: e.clientY - icon.top,
      });    
    }
  }

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

  function handleStop(e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setIsDown(false);  
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
