import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setGlobalText, setGlobalContextData, setCodeEditorData } from './actions';
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

  useEffect((): any => {
    socket.on('chat-message', (data: any) => dispatch(setGlobalText(data)));
    socket.on('canvas-update', (data: any) => dispatch(setGlobalContextData(data)));
    socket.on('code-update', (data: any) => dispatch(setCodeEditorData(data)));
    socket.on('user-joined-room', (data: any) => {
      console.log(data);
    });
    return socket.disconnect;
  }, []);

  useEffect(() => {
    if (room.length) socket.emit('join-room', room);
  }, [room]);

  return (
    <>
      {!!(view === 'main') && <Main setView={setView} assignRoom={setRoom} />}
      {!!(view === 'room') && (
        <Room
          socketSendMessage={socketSendMessage}
          socketSendCanvasUpdate={socketSendCanvasUpdate}
          socketSendCodeUpdate={socketSendCodeUpdate}
          room={room} />
      )}
    </>
  );
};
