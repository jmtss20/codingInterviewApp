import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from './index'
import { addToHelloWorld } from './actions/index'

import { Room } from './components/Room';
import { Main } from './components/Main';

import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://127.0.0.1:80';
const socket = socketIOClient(ENDPOINT);

const App: React.FC = () => {
  const helloWorld: string = useSelector((state: AppState) => state.helloWorld)
  const dispatch = useDispatch()

  const [view, setView] = useState<string>('main');
  const [room, setRoom] = useState<string>('');
  const [globalText, setGlobalText] = useState<string>('');
  const [globalContextData, setGlobalContextData] = useState('');

  useEffect((): any => {
    socket.on('chat-message', (data: any) => {
      setGlobalText(data);
    });

    socket.on('canvas-update', (data: any) => {
      setGlobalContextData(data);
    })

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

  const socketSendCanvasUpdate = (text: string) => {
    socket.emit('send-canvas-update', room, text);
  }

  return (
    <>
      <h1>{helloWorld}</h1>
      <button onClick={() => {dispatch(addToHelloWorld(`${helloWorld}!`))}}>Add "!"</button>

      {!!(view === 'main') && <Main setView={setView} assignRoom={setRoom} />}
      {!!(view === 'room') && <Room
          socketSendMessage={socketSendMessage}
          socketSendCanvasUpdate={socketSendCanvasUpdate}
          room={room}
          globalText={globalText}
          globalContextData={globalContextData}
        />}
    </>
  );
}

export default App;
