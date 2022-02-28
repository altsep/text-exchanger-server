import React from 'react';
import { Link } from 'react-router-dom';
import { exchangeEntry, exchangeT } from '../App';
import { getData } from '../F/requests';
import { Delete } from '.';
import { useThemeContext } from '../ThemeContext';

interface exchangePropsI {
  currentPath: string;
  userId: string;
  exchangeArr: exchangeT;
  setExchangeArr: React.Dispatch<React.SetStateAction<exchangeT>>;
  setPageWasDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Exchange(props: exchangePropsI) {
  const { currentPath, userId, setExchangeArr, setPageWasDeleted } = props;
  const { theme } = useThemeContext();
  const [currentPage, setCurrentPage] = React.useState<exchangeEntry>();
  const [isCreator, setIsCreator] = React.useState<boolean>();
  const [textElementType, setTextElementType] =
    React.useState<string>('default');
  const [creatorText, setCreatorText] = React.useState<string>('');
  const [guestText, setGuestText] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsLoading(true);
    setPageWasDeleted(false);
    getData().then(({ data }) => {
      setCurrentPage({
        ...JSON.parse(data).filter(
          (a: exchangeEntry) => a.path === currentPath
        )[0],
        // Update date so that active entry doesn't get deleted on backend because of age
        date: Date.now(),
      });
      setIsLoading(false);
    });
  }, []);

  const setTextAreaHeight = () => {
    const el = document.querySelector('textarea');
    if (el) {
      el.style.setProperty('height', 'auto');
      el.style.setProperty('height', el.scrollHeight + 'px');
    }
  }

  React.useEffect(() => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    const setSelectionStart = () => {
      const valueLength = textarea.value.length * 2;
      textarea.selectionStart = valueLength;
    };
    if (!isLoading && textarea) {
      setTextAreaHeight();
      if (textarea.value.length === 0) {
        textarea.style.setProperty('height', '60px');
      }
      setSelectionStart();
    }
  }, [isLoading, textElementType]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    isCreator ? setCreatorText(e.target.value) : setGuestText(e.target.value);

  const handleSend = () => {
    getData().then(({ data }) => {
      const page = JSON.parse(data).filter(
        (a: exchangeEntry) => a.path === currentPath
      )[0];
      if (currentPage && isCreator) {
        const text = page.guestText;
        setCurrentPage({ ...currentPage, creatorText, guestText: text });
      } else if (currentPage) {
        const text = page.creatorText;
        setCurrentPage({ ...currentPage, guestText, creatorText: text });
      }
    });
  };

  React.useEffect(() => {
    let creatorIntervalId: NodeJS.Timeout, guestIntervalId: NodeJS.Timeout;
    if (currentPage) {
      // Check if user is creator
      if (userId === currentPage.creator) {
        setIsCreator(true);
      } else {
        setIsCreator(false);
      }
      // Update text to reflect changes
      creatorIntervalId = setInterval(
        () =>
          userId === currentPage.creator &&
          getData().then(({ data }) => {
            const page = JSON.parse(data).filter(
              (a: exchangeEntry) => a.path === currentPath
            )[0];
            const text = page.guestText;
            setGuestText(text);
          }),
        5000
      );
      guestIntervalId = setInterval(
        () =>
          userId !== currentPage.creator &&
          getData().then(({ data }) => {
            const page = JSON.parse(data).filter(
              (a: exchangeEntry) => a.path === currentPath
            )[0];
            const text = page.creatorText;
            setCreatorText(text);
          }),
        5000
      );
    }
    return () => {
      clearInterval(creatorIntervalId);
      clearInterval(guestIntervalId);
    };
  }, [currentPage]);

  React.useEffect(() => {
    if (currentPage) {
      // Update text states according to remote data
      const { creatorText, guestText } = currentPage;
      creatorText && setCreatorText(creatorText);
      guestText && setGuestText(guestText);
      // Include changes in the main array
      setExchangeArr((prevState) => {
        const newArr = prevState.slice();
        const index = newArr.findIndex(
          (item) => item.path === currentPage.path
        );
        newArr[index] = currentPage;
        return newArr;
      });
    }
  }, [currentPage]);

  // Resize textarea on input or window resize
  React.useEffect(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.addEventListener('input', setTextAreaHeight);
      window.addEventListener('resize', setTextAreaHeight);
    }
    return () => {
      if (textarea) {
        textarea.removeEventListener('input', setTextAreaHeight);
        window.removeEventListener('resize', setTextAreaHeight);
      }
    };
  }, [isLoading]);

  const handleTextElementType = () =>
    textElementType === 'default'
      ? setTextElementType('other')
      : setTextElementType('default');

  return (
    <div>
      <div
        className={`${
          theme && theme.system
        } flex flex-row justify-between m-2 mb-12`}
      >
        <Link to='/'>Return to home page</Link>
        <p>{currentPath}</p>
      </div>
      <div className='flex flex-col items-center justify-center'>
        {isLoading ? (
          <p className={theme && theme.system}>Getting data...</p>
        ) : document.cookie ? (
          <>
            {textElementType === 'default' ? (
              <div className='flex flex-col items-center justify-center mb-2 w-full'>
                <h1 className='curs'>Edit your text</h1>
                <textarea
                  className={`${
                    theme && theme.userText
                  } shadow-inner shadow-black/25 placeholder:text-base placeholder:font-mono overflow-y-hidden resize-none`}
                  placeholder='Enter text here...'
                  value={isCreator ? creatorText : guestText}
                  onChange={handleChange}
                  autoFocus
                />
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center w-full'>
                <h1 className='curs'>
                  {isCreator ? 'Guest\'s text' : 'Creator\'s text'}
                </h1>
                <div
                  className={`${
                    theme && theme.userText
                  } ${textElementType} font-sans whitespace-pre-line break-words`}
                >
                  {isCreator ? (
                    !guestText ? (
                      <p className={theme && theme.system}>
                        Waiting for guest to send data...
                      </p>
                    ) : (
                      guestText
                    )
                  ) : !creatorText ? (
                    <p className={theme && theme.system}>
                      Waiting for creator to send data...
                    </p>
                  ) : (
                    creatorText
                  )}
                </div>
              </div>
            )}
            <div className='flex flex-row flex-wrap justify-center'>
              {textElementType === 'default' && (
                <button
                  className={`${theme && theme.btn} flex flex-row items-center`}
                  onClick={handleSend}
                >
                  <p>Send</p>&nbsp;
                  <p className='text-xs'>(128kb max)</p>
                </button>
              )}
              {isCreator && (
                <Delete {...props} setPageWasDeleted={setPageWasDeleted} />
              )}
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
          </>
        ) : (
          <p>Can&apos;t identify user! Please enable cookies for this site.</p>
        )}
      </div>
    </div>
  );
}
