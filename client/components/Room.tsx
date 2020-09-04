import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../types';
import { Canvas } from './Canvas';

interface Props {
  socketSendMessage: (message: string) => void;
  socketSendCanvasUpdate: (message: string) => void;
  room: string;
}

export const Room: React.FC<Props> = ({ socketSendMessage, socketSendCanvasUpdate, room }) => {
  const globalText: string = useSelector((state: AppState) => state.globalText);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    socketSendMessage(text);
  }, [text]);

  return (
    <>
      <h3>ROOM: {room}</h3>
      <form id='send-container'>
        <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
      </form>
      <textarea value={globalText}></textarea>
      <Canvas socketSendCanvasUpdate={socketSendCanvasUpdate} />
    </>
  );
};
