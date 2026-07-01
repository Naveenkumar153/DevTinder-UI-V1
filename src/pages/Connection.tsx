import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/app.store";
import { environment } from "../env/env.dev";
import { api } from "../shared/api/api";
import { showToaster } from "../store/toasterSlice";
import { setConnections } from "../store/connection";
import type { ConnectionResponse } from "../shared/interfaces/connection.interface";

export default function Connection() {

  const dispatch = useDispatch();
  const connectionSelector = useSelector((state:RootState) => state.connection.connections);

  const fetchConnections = async () => {
    try {
       const response = await api.get<ConnectionResponse>(`${environment.url}/user/connections`);
       console.log('response',response.data);
       dispatch(setConnections(response.data.data));
       dispatch(
           showToaster({
               message: 'fetched connections successfully',
               clsName: 'alert-success'
           })
       );
    } catch (error) {
        dispatch(
            showToaster({
                message: 'Failed to fetch connections',
                clsName: 'alert-error'
            })
        );
    } finally {

    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if(connectionSelector.length === 0){
    return (
      <h1>No Connections Found</h1>
    )
  };

  console.log('connectionSelector',connectionSelector);
  
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>
        {
          connectionSelector.length && connectionSelector.map((connection) => (
            <div key={connection.toUserId._id} className="bg-gray-800 p-4 rounded-lg shadow-md my-4 max-w-1/2 mx-auto flex items-center">
              <div className="avatar ">
                <div className="w-20 rounded-full">
                  <img className="w-20 rounded-full" src={connection.toUserId.profilePicture} alt={`${connection.toUserId.firstName} ${connection.toUserId.lastName}`} />
                </div>
              </div>
              <div className="text-left ml-5  flex justify-between items-center w-full">
                <div className='-mt-8'>
                  <h2 className="text-xl text-white">
                    {connection.toUserId.firstName} {connection.toUserId.lastName}
                  </h2>
                  <p className="text-gray-400">{connection.toUserId.about}</p>
                </div>
                <div className="flex gap-2 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                  </svg>

                </div>
              </div>
            </div>
          ))
        }
    </div>
  )
}
