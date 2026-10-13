import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [errorMessage, setErrorMessage] = useState("");
  const [displayToastMessage, setDisplayToastMessage] = useState(false);

  const dispatch = useDispatch();

  const handleUpdateProfile = async () => {
    //Clear existing errorsa if any.
    setErrorMessage("");

    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data.data));
      // Display toast message.
      setDisplayToastMessage(true);
      // Hide the Toast message after 3s.
      setTimeout(() => {
        setDisplayToastMessage(false);
      }, 3000);
    } catch (error) {
      setErrorMessage(error?.response?.data);
      console.warn(error);
    }
  };

  return (
    <>
      <div className="flex justify-around mx-20">
        <div className="flex justify-center my-10">
          <div className="card bg-white w-96 shadow-sm">
            <div className="card-body">
              <h4 className="card-title">Edit Profile!</h4>
              <div>
                <fieldset className="fieldset">
                  <label className="label" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="input"
                    placeholder="Enter your First name"
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
                    placeholder="Enter your Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <label className="label" htmlFor="age">
                    Age
                  </label>
                  <input
                    type="text"
                    id="age"
                    className="input"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <label className="label" htmlFor="gender">
                    Gender
                  </label>
                  <input
                    type="text"
                    id="gender"
                    className="input"
                    placeholder="Enter your gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label className="label" htmlFor="photoUrl">
                    PhotoUrl
                  </label>
                  <input
                    type="text"
                    id="photoUrl"
                    className="input"
                    placeholder="Upload photo"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                  <label className="label" htmlFor="about">
                    About
                  </label>
                  <input
                    type="text"
                    id="about"
                    className="input"
                    placeholder="Introduce yourself"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                  {/* <label className="label" htmlFor="skills">
                  Skills
                </label>
                <input
                  type="text"
                  id="skills"
                  className="input"
                  placeholder="Enter your skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                /> */}
                </fieldset>
              </div>
              <div className="card-actions justify-center">
                {errorMessage && <p>{errorMessage}</p>}
                <button
                  className="btn btn-primary"
                  onClick={handleUpdateProfile}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview user card */}
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoUrl }}
        />
      </div>
      {displayToastMessage && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{firstName} profile updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
