import { BASE_URL } from "../utils/constants";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state => state.user);

  const fetchUserProfile = async () => {
    if(!userData) {
      try {
        const user = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });
        const { data } = user;
        dispatch(addUser(data));
      } catch (error) {
        if (error.status === 401) {
          navigate("/login");
          console.warn(`Error fetching user profile. Please login again. ${error.message}`)
        }
      }
    }
  };

  // useEffect hooks gets called after/once the component is loaded/rendered in the DOM.
  useEffect(() => {
      fetchUserProfile();
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
