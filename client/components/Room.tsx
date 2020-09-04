import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../types';
import { Canvas } from './Canvas';
import { CodeEditor } from '../components/CodeEditor';
import { Prompt } from '../components/Prompt';

interface Props {
  socketSendMessage: (message: string) => void;
  socketSendCanvasUpdate: (message: string) => void;
  socketSendCodeUpdate: (data: any) => void;
  room: string;
}

export const Room: React.FC<Props> = ({ socketSendMessage, socketSendCanvasUpdate, socketSendCodeUpdate, room }) => {
  const globalText: string = useSelector((state: AppState) => state.globalText);
  const [text, setText] = useState<string>('');
  const handleTextChange = (e: any) => {
    setText(e.target.value);
    socketSendMessage(e.target.value);
  };

  useEffect(() => {
    setText(globalText);
  }, [globalText]);

  return (
    <>
      <h3>ROOM: {room}</h3>
      <Prompt />
      <form id='send-container'>
        <textarea
          value={text}
          onChange={handleTextChange}
          style={{
            width: '50vw',
            height: '25vh',
          }}></textarea>
      </form>
      <CodeEditor socketSendCodeUpdate={socketSendCodeUpdate} />
      <Canvas socketSendCanvasUpdate={socketSendCanvasUpdate} />
    </>
  );
};
