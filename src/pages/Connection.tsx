import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/app.store";
import { environment } from "../env/env.dev";
import { api } from "../shared/api/api";
import { showToaster } from "../store/toasterSlice";
import { setConnections } from "../store/connection";
import type { ConnectionResponse } from "../shared/interfaces/connection.interface";
import ConnectionCard, { type ConnectionAction } from "../components/connectionCard";

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

  const handleConnectionAction = async (value: ConnectionAction) => {
    console.log('handleConnectionAction',value);
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if(connectionSelector.length === 0){
    return (
      <h1>No Connections Found</h1>
    )
  };

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>
        {
          connectionSelector.length && connectionSelector.map((connection) => (
            <ConnectionCard key={connection._id} user={connection} type='connection' onBtnActionType={handleConnectionAction}/>
          ))
        }
    </div>
  )
}
