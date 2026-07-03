import { useState } from "react";
import type { Feed } from "../shared/interfaces/feed.interface";

type CardType = 'feed' | 'userInfo';
type SwipeDirection = 'left' | 'right';
interface UserCardProps {
    user: Feed;
    index?: number;
    isTop?: boolean;
    type?: CardType;
    onSwipe?: (userId: string, dir: SwipeDirection) => void;
}

const SWIPE_ANIMATION_DURATION = 500;

export default function UserCard({ user, index = 0, isTop = false, type = 'feed', onSwipe }:UserCardProps) {

    const [direction, setDirection] = useState("");

    const swipe = (dir: SwipeDirection) => {
        if (direction) return;
        setDirection(dir);
        setTimeout(() => {
            onSwipe?.(user._id, dir);
        }, SWIPE_ANIMATION_DURATION);
    };

  const baseTransform = `scale(${1 - index * 0.05}) translateY(${index * 12}px)`;
  const swipeTransform =
    isTop && direction === "left"
      ? "translateX(-500px) rotate(-25deg)"
      : isTop && direction === "right"
      ? "translateX(500px) rotate(25deg)"
      : "";

  return (
    <>
       <div  className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500"
                style={{
                  transform: `${baseTransform} ${swipeTransform}`,
                  opacity: isTop && direction ? 0 : 1,
                  zIndex: 100 - index,
                }}>
            <figure className="absolute inset-0">
                {
                    user.profilePicture &&
                <img className="w-full h-full object-cover" src={user.profilePicture} alt={user.firstName || user.lastName} />
                }
            </figure>
            <div className="card-body absolute bottom-0 left-0 w-full bg-linear-to-t from-black via-black/40 to-transparent p-6 flex flex-col gap-1">
                  <h2 className="text-white text-3xl font-bold">
                        { user.firstName + ' ' + user.lastName }
                  </h2>
                {
                 user.age && user.gender &&  <p className="text-white/90">{ user.age + ' ' + user.gender }</p>
                }
                {
                    user.about &&
                    <p className="text-white/80 text-sm">
                        { user.about }
                    </p>
                }
                {
                    type === 'feed' && isTop &&
                    <div className="card-actions justify-center mt-3">
                        <button onClick={() => swipe('right')} className="px-8 py-3 rounded-full bg-green-500 text-white text-xl hover:scale-110 transition"> ❤️</button>
                        <button onClick={() => swipe('left')} className="px-8 py-3 rounded-full bg-red-500 text-white text-xl hover:scale-110 transition">❌</button>
                    </div>
                }
            </div>
      </div>
    </>
  )
}
