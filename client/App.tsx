import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setGlobalText, setGlobalContextData, setCodeEditorData, setPromptData } from './actions';
import { Room } from './components/Room';
import { Main } from './components/Main';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://127.0.0.1:80';
const socket = socketIOClient(ENDPOINT);

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const [view, setView] = useState<string>('main');
  const [room, setRoom] = useState<string>('');
  const socketSendMessage = (text: string) => socket.emit('send-chat-message', room, text);
  const socketSendCanvasUpdate = (text: string) => socket.emit('send-canvas-update', room, text);
  const socketSendCodeUpdate = (data: any) => socket.emit('send-code-update', room, data);
  const socketSendPromptUpdate = (prompt: any) => socket.emit('send-prompt-update', room, prompt);
  const socketToggleTimer = () => socket.emit('send-timer-update', room);

  useEffect((): any => {
    socket.on('chat-message', (data: any) => dispatch(setGlobalText(data)));
    socket.on('canvas-update', (data: any) => dispatch(setGlobalContextData(data)));
    socket.on('code-update', (data: any) => dispatch(setCodeEditorData(data)));
    socket.on('prompt-update', (prompt: any) => dispatch(setPromptData(prompt)));
    socket.on('timer-update', () => {console.log('ACTIVATE TIMER')}); //! TODO
    socket.on('user-joined-room', (data: any) => {
      console.log(data);
    });
    return socket.disconnect;
  }, []);

  useEffect(() => {
    if (room.length) socket.emit('join-room', room);
  }, [room]);

  return (
    <div className='AppContainer'>
      {!!(view === 'main') && <Main setView={setView} assignRoom={setRoom} />}
      {!!(view === 'room') && (
        <Room
          socketSendMessage={socketSendMessage}
          socketSendCanvasUpdate={socketSendCanvasUpdate}
          socketSendCodeUpdate={socketSendCodeUpdate}
          socketSendPromptUpdate={socketSendPromptUpdate}
          socketToggleTimer={socketToggleTimer}
          room={room} />
      )}
    </div>
  );
};
