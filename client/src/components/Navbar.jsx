import React, { useState } from 'react';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import LogoutContainer from './LogoutComponent';
import customFetch from '../utils/customFetch';
import { useGlobalContext } from '../context';

const Navbar = () => {
  const [showRegModal, setShowRegModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { userContext, setContextUser } = useGlobalContext();

  const renderSignIn = () => {
    setShowRegModal(false);
    setShowLoginModal(true);
  };

  const renderRegister = () => {
    setShowRegModal(true);
    setShowLoginModal(false);
  };

  const logoutUser = async () => {
    await customFetch.post('/auth/logout');
    setContextUser('');
  };

  return (
    <div className="md:flex justify-between p-4">
      <div className="p-3 font-bold text-3xl md:text-xl text-center">
        MntTracker
      </div>
      <div className="flex justify-around">
        {!userContext ? (
          <>
            <button
              className="mr-4 bg-slate-200 p-2 rounded-md shadow-md hover:bg-slate-300 duration-300 w-20 h-10 "
              onClick={() => setShowLoginModal(true)}
            >
              Log In
            </button>
            <button
              className=" bg-slate-200 p-2 rounded-md shadow-md hover:bg-slate-300 duration-300 w-20 h-10"
              onClick={() => setShowRegModal(true)}
            >
              Register
            </button>
          </>
        ) : (
          <LogoutContainer logoutUser={logoutUser} />
        )}

        {showRegModal ? (
          <RegisterModal
            setShowRegModal={setShowRegModal}
            renderSignIn={renderSignIn}
          />
        ) : null}

        {showLoginModal ? (
          <LoginModal
            setShowLoginModal={setShowLoginModal}
            renderRegister={renderRegister}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
