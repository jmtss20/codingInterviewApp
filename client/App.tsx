import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalText, setGlobalContextData, setCodeEditorData, setPromptData, setSessionStatus, setRoom } from './actions';
import { AppState } from './types';
import { Room } from './components/Room';
import { Header } from './components/Header';
import { InterviewerPanel } from './components/InterviewerPanel';

import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://127.0.0.1:80';
const socket = socketIOClient(ENDPOINT);

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const sessionStatus: boolean = useSelector((state: AppState) => state.sessionStatus);
  const room: string = useSelector((state: AppState) => state.room);
  const [mode, setMode] = useState<string>('interviewee');

  const [timer, setTimer] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | number | null>(null);
  const socketSendTextUpdate = (text: string) => (!!room ? socket.emit('send-text-update', room, text) : null);
  const socketSendCanvasUpdate = (text: string) => (!!room ? socket.emit('send-canvas-update', room, text) : null);
  const socketSendCodeUpdate = (data: any) => (!!room ? socket.emit('send-code-update', room, data) : null);
  const socketSendPromptUpdate = (prompt: any) => socket.emit('send-prompt-update', room, prompt);
  const socketToggleSessionStatus = (bool: boolean) => socket.emit('send-session-update', room, bool);
  const socketSentNotesUpdate = (text: string) => socket.emit('send-notes-update', room, text);

  useEffect((): any => {
    socket.on('text-update', (data: any) => dispatch(setGlobalText(data)));
    socket.on('canvas-update', (data: any) => dispatch(setGlobalContextData(data)));
    socket.on('code-update', (data: any) => dispatch(setCodeEditorData(data)));
    socket.on('prompt-update', (prompt: any) => dispatch(setPromptData(prompt)));
    socket.on('session-update', (bool: boolean) => dispatch(setSessionStatus(bool)));
    socket.on('user-joined-room', (data: any) => {
      console.log(data);
    });
    socket.on('user-left-room', (data: any) => {
      console.log(data);
    });
    return socket.disconnect;
  }, []);

  useEffect(() => {
    if (!!room) socket.emit('join-room', room);
  }, [room]);

  useEffect(() => {
    let time = 0;
    if (sessionStatus) {
      setIntervalId(
        setInterval(() => {
          setTimer((time += 1));
        }, 1000),
      );
    } else {
      if (typeof intervalId === 'number') clearInterval(intervalId);
    }
  }, [sessionStatus]);

  return (
    <div className='AppContainer'>
      <Header setMode={setMode} timer={timer} />
      <div className='RoomContainer'>
        <Room
          socketSendTextUpdate={socketSendTextUpdate}
          socketSendCanvasUpdate={socketSendCanvasUpdate}
          socketSendCodeUpdate={socketSendCodeUpdate}
        />
        {!!(mode === 'interviewer') && (
          <InterviewerPanel
            socketSendPromptUpdate={socketSendPromptUpdate}
            socketToggleSessionStatus={socketToggleSessionStatus}
            socketSentNotesUpdate={socketSentNotesUpdate}
          />
        )}
      </div>
    </div>
  );
};
