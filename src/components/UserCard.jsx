import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {
  const dispatch = useDispatch();

  const { firstName, lastName, about, photoUrl, age, _id, gender} = user;

  const handleSendConnectionRequest = async(status, id) => {
    try {
      const res = await axios.post(`${BASE_URL}/request/send/${status}/${id}`, {} , { withCredentials: true });
      dispatch(removeUserFromFeed(id));
    } catch (error) {
      console.warn(error);
    }
  }

    return (
      <>
        <div className="card bg-base-100 w-96 shadow-xl my-10">
          <figure className="h-50">
            <img src={photoUrl} alt="User image"></img>
          </figure>
          <div className="card-body">
            <h2 className="">
              {firstName} {lastName}
            </h2>
            <p>{about}</p>
            {age && gender && <p>{age}, {gender}</p>}
            <div className="justify-around">
              <button
                className="btn btn-primary mx-10"
                onClick={() => handleSendConnectionRequest("ignored", _id)}
              >
                Ignore
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleSendConnectionRequest("interested", _id)}
              >
                Interested
              </button>
            </div>
          </div>
        </div>
      </>
    );
};


export default UserCard;