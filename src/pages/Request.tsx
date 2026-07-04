import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/app.store";
import { addRequest } from "../store/requestSlice";
import { showToaster } from "../store/toasterSlice";
import { useEffect } from "react";
import type { RequestResponse } from "../shared/interfaces/connection.interface";
import ConnectionCard, { type RequestAction } from "../components/connectionCard";
import { api } from "../shared/api/api";

export default function Request() {


  const dispatch = useDispatch();
  const requestsSelector = useSelector((state:RootState) => state.request.requests);
  const hasRequests = requestsSelector.length > 0;

  const fetchRequests = async () => {
    try {
       const response:any = await api.get<RequestResponse>(`/user/requests/received`);
       console.log('response',response.data.data);
       dispatch(addRequest(response.data.data));
       dispatch(
           showToaster({
               message: 'fetched requests successfully',
               clsName: 'alert-success'
           })
       );
    } catch (error) {
        dispatch(
            showToaster({
                message: 'Failed to fetch requests',
                clsName: 'alert-error'
            })
        );
    } finally {
        
    }
  };

  const handleRequestAction = async (value: RequestAction,id:string) => {
    console.log('handleRequestAction',value,id);
     try {
        const response:any = await api.post(`/request/review/${value}/${id}`, { action: value });
        console.log('response',response.data.data);
        dispatch(
            showToaster({
                message: 'Request action performed successfully',
                clsName: 'alert-success'
            })
        );

     } catch (error) {
        dispatch(
            showToaster({
                message: 'Failed to perform request action',
                clsName: 'alert-error'
            })
        );
     } finally {

     }
  };

  useEffect(() => {
    fetchRequests();
  }, []);


  return (
    <div className="text-center my-10 min-h-screen">
      {hasRequests ? (
        <>
          <h1 className="text-bold text-white text-3xl">Connection Requests</h1>
          {requestsSelector.map((request) => (
            <ConnectionCard
              key={request.fromUserId._id}
              user={request.fromUserId}
              type="request"
              onBtnActionType={handleRequestAction}
            />
          ))}
        </>
      ) : (
        <h1 className="text-bold text-white text-3xl">No Requests Found</h1>
      )}
    </div>
  );
}
