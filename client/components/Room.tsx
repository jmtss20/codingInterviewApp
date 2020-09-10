import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../types';
import { Canvas } from './Canvas';
import { CodeEditor } from '../components/CodeEditor';
import { Prompt } from '../components/Prompt';

interface Props {
  socketSendTextUpdate: (message: string) => void;
  socketSendCanvasUpdate: (url: string) => void;
  socketSendCodeUpdate: (data: any) => void;
}

export const Room: React.FC<Props> = ({ socketSendTextUpdate, socketSendCanvasUpdate, socketSendCodeUpdate }) => {
  const globalText: string = useSelector((state: AppState) => state.globalText);
  const sessionStatus: boolean = useSelector((state: AppState) => state.sessionStatus);
  const room: string = useSelector((state: AppState) => state.room);
  const [text, setText] = useState<string>('');
  const handleTextChange = (e: any) => {
    setText(e.target.value);
    socketSendTextUpdate(e.target.value);
  };

  useEffect(() => {
    setText(globalText);
  }, [globalText]);

  return (
    <>
      <Prompt />
      <textarea className='TextEditor' value={text} onChange={handleTextChange} disabled={!!room && !sessionStatus}></textarea>
      <CodeEditor socketSendCodeUpdate={socketSendCodeUpdate} />
      <Canvas socketSendCanvasUpdate={socketSendCanvasUpdate} />
    </>
  );
};
