import React, { useState, useEffect } from 'react';
import { Canvas } from './Canvas';

interface Props {
  socketSendMessage: (message: string) => void,
  socketSendCanvasUpdate: (message: string) => void,
  room: string,
  globalText: string,
  globalContextData: string
}

export const Room: React.FC<Props> = ({ socketSendMessage, socketSendCanvasUpdate, room, globalText, globalContextData }) => {
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
      <Canvas globalContextData={globalContextData} socketSendCanvasUpdate={socketSendCanvasUpdate}/>
    </>
  );
}
