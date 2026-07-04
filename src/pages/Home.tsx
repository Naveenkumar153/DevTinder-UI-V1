import { useEffect } from "react";
import type { UserProfile } from "../shared/interfaces/users.interface";
import { addUser } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/app.store";
import Feed from "../components/feed";
import { api } from "../shared/api/api";

export default function Home() {
    const  dispatch = useDispatch();
    const  userSelector = useSelector((state:RootState) => state.user.user);

    const fetchUser = async () => {
      try {
          let profileInfo = await api.get<{data:UserProfile}>(`/user/view`);
          console.log('profileInfo',profileInfo.data.data);
          if(profileInfo.data.data){
              dispatch(addUser(profileInfo.data.data))
          }
      } catch(error){
          console.error(error);
      }
    };

    useEffect(() => {
      if(!userSelector.details){
          fetchUser();
      }
    },[]);

  return (
    <div className='flex justify-center my-10'>
      <Feed/>
    </div>
  )
}


