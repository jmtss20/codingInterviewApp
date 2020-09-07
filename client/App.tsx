import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setGlobalText, setGlobalContextData, setCodeEditorData, setPromptData } from './actions';
import { Room } from './components/Room';
import { Header } from './components/Header';
import { InterviewerPanel } from './components/InterviewerPanel';

import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://127.0.0.1:80';
const socket = socketIOClient(ENDPOINT);

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState<string>('interviewee');
  const [room, setSocketsRoom] = useState<string>('');
  const [isTimerOn, toggleIsTimerOn] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | number | null>(null);
  const socketSendMessage = (text: string) => socket.emit('send-chat-message', room, text);
  const socketSendCanvasUpdate = (text: string) => socket.emit('send-canvas-update', room, text);
  const socketSendCodeUpdate = (data: any) => socket.emit('send-code-update', room, data);
  const socketSendPromptUpdate = (prompt: any) => socket.emit('send-prompt-update', room, prompt);
  const socketToggleTimer = (bool: boolean) => socket.emit('send-timer-update', room, bool);

  useEffect((): any => {
    socket.on('chat-message', (data: any) => dispatch(setGlobalText(data)));
    socket.on('canvas-update', (data: any) => dispatch(setGlobalContextData(data)));
    socket.on('code-update', (data: any) => dispatch(setCodeEditorData(data)));
    socket.on('prompt-update', (prompt: any) => dispatch(setPromptData(prompt)));
    socket.on('timer-update', (bool: boolean) => toggleIsTimerOn(bool));
    socket.on('user-joined-room', (data: any) => {
      console.log(data);
    });
    return socket.disconnect;
  }, []);

  useEffect(() => {
    if (room.length) socket.emit('join-room', room);
  }, [room]);

  useEffect(() => {
    let time = 0;
    if (isTimerOn) {
      setIntervalId(
        setInterval(() => {
          setTimer((time += 1));
        }, 1000),
      );
    } else {
      if (typeof intervalId === 'number') clearInterval(intervalId);
    }
  }, [isTimerOn]);

  return (
    <div className='AppContainer'>
      <Header setMode={setMode} setSocketsRoom={setSocketsRoom} room={room} timer={timer}/>
      <Room
        socketSendMessage={socketSendMessage}
        socketSendCanvasUpdate={socketSendCanvasUpdate}
        socketSendCodeUpdate={socketSendCodeUpdate}
      />
      {!!(mode === 'interviewer') && (
        <InterviewerPanel socketSendPromptUpdate={socketSendPromptUpdate} socketToggleTimer={socketToggleTimer} />
      )}
    </div>
  );
};
