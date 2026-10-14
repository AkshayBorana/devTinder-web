import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    // If connections already exists then do nothing.
    if (connections) return;

    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      const { data } = res.data;
      dispatch(addConnections(data));
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return <p>Somethign went wrong. Please try again.</p>;
  }

  if (!connections?.length) {
    <p>You don't have any connections.</p>;
  }

  return (
    <>
      <div className="text-center pt-3 my-5">
        <h2 className="text-bold text-3xl">Connections</h2>
        {connections.map((connection) => {
          const { firstName, lastName, age, gender, about, photoUrl } =
            connection;

          return (
            <div key={connection._id} className="flex m-4 p-4 rounded-lg bg-base-100 w-1/2 mx-auto">
                <div>
                   <img className="w-30 h-30 rounded-full" src={photoUrl} alt="photo"></img> 
                </div>
                <div className="text-left mx-4">
                    <h2 className="font-bold text-xl">{firstName} {lastName}</h2>
                    { age && gender && <p>{age}, {gender}</p> }
                    <p>{about}</p>
                </div>
            </div>

          );    
        })}
      </div>
    </>
  );
};

export default Connections;
