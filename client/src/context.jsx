import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  let defaultList = [];
  let displayOptions = false;

  if (localStorage.getItem('favMnts') !== null) {
    defaultList = JSON.parse(localStorage.getItem('favMnts'));
  }

  const [favorites, setFavorites] = useState(defaultList);
  const [userContext, setContextUser] = useState('');

  if (localStorage.getItem('displayOptions') !== null) {
    displayOptions = JSON.parse(localStorage.getItem('displayOptions'));
  }

  const [showFavorites, setShowFavorites] = useState(displayOptions);

  const updateFavorite = (obj) => {
    setFavorites([...favorites, obj]);
  };

  const removeFavorite = (id) => {
    const newArray = favorites.filter((item) => item._id !== id);
    setFavorites(newArray);
  };

  localStorage.setItem('favMnts', JSON.stringify(favorites));
  localStorage.setItem('displayOptions', JSON.stringify(showFavorites));

  return (
    <AppContext.Provider
      value={{
        favorites,
        updateFavorite,
        removeFavorite,
        userContext,
        setContextUser,
        showFavorites,
        setShowFavorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
