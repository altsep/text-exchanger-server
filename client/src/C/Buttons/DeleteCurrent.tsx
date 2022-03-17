import React from 'react';
import { PageList } from '../../App';
import { useThemeContext } from '../../ThemeContext';

export default function BtnDeleteCurrent(props: {
  currentPath: string;
  userId: string;
  setPageWasDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  setPagesCreated: React.Dispatch<React.SetStateAction<PageList>>;
}) {
  const { currentPath, userId, setPageWasDeleted, setPagesCreated } = props;
  const { theme } = useThemeContext();

  const handleClick = () => {
    import('../../F/requests').then(({ removePage, getCreatorPages }) => {
      removePage(currentPath).then(() =>
        getCreatorPages(userId).then((data) => {
          if (data) {
            setPagesCreated(JSON.parse(data));
          }
        })
      );
    });
    setPageWasDeleted(true);
  };

  return (
    <button className={theme && theme.btn} onClick={handleClick}>
      Remove this page
    </button>
  );
}
