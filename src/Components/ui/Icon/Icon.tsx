import { useRef, useState } from 'react';
import styles from './Icon.module.scss';

type TPoint2D = {
  x: number,
  y: number
}

export default function Icon() {
  const [coord,setCoord] = useState<TPoint2D>();
  const [offset, setOffset] = useState<TPoint2D>();
  const iconRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  // Handles mobile movement

  function handleTouch(e: React.TouchEvent<HTMLDivElement>) {
    if (!iconRef.current || !iconRef) {
      throw new Error('No reference found to icon for mobile touch')
    }
    const icon = iconRef.current.getBoundingClientRect();

    setOffset({
      x: e.touches[0].clientX - icon.left,
      y: e.touches[0].clientY - icon.top,
    });
  }

  function handleDrag(e: React.TouchEvent<HTMLDivElement>) {
    const { clientX, clientY } = e.touches[0];
    setCoord({
      x: clientX - offset!.x,
      y: clientY - offset!.y,
    });
  }

  function handleTouchStop(e: React.TouchEvent<HTMLDivElement>) {
    setOffset({
      x: 0,
      y: 0,
    });
  }

  return (
    <div 
      ref = {iconRef}
      style={{
        left: `${coord?.x}px`,
        top: `${coord?.y}px`
      }}
      className={styles.iconWrapper}
      onTouchMove={(e: React.TouchEvent<HTMLDivElement>)=>handleDrag(e)}
      onTouchStart={(e: React.TouchEvent<HTMLDivElement>)=>handleTouch(e)}
      onTouchEnd={(e: React.TouchEvent<HTMLDivElement>)=>handleTouchStop(e)}
    />
  )
}
