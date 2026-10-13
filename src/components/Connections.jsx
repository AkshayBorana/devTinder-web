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
      <div className="text-center my-2">
        <h2>Connections</h2>
        {connections.map((connection) => {
          const { firstName, lastName, age, gender, about, photoUrl } =
            connection;

          return (
            // <div
            //   className="flex flex-col justify-center m-4 p-4"
            //   key={connection._id}
            // >
            //   <div className="h-80 w-70 bg-base-100 rounded-lg justify-items-center p-3">
            //     <img className="w-30 h-30" src={photoUrl} alt="photo"></img>
            //     <h2>
            //       {firstName} {lastName}
            //     </h2>
            //     <p>{about}</p>
            //   </div>
            // </div>

            <div className="flex m-4 p-4 rounded-lg bg-base-100">
                <div>
                   <img className="w-30 h-30 rounded-full" src={photoUrl} alt="photo"></img> 
                </div>
                <div className="text-left mx-4">
                    <h2 className="font-bold text-lg">{firstName} {lastName}</h2>
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
