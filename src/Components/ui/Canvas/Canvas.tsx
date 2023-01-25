import React, { useEffect, useRef } from 'react'
import styles from './Canvas.module.scss';

export const Canvas = ( {movableItems}: TCanvasProps ): JSX.Element => {
  // Create ref for canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { 
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (!canvas) return;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (!ctx) return;

    movableItems.forEach((itemRef:React.RefObject<HTMLDivElement>, index: number) => {
      const item = itemRef.current;
      console.log("🚀 ~ file: Canvas.tsx:16 ~ movableItems.forEach ~ item", item)
      if (!item) return;

      const itemBounds = item.getBoundingClientRect();

      if (index===0) {
        ctx.moveTo(
          itemBounds.x + itemBounds.width / 2,
          itemBounds.y + itemBounds.height / 2
        );
      } else {
        ctx.lineTo(
          itemBounds.x + itemBounds.width / 2,
          itemBounds.y + itemBounds.height / 2
        );
      }
      
      ctx.stroke();
    })



    

    ctx.beginPath();



  }, [movableItems]);
  
  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
    />
  )
}

type TCanvasProps = {
  movableItems: React.RefObject<HTMLDivElement>[];
}

