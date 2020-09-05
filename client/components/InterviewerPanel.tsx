import React, { useState } from 'react';

interface Props {
  socketSendPromptUpdate: (prompt: any) => void;
  socketToggleTimer: () => void;
}

export const InterviewerPanel: React.FC<Props> = ({ socketSendPromptUpdate, socketToggleTimer }) => {
  const [promptTitle, setPromptTitle] = useState('');
  const [promptText, setPromptText] = useState('');

  const handlePromptChange = (e: any) => {
    if (e.target.id === 'title') setPromptTitle(e.target.value);
    if (e.target.id === 'text') setPromptText(e.target.value);
  };

  const handlePromptRelease = (e: any) => {
    socketSendPromptUpdate({ title: promptTitle, text: promptText });
    socketToggleTimer();
  }

  return (
    <div className='InterviewerPanelContainer'>
      <textarea id='title' value={promptTitle} placeholder='Title' onChange={handlePromptChange}></textarea>
      <textarea id='text' value={promptText} placeholder='Text' onChange={handlePromptChange}></textarea>
      <div className='InterviewerControlPanel'>
        <button>Screenshot</button>
        <button onClick={handlePromptRelease}>Release Prompt</button>
        <button>End</button>
      </div>
    </div>
  );
};
