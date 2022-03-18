import React from 'react';
import { themeI } from '../../../ThemeContext';

export default function Select(props: {
  theme: themeI;
  isCreator: boolean;
  creatorText: string;
  guestText: string;
  setCreatorText: React.Dispatch<React.SetStateAction<string>>;
  setGuestText: React.Dispatch<React.SetStateAction<string>>;
  gotText: boolean;
}) {
  const {
    theme,
    isCreator,
    creatorText,
    guestText,
    setCreatorText,
    setGuestText,
    gotText,
  } = props;

  const handleClick = () => {
    const ta = document.querySelector('textarea') as HTMLTextAreaElement;
    const sel = window.getSelection();
    if (ta && sel && sel.toString().length > 0) {
      if (isCreator) {
        setCreatorText((prevState) => prevState.replace(sel.toString(), ''));
      } else {
        setGuestText((prevState) => prevState.replace(sel.toString(), ''));
      }
      ta.focus();
      setTimeout(() => {
        if (ta.value.length > 0) {
          ta.style.height = 'auto';
          ta.style.height = ta.scrollHeight + 'px';
        } else {
          ta.style.height = '60px';
        }
      }, 0);
    } else {
      ta.focus();
      ta.setSelectionRange(0, ta.value.length);
    }
  };

  const [selectBtnText, setSelectBtnText] =
    React.useState<string>('Select all');

  React.useEffect(() => {
    const onSelectionChange = () => {
      const sel = window.getSelection();
      if (sel) {
        const selLength = sel.toString().length;
        selLength > 0
          ? setSelectBtnText('Delete selected')
          : setSelectBtnText('Select all');
      }
    };
    document.addEventListener('selectionchange', onSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', onSelectionChange);
    };
  }, [gotText]);

  return (
    <button
      className={`${theme.btn} ${
        isCreator
          ? creatorText.length === 0 && 'hidden'
          : guestText.length === 0 && 'hidden'
      }`}
      onClick={handleClick}
    >
      {selectBtnText}
    </button>
  );
}
