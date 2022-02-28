import React from 'react';
import { themeT } from '../../ThemeContext';

export interface userTextPropsI {
    isCreator: boolean;
    textElementType: string;
    creatorText: string;
    guestText: string;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    theme: themeT;
  }

export default function TextDefault(props: userTextPropsI) {
  const { isCreator, creatorText, guestText, handleChange, theme } = props;
  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <h1 className='curs'>Edit your text</h1>
      <textarea
        className={`${
          theme && theme.userText
        } shadow-inner shadow-black/25 placeholder:text-base placeholder:font-mono overflow-y-hidden resize-none focus:outline-none`}
        placeholder='Enter text here...'
        value={isCreator ? creatorText : guestText}
        onChange={handleChange}
        autoFocus
      />
    </div>
  );
}
