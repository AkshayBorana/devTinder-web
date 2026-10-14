import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnectionRequests } from "../utils/requestsSlice";

const ConnectionRequests = () => {
    const dispatch = useDispatch();
    const connectionRequests = useSelector(store => store.connectionRequests);

    // Fetch all the connection requests that a user has received.
    const fetchConnectionRequests = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/requests/received`, { withCredentials: true });
            const data = res.data.data;
            dispatch(addConnectionRequests(data));
        } catch (error) {
            console.warn(error);
        }
    }

    // Review a connection request by either Accepting/Rejecting it.
    const handleReviewRequest = async (status, id) => {
        try {
            const res = await axios.post(`${BASE_URL}/request/review/${status}/${id}`, {} , { withCredentials: true });
            console.log(res);
        } catch (error) {
            console.warn(error);
        }
    }

    useEffect(() => {
        fetchConnectionRequests();
    }, []);

      if (!connectionRequests) {
        return <p>Somethign went wrong. Please try again.</p>;
      }

      if (!connectionRequests?.length) {
        <p>No connection requests.</p>;
      }

    return (
      <>
        <div className="text-center pt-3 my-5">
          <h2 className="text-bold text-3xl">Connection Requests</h2>
          {connectionRequests.map((connectionReq) => {
            const { firstName, lastName, age, gender, about, photoUrl } = connectionReq.fromUserId;
            const { _id } = connectionReq;

            return (
              <div key={_id} className="bg-base-100 w-1/2 mx-auto my-2 pb-4">
                <div
                  className="flex m-4 p-4 rounded-lg "
                >
                  <div>
                    <img
                      className="w-30 h-30 rounded-full"
                      src={photoUrl}
                      alt="photo"
                    ></img>
                  </div>
                  <div className="text-left mx-4">
                    <h2 className="font-bold text-xl">
                      {firstName} {lastName}
                    </h2>
                    {age && gender && (
                      <p>
                        {age}, {gender}
                      </p>
                    )}
                    <p>{about}</p>
                  </div>
                </div>
                <div className="justify-around mb-2">
                    <button className="btn btn-primary mx-10" onClick={() => handleReviewRequest('rejected', _id)}>Reject</button>
                    <button className="btn btn-secondary" onClick={() => handleReviewRequest('accepted', _id)}>Accept</button>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
}

export default ConnectionRequests;