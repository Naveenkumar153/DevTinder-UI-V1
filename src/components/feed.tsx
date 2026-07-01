import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store/app.store";
import { useEffect } from "react";
import { api } from "../shared/api/api";
import { environment } from "../env/env.dev";
import { addFeeds } from "../store/feedSlice";
import type { Feed } from "../shared/interfaces/feed.interface";
import UserCard from "./userCard";

export default function Feed() {

    const dispatch = useDispatch();
    const feedSelector:Feed[] = useSelector((state:RootState) => state.feed.feeds);

    const fetchFeed = async () => {
        try {
            const feed = await api.get<{ data: Feed[] }>(`${environment.url}/feed`);
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

  return (
    <>
    {
        feedSelector.map((user) => (
            <UserCard key={user._id} user={user}/>
        ))
    }
    </>
  )
}
