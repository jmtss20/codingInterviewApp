import React, { useState, useEffect } from 'react';

interface Props {
  socketSendMessage: (message: string) => void,
  room: string,
  globalText: string
}

export const Room: React.FC<Props> = ({ socketSendMessage, room, globalText }) => {
  const [text, setText] = useState<string>('');

  useEffect(() => {
    socketSendMessage(text);
  }, [text]);

  return (
    <>
      <h3>ROOM: {room}</h3>
      <form id='send-container'>
        <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
      </form>
      <textarea value={globalText}></textarea>
    </>
  );
}
