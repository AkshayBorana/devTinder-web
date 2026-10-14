import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import axios from "axios";
import UserCard from './UserCard';

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector(state => state.feed);

    const getFeed = async () => {
      // If feeds are already present then don't make the API call.  
      if (feed) return;
      try {
        const res = await axios.get(`${BASE_URL}/user/feed`, { withCredentials: true });
        dispatch(addFeed(res.data));
      } catch (error) {
        console.warn(error);
      }
    };

    useEffect(() => {
        getFeed();
    }, [])

    if(!feed?.length) {
      return <div>No new profile available.</div>
    }

    return (
      <>
        <div className="flex justify-center">
        {feed && <UserCard user={feed[0]}/>}
        </div>
      </>
    );
};

export default Feed;
