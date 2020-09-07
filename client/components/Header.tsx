import React, { useState } from 'react';
/* @ts-ignore  */
import randomWords from 'random-words';
import * as moment from 'moment';
import 'moment-duration-format';
import axios from 'axios';

interface Props {
  setMode: (mode: string) => void;
  setSocketsRoom: (room: string) => void;
  room: string;
  timer: number;
}

export const Header: React.FC<Props> = ({ setMode, setSocketsRoom, room, timer }) => {
  const [text, setText] = useState('');

  const createRoom = () => {
    const newRoom = randomWords({ exactly: 2, join: '', maxLength: 4 });
    axios
      .post('/room', { newRoom })
      .then(() => joinRoom(null, newRoom))
      .then(() => setMode('interviewer'))
      .catch((err) => {
        console.log(err);
      });
  };

  const joinRoom = (e: any, room: string) => {
    e ? e.preventDefault() : null;
    if (room) {
      axios
        .get(`/${room}`)
        .then(({ data }) => {
          if (data) setSocketsRoom(room);
        })
        .catch((err) => {
          alert('Room does not exist');
          console.log(err);
        });
    }
  };

  return (
    <div className='HeaderContainer'>
      <h3 className='Logo'>CODING INTERVIEW APP</h3>
      {!!room && <h3 className='Time'>{moment.duration(timer, 'seconds').format('h:mm:ss', { trim: false })}</h3>}
      {!room ? (
        <>
          <form>
            <input value={text} onChange={(e) => setText(e.target.value)}></input>
            <button onClick={(e) => joinRoom(e, text)}>Join Room</button>
          </form>
          <button className='CreateRoomBtn' onClick={createRoom}>Create Room</button>
        </>
      ) : <h3 className='RoomName'>ROOM: {room}</h3>}
    </div>
  );
};
