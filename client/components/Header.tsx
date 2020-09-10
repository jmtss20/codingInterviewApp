import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRoom } from '../actions';
import { AppState } from '../types';
/* @ts-ignore  */
import randomWords from 'random-words';
import * as moment from 'moment';
import 'moment-duration-format';
import axios from 'axios';

interface Props {
  setMode: (mode: string) => void;
  timer: number;
}

export const Header: React.FC<Props> = ({ setMode, timer }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const room: string = useSelector((state: AppState) => state.room);

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

  const joinRoom = (e: any, newRoom: string) => {
    e ? e.preventDefault() : null;
    if (newRoom) {
      axios
        .get(`/${newRoom}`)
        .then(({ data }) => {
          if (data) dispatch(setRoom(data));
        })
        .catch((err) => {
          alert('Room does not exist');
          console.log(err);
        });
    }
  };

  return (
    <div className='HeaderContainer'>
      <h3 className='Logo'>Board.ly</h3>
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
