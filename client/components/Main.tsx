import React, { useState, useEffect } from 'react';
{/* @ts-ignore  */ }
import randomWords from 'random-words';
import axios from 'axios';

interface Props {
  setView: (view: string) => void,
  assignRoom: (view: string) => void
}

export const Main: React.FC<Props> = ({ setView, assignRoom }) => {
  const [room, setRoom] = useState('');

  const createRoom = (e: any) => {
    e.preventDefault();
    const newRoom = randomWords({ exactly: 2, join: '', maxLength: 4 });
    axios.post('/room', { newRoom })
      .then(() => joinRoom(null, newRoom))
      .catch((err) => {
        console.log(err);
      });
  }

  const joinRoom = (e: any, room: string) => {
    e ? e.preventDefault() : null;
    if (room) {
      axios.get(`/${room}`)
        .then(({ data }) => {
          console.log(data);
          if (data) {
            setView('room');
            assignRoom(room);
          }
        })
        .catch((err) => {
          alert('Room does not exist');
          console.log(err);
        });
    }
  }

  return (
    <>
      <form>
        <input value={room} onChange={(e) => setRoom(e.target.value)}></input>
        <button onClick={(e) => joinRoom(e, room)}>Join Room</button>
        <button onClick={(e) => createRoom(e)}>Create Room</button>
      </form>
    </>
  );
}
