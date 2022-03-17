import React from 'react';
import { PageList } from '../../App';
import { Delete } from '..';
import { useThemeContext } from '../../ThemeContext';
import TextDefault from './TextDefault';
import TextOther from './TextOther';
import useWarning from '../../H/useWarning';

interface exchangePropsI {
  currentPath: string;
  userId: string;
  isCreator: boolean;
  date: string;
  setPageWasDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  setPagesCreated: React.Dispatch<React.SetStateAction<PageList>>;
  setExists: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Exchange(props: exchangePropsI) {
  const {
    currentPath,
    userId,
    isCreator,
    date,
    setPageWasDeleted,
    setPagesCreated,
    setExists,
  } = props;
  const { theme } = useThemeContext();
  const [textElementType, setTextElementType] =
    React.useState<string>('default');
  const [gotText, setGotText] = React.useState<boolean>(false);
  const [creatorText, setCreatorText] = React.useState<string>('');
  const [guestText, setGuestText] = React.useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    isCreator ? setCreatorText(e.target.value) : setGuestText(e.target.value);

  const handleSend = () => {
    import('../../F/requests').then(({ sendText }) => {
      sendText({
        pageName: currentPath,
        isCreator,
        text: isCreator ? creatorText : guestText,
      }).then((res) => res && setExists(false));
    });
  };

  React.useEffect(() => {
    import('../../F/requests').then(({ getText }) =>
      getText(currentPath)
        .then((data) => {
          if (data) {
            const { creatorData, guestData } = JSON.parse(data);
            setCreatorText(creatorData);
            setGuestText(guestData);
          }
        })
        .finally(() => setGotText(true))
    );
  }, []);

  React.useEffect(() => {
    let intervalId: NodeJS.Timeout;
    import('../../F/requests').then(({ getTextOther }) => {
      intervalId = setInterval(
        () =>
          getTextOther({ pageName: currentPath, isCreator })
            .then((data) => {
              if (data) {
                if (data.includes('"err": "Couldn\'t find data"')) {
                  throw Error(JSON.parse(data).err);
                } else if (isCreator) {
                  data !== guestText && setGuestText(data);
                } else {
                  data !== creatorText && setCreatorText(data);
                }
              }
            })
            .catch((err) => {
              console.error(err.message);
              setExists(false);
            }),
        3000
      );
    });
    return () => clearInterval(intervalId);
  }, []);

  const handleTextElementType = () =>
    textElementType === 'default'
      ? setTextElementType('other')
      : setTextElementType('default');

  const userTextProps = {
    isCreator,
    textElementType,
    creatorText,
    guestText,
    handleChange,
    theme,
    gotText,
  };

  const deleteBtnProps = {
    currentPath,
    userId,
    setPageWasDeleted,
    setPagesCreated,
  };

  const { warning, warningDisplay } = useWarning(
    '! Information posted is not secure and accessible to anyone visiting the page. Be mindful of sending any sensitive data.',
    localStorage.getItem('exchangeWarningDisplay') || 'flex'
  );

  React.useEffect(() => {
    localStorage.setItem('exchangeWarningDisplay', warningDisplay);
  }, [warningDisplay]);

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
    <>
      {document.cookie ? (
        <div className='flex flex-col items-center'>
          {warning}
          <div className='flex flex-row flex-wrap justify-center mb-3'>
            {textElementType === 'default' && (
              <button
                className={`${theme && theme.btn} flex flex-row items-center`}
                onClick={handleSend}
              >
                <p>Send</p>&nbsp;
                <p className='text-xs'>(128kb max)</p>
              </button>
            )}
            {textElementType === 'default' &&
              (isCreator ? creatorText.length > 0 : guestText.length > 0) && (
                <button
                  className={`${theme && theme.btn} ${
                    creatorText.length === 0 && 'hidden'
                  }`}
                  onClick={() => {
                    const ta = document.querySelector(
                      'textarea'
                    ) as HTMLTextAreaElement;
                    const sel = window.getSelection();
                    if (ta && sel && sel.toString().length > 0) {
                      if (isCreator) {
                        setCreatorText((prevState) =>
                          prevState.replace(sel.toString(), '')
                        );
                      } else {
                        setGuestText((prevState) =>
                          prevState.replace(sel.toString(), '')
                        );
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
                  }}
                >
                  {selectBtnText}
                </button>
              )}
            {isCreator && <Delete {...deleteBtnProps} />}
            <button
              className={theme && theme.btn}
              onClick={handleTextElementType}
            >
              {textElementType === 'default'
                ? isCreator
                  ? 'Show guest\'s text'
                  : 'Show creator\'s text'
                : 'Show your text'}
            </button>
          </div>
          {textElementType === 'default' ? (
            <TextDefault {...userTextProps} />
          ) : (
            <TextOther {...userTextProps} />
          )}
          <div
            className={`${
              theme && theme.system
            } p-3 text-xs flex flex-col items-center`}
          >
            <p>Page created</p>
            <p>{date}</p>
          </div>
        </div>
      ) : (
        <p>Can&apos;t identify user! Please enable cookies for this site.</p>
      )}
    </>
  );
}
