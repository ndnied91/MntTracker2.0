import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useState } from 'react';
import { useGlobalContext } from '../context';

const LogoutContainer = ({ logoutUser }) => {
  const [showLogout, setShowLogout] = useState(false);
  const { userContext, favorites, showFavorites, setShowFavorites } =
    useGlobalContext();

  return (
    <div className="flex">
      {favorites.length > 0 ? (
        <button
          className="btn logout-btn flex justify-center items-center bg-slate-100 p-2 md:mr-2 rounded-md shadow-md duration-700 h-10 mr-10 w-40 md:w-32"
          onClick={() => setShowFavorites(!showFavorites)}
        >
          {!showFavorites ? 'Show favorites' : 'Show All'}
        </button>
      ) : null}

      <div className="relative">
        <button
          type="button"
          className="  gap-2 flex justify-center items-center bg-slate-100 p-2 rounded-md shadow-md duration-700 h-10 w-40 md:w-32"
          onClick={() => setShowLogout(!showLogout)}
        >
          <FaUserCircle />
          {userContext?.name}
          <FaCaretDown />
        </button>

        <div
          className={
            showLogout
              ? 'bg-slate-100 shadow-md rounded-md absolute visible text-center duration-200 cursor-pointer mt-1 h-10 w-full'
              : 'invisible w-full absolute text-center'
          }
        >
          <button
            type="button"
            className="mt-2 pb-2"
            onClick={() => {
              logoutUser();
              setShowFavorites(false);
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutContainer;
