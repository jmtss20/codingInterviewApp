import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../types';

type Coordinates = {
  x: number;
  y: number;
};

interface Props {
  socketSendCanvasUpdate: (val: any) => void;
}

export const Canvas: React.FC<Props> = ({ socketSendCanvasUpdate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [dimensions, setDimensions] = useState<{ [key: string]: any}>({width: 500, height: 300});
  const globalContextData: string = useSelector((state: AppState) => state.globalContextData);

  useEffect(() => {
    /* @ts-ignore  */
    const height = document.getElementById('canvas').clientHeight;
    /* @ts-ignore  */
    const width = document.getElementById('canvas').clientWidth;
    setDimensions({width,height})
  }, [context]);

  useEffect(() => {
    if (context) {
      context.beginPath();
      let img = new Image();
      if (globalContextData && globalContextData.length) {
        img.src = globalContextData;
      }
      img.onload = () => context.drawImage(img, 0, 0);
      context.closePath();
    }
  }, [globalContextData]);

  useEffect(() => {
    let mouseDown: boolean = false;
    let start: Coordinates = { x: 0, y: 0 };
    let end: Coordinates = { x: 0, y: 0 };
    let canvasOffsetLeft: number = 0;
    let canvasOffsetTop: number = 0;

    function handleMouseDown(evt: MouseEvent) {
      mouseDown = true;

      start = {
        x: evt.clientX - canvasOffsetLeft,
        y: evt.clientY - canvasOffsetTop,
      };

      end = {
        x: evt.clientX - canvasOffsetLeft,
        y: evt.clientY - canvasOffsetTop,
      };
    }

    function handleMouseUp(evt: MouseEvent) {
      mouseDown = false;
      if (canvasRef.current) {
        socketSendCanvasUpdate(canvasRef.current.toDataURL());
      }
    }

    function handleMouseMove(evt: MouseEvent) {
      if (mouseDown && context) {
        start = {
          x: end.x,
          y: end.y,
        };

        end = {
          x: evt.clientX - canvasOffsetLeft,
          y: evt.clientY - canvasOffsetTop,
        };

        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.strokeStyle = `#000`;
        context.lineWidth = 3;
        context.stroke();
        context.closePath();
      }
    }

    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext('2d');

      if (renderCtx) {
        canvasRef.current.addEventListener('mousedown', handleMouseDown);
        canvasRef.current.addEventListener('mouseup', handleMouseUp);
        canvasRef.current.addEventListener('mousemove', handleMouseMove);

        canvasOffsetLeft = canvasRef.current.offsetLeft;
        canvasOffsetTop = canvasRef.current.offsetTop;

        setContext(renderCtx);
      }
    }

    return function cleanup() {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousedown', handleMouseDown);
        canvasRef.current.removeEventListener('mouseup', handleMouseUp);
        canvasRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [context]);

  return (
    <div className='CanvasContainer'>
      <canvas id='canvas' ref={canvasRef} width={dimensions.width} height={dimensions.height}></canvas>
    </div>
  );
};
