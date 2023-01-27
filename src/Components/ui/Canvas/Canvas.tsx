import { useEffect, useRef } from 'react'
import { useMovable } from '../../util/MovableContext';
import styles from './Canvas.module.scss';

type TCanvasProps = {
}

export const Canvas = (): JSX.Element => {

  const { movableItems } = useMovable();

  // Create ref for canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (!canvas) return;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();

    movableItems.forEach((itemBounds: DOMRect, index: number) => {
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
      console.log("🚀 ~ file: Canvas.tsx:41 ~ movableItems.forEach ~ ctx", itemBounds)
    });
    ctx.stroke();
  }, [movableItems]);
  
  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
    />
  )
}