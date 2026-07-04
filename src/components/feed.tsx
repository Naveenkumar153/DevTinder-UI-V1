import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store/app.store";
import { useEffect } from "react";
import { addFeeds, removeFeed } from "../store/feedSlice";
import type { Feed } from "../shared/interfaces/feed.interface";
import UserCard from "./userCard";
import { api } from "../shared/api/api";

export default function Feed() {

    const dispatch = useDispatch();
    const feedSelector:Feed[] = useSelector((state:RootState) => state.feed.feeds);

    const fetchFeed = async () => {
        try {
            const feed = await api.get<{ data: Feed[] }>(`/feed`);
            console.log(feed);
            dispatch(addFeeds(feed.data.data))
        } catch (error) {
            console.error('error fetchFeed',error);
        }
    };

    useEffect(() => {
        if(!feedSelector?.length){
            fetchFeed()
        }
    },[]);

    const handleSwipe = async (userId: string, dir: 'left' | 'right') => {
        console.log('handleSwipe', userId, dir);
        const action = dir === 'right' ? 'interested' : 'ignore';

        try {

            const response = await api.post(`/request/send/${action}/${userId}`, {});
            console.log('response', response.data);
            dispatch(removeFeed(userId));

        } catch (error) {
            console.error('error handleSwipe',error);
        }

    };

  if (feedSelector.length === 0) {
        return (
        <div className="flex items-center justify-center h-screen text-3xl font-bold">
            No More Cards ❤️
        </div>
        );
  }

  return (
    <>
       <div className="flex flex-col items-center justify-center min-h-screen">
              <div className="relative w-80 h-125">
                {
                    feedSelector.map((user,index) => {
                        const isTop = index === 0;
                        return <UserCard key={user._id} user={user} index={index} isTop={isTop} onSwipe={handleSwipe}/>
                    }
                    )
                }
              </div>
       </div>
    </>
  )
}
