import React, { useState } from 'react';

interface Props {
  socketSendPromptUpdate: (prompt: any) => void;
  socketToggleTimer: (bool: boolean) => void;
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
    socketToggleTimer(true);
  }

  const handlePromptEnd = (e: any) => {
    socketToggleTimer(false);
  }

  return (
    <div className='InterviewerPanelContainer'>
      <div className='InterviewerNavBar'>
        <button>Prompt</button>
        <button>Notes</button>
        <button>Tools</button>
      </div>
      <textarea id='title' value={promptTitle} placeholder='Enter prompt title' onChange={handlePromptChange}></textarea>
      <textarea id='text' value={promptText} placeholder='Enter prompt text' onChange={handlePromptChange}></textarea>
      <div className='InterviewerControlPanel'>
        <button>Screenshot</button>
        <button onClick={handlePromptRelease}>Release Prompt</button>
        <button onClick={handlePromptEnd}>End</button>
      </div>
    </div>
  );
};
