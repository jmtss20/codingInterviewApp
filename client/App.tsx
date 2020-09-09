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
  const socketSendTextUpdate = (text: string) => room.length ? socket.emit('send-text-update', room, text) : null;
  const socketSendCanvasUpdate = (text: string) => room.length ? socket.emit('send-canvas-update', room, text) : null;
  const socketSendCodeUpdate = (data: any) => room.length ? socket.emit('send-code-update', room, data) : null;
  const socketSendPromptUpdate = (prompt: any) => socket.emit('send-prompt-update', room, prompt);
  const socketToggleTimer = (bool: boolean) => socket.emit('send-timer-update', room, bool);
  const socketSentNotesUpdate = (text: string) => socket.emit('send-notes-update', room, text);

  useEffect((): any => {
    socket.on('text-update', (data: any) => dispatch(setGlobalText(data)));
    socket.on('canvas-update', (data: any) => dispatch(setGlobalContextData(data)));
    socket.on('code-update', (data: any) => dispatch(setCodeEditorData(data)));
    socket.on('prompt-update', (prompt: any) => dispatch(setPromptData(prompt)));
    socket.on('timer-update', (bool: boolean) => toggleIsTimerOn(bool));
    socket.on('user-joined-room', (data: any) => { console.log(data) });
    socket.on('user-left-room', (data: any) => { console.log(data) });
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
      <Header setMode={setMode} setSocketsRoom={setSocketsRoom} room={room} timer={timer} />
      <div className='RoomContainer'>
        <Room
          socketSendTextUpdate={socketSendTextUpdate}
          socketSendCanvasUpdate={socketSendCanvasUpdate}
          socketSendCodeUpdate={socketSendCodeUpdate}
          room={room}
        />
        {!!(mode === 'interviewer') && (
          <InterviewerPanel socketSendPromptUpdate={socketSendPromptUpdate} socketToggleTimer={socketToggleTimer} socketSentNotesUpdate={socketSentNotesUpdate} />
        )}
      </div>
    </div>
  );
};
