import {Outlet} from 'react-router-dom';
import Header from './Header.jsx';
import SideBar from "./SideBar.jsx";

export default function Layout() {
  return (
    <>
      <Header />
      <SideBar />
      <Outlet />
    </>
  );
}