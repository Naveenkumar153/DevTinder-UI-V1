import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { environment } from '../env/env.dev';
import { api } from '../shared/api/api';
import { useNavigate } from 'react-router-dom';
import { showToaster } from '../store/toasterSlice';
import type { ErrorResponse } from '../shared/interfaces/api-error.interface';
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [emailId, setEmailId] = useState<string>('naveen@gmail.com');
    const [password, setPassword] = useState<string>('Naveen@123');
    const [loginLoader, setLoginLoader] = useState<boolean>(false);

    const onLogin = async () => {
        try {
            setLoginLoader(true);
            let response = await api.post<{userId:string, message:string}>(`${environment.url}/signin`, {
                emailId,
                password
            });
            console.log('onßLogin',emailId,password);
            console.log('response',response);
            if(response.status === 200){
                dispatch(
                    showToaster({
                        message: response.data.message,
                        clsName: 'alert-success'
                    })
                )
                navigate('/')
            }
            
        } catch(error:any){
            let message = 'Something went wrong. Please try again.';

            if (axios.isAxiosError<ErrorResponse>(error)) {
                message = error.response?.data?.message ?? message;
            }
             dispatch(
                showToaster({
                    message: error && error['message'],
                    clsName: 'alert-error',
                })
            );
            console.log('response onLogin',error);
        } finally{
            setLoginLoader(false);
        }
    };

    useEffect(() => {
        console.log(emailId,password);
    },[emailId,password]);

  return (
    <div className="flex justify-center h-screen-70 w-auto my-0 ">
        <div className="card w-96 bg-base-400 card-lg shadow-sm">
            <div className="card-body bg-base-300">
                <h2 className="card-title justify-center ">Login</h2>
                <div className="form-group">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email</legend>
                        <input type="email" className="input validator" placeholder="devtinder@devtinder.com" 
                        value={emailId} onChange={(e) => setEmailId(e.target.value)}/>
                        <div className="validator-hint">Enter valid email address</div>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <input type="password" className="input validator" placeholder="password" 
                        value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <div className="validator-hint">Enter valid email address</div>
                    </fieldset>
                </div>
                <div className="justify-center card-actions">

                 <button className="btn btn-primary" onClick={onLogin} disabled={loginLoader}>
                    { loginLoader ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : ( "Login")
                    }
                 </button>
                </div>
            </div>
        </div>
    </div>
  )
}
