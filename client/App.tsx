import React, { useState, useEffect } from 'react';
import { Room } from './components/Room';
import { Main } from './components/Main';

import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://127.0.0.1:80';
const socket = socketIOClient(ENDPOINT);

const App: React.FC = () => {
  const [view, setView] = useState<string>('main');
  const [room, setRoom] = useState<string>('');
  const [globalText, setGlobalText] = useState<string>('');

  useEffect((): any => {
    socket.on('chat-message', (data: any) => {
      setGlobalText(data);
    });

    socket.on('user-joined-room', (data: any) => {
      console.log(data);
    })

    return () => {
      socket.disconnect();
    }
  }, []);

  useEffect(() => {
    if (room.length) {
      socket.emit('join-room', room);
    }
  }, [room]);

  const socketSendMessage = (text: string) => {
    socket.emit('send-chat-message', room, text);
  }

  return (
    <>
      {!!(view === 'main') && <Main setView={setView} assignRoom={setRoom} />}
      {!!(view === 'room') && <Room socketSendMessage={socketSendMessage} room={room} globalText={globalText}/>}
    </>
  );
}

export default App;
