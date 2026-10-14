import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import generateRandomMobileNumber from "../utils/generateMobileNumber";

const Login = () => {
  // React hooks
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);

  // Redux hooks.
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Login API
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
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
        setErrorMessage(error?.message || "Something went wrong");
    }
  };

  // Sign up API
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName,
          lastName,
          emailId,
          password,
          mobile:  generateRandomMobileNumber()
        },
        { withCredentials: true },
      );


      if(res.status === 200) {
        const user = res?.data?.data;
        dispatch(addUser(user));
        //After successfull signup either re-direct to feeds page to you can ask the user to login.
        navigate('/');
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-white w-96 shadow-sm">
        <div className="card-body">
          <h4 className="card-title">{isLoginForm ? "Login" : "SignUp"}</h4>
          <div>
            <fieldset className="fieldset">
              {!isLoginForm && (
                <>
                  <label className="label" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="input"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />

                  <label className="label" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="input"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </>
              )}
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
            {errorMessage && <p>{errorMessage}</p>}
            <button className="btn btn-primary" onClick={ isLoginForm ? handleLogin : handleSignUp}>
              {isLoginForm ? "Login" : "Sign up"}
            </button>
          </div>

          {isLoginForm ? (
            <span>
              New user? <span onClick={() => setIsLoginForm((v) => !v)} className="cursor-pointer">Click to Sign up</span>.
            </span>
          ) : (
            <span>
              Existing user? <span onClick={() => setIsLoginForm((v) => !v)} className="cursor-pointer">Click to Login.</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
