import { Link, Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default HomeLayout;
