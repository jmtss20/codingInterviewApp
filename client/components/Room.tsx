import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../types';
import { Canvas } from './Canvas';
import { CodeEditor } from '../components/CodeEditor';
import { Prompt } from '../components/Prompt';
import { InterviewerPanel } from '../components/InterviewerPanel';

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
      <div className='HeaderContainer'>
        <h3>ROOM: {room}</h3>
      </div>
      <Prompt />
      <textarea className='TextEditor' value={text} onChange={handleTextChange}></textarea>
      <CodeEditor socketSendCodeUpdate={socketSendCodeUpdate} />
      <Canvas socketSendCanvasUpdate={socketSendCanvasUpdate} />
      <InterviewerPanel />
    </>
  );
};
