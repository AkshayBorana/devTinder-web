import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router";

const Login = () => {
  // React hooks
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  // Redux hooks.
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      const { data } = res.data;

      if (!data) {
        console.warn(`Error: ${error.message}`);
        throw new Error("Error logging in, please try again.");
      }
      // Adding loggedIn user to the user state slice by dispatching addUser action.
      dispatch(addUser(data));
      // Re-direct user to home/dashboard page.
      navigate("/");
    } catch (error) {
      console.warn(`Error: ${error.message}`);
      throw new Error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-white w-96 shadow-sm">
        <div className="card-body">
          <h4 className="card-title">Login!</h4>
          <div>
            <fieldset className="fieldset">
              <label className="label" htmlFor="name">
                Email ID
              </label>
              <input
                type="text"
                id="name"
                className="input"
                placeholder="Enter your email ID"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
              <label className="label" htmlFor="name">
                Password
              </label>
              <input
                type="text"
                id="name"
                className="input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
