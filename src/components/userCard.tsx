import { use, useEffect } from "react";
import type { Feed } from "../shared/interfaces/feed.interface";

type CardType = 'feed' | 'userInfo';
interface UserCardProps {
    user: Feed;
    type?: CardType
}

export default function UserCard({ user, type = 'feed' }:UserCardProps) {

    useEffect(() => {
        console.log('UserCard',user);
    },[])

  return (
    <>
     <div className="card bg-base-100 w-96 shadow-sm scale-80">
            <figure>
                {
                    user.profilePicture &&
                <img src={user.profilePicture} alt={user.firstName || user.lastName} />
                }
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    { user.firstName + ' ' + user.lastName }
                    {/* <div className="badge badge-secondary">NEW</div> */}
                </h2>
                {
                 user.age && user.gender &&  <p>{ user.age + ' ' + user.gender }</p>
                }
                {
                    user.about && 
                    <p>
                        { user.about }
                    </p>
                }
                {
                    type === 'feed' && 
                    <div className="card-actions justify-end">
                        {/* <div className="badge badge-outline">Fashion</div>
                        <div className="badge badge-outline">Products</div> */}
                        <button className="btn btn-success">Intersted</button>
                        <button className="btn btn-error">Ingore</button>
                    </div>
                }
            </div>
      </div>
    </>
  )
}
