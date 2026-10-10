import Footer from "./Footer";
import NavBar from "./NavBar";
import { Outlet } from "react-router";

const Body = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
