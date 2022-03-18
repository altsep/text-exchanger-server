import React from 'react';
import { themeI } from '../../../ThemeContext';

export default function Send(props: {
  theme: themeI;
  currentPath: string;
  isCreator: boolean;
  creatorText: string;
  guestText: string;
  setExists: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { theme, currentPath, isCreator, creatorText, guestText, setExists } = props;
  const handleSend = () => {
    import('../../../F/requests').then(({ sendText }) => {
      sendText({
        pageName: currentPath,
        isCreator,
        text: isCreator ? creatorText : guestText,
      }).then((res) => res && setExists(false));
    });
  };
  return (
    <button
      className={`${theme.btn} flex flex-row items-center`}
      onClick={handleSend}
    >
      <p>Send</p>&nbsp;
      <p className='text-xs'>(128kb max)</p>
    </button>
  );
}
