import { useEffect, useState } from "react";
import type { UserProfile } from "../shared/interfaces/users.interface";

export type ConnectionAction = 'message' | 'remove';
export type RequestAction = 'accepted' | 'rejected';
type CardAction = ConnectionAction | RequestAction;

interface ConnectionCardConnectionProps {
    user: UserProfile;
    type: 'connection';
    onBtnActionType: (action: ConnectionAction, id: string) => void;
}

interface ConnectionCardRequestProps {
    user: UserProfile;
    type: 'request';
    onBtnActionType: (action: RequestAction, id: string) => void;
}

type ConnectionCardProps = ConnectionCardConnectionProps | ConnectionCardRequestProps;

export default function ConnectionCard(props: ConnectionCardProps) {
    const { user, type } = props;
    console.log('ConnectionCard',user);

    const [connectionType, setConnectionType] = useState<{ type: typeof type; btns: CardAction | '', id: string }>({
        type,
        btns: '',
        id: ''
    });

    const handleConnectionAction = (action: ConnectionAction) => {
        setConnectionType((prev) => ({ ...prev, btns: action, id: user._id }));
        if (props.type === 'connection') {
            props.onBtnActionType(action, user._id);
        }
    };

    const handleRequestAction = (action: RequestAction) => {
        setConnectionType((prev) => ({ ...prev, btns: action, id: user._id }));
        if (props.type === 'request') {
            props.onBtnActionType(action, user._id);
        }
    };

    useEffect(() => {
        console.log('connectionType',connectionType);
    }, [connectionType]);

  return (
        <div key={user._id} className="bg-gray-800 p-4 rounded-lg shadow-md my-4 max-w-1/2 mx-auto flex items-center">
            <div className="avatar ">
            <div className="w-20 rounded-full">
                <img className="w-20 rounded-full" src={user.profilePicture} alt={`${user.firstName} ${user.lastName}`} />
            </div>
            </div>
            <div className="text-left ml-5  flex justify-between items-center w-full">
            <div className='-mt-8'>
                <h2 className="text-xl text-white">
                {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-400">{user.about}</p>
            </div>
            <div className="flex gap-2 cursor-pointer">
                {
                    type === 'connection' ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6" onClick={() => handleConnectionAction('remove')}>
                            <path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6" onClick={() => handleConnectionAction('message')}>
                            <path d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                            </svg>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-outline btn-success" onClick={() => handleRequestAction('accepted')}>
                                Accept
                            </button>
                            <button className="btn btn-outline btn-error" onClick={() => handleRequestAction('rejected')}>
                                Reject
                            </button>
                        </>
                    )
                }
            </div>
            </div>
        </div>
  )
}
