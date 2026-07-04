import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showToaster } from '../store/toasterSlice';
import axios from 'axios';
import { addUser } from '../store/userSlice';
import type { UserProfile } from '../shared/interfaces/users.interface';
import type { ErrorResponse } from '../shared/interfaces/api-error.interface';
import { api } from '../shared/api/api';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [switchForm, setSwitchForm] = useState<boolean>(false);
    const [emailId, setEmailId] = useState<string>('naveen@gmail.com');
    const [password, setPassword] = useState<string>('Naveen@123');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [loginLoader, setLoginLoader] = useState<boolean>(false);

    const onLogin = async () => {
        try {
            setLoginLoader(true);
            const endpoint = switchForm ? `/signup` : `/signin`;
            const payload = switchForm ? { firstName, lastName, emailId, password } : { emailId, password };
            let response = await api.post<{user:UserProfile, message:string}>(endpoint, payload);
            if(response.status === 200 || response.status === 201){
                dispatch(
                    showToaster({
                        message: response.data.message,
                        clsName: 'alert-success'
                    })
                );
                dispatch(addUser(response.data.user));
                switchForm ? navigate('/profile') : navigate('/')
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
    <div className="flex justify-center  my-0 scale-95">
        <div className="card w-96 bg-base-400 card-lg shadow-sm">
            <div className="card-body bg-base-300">
                <h2 className="card-title justify-center ">{switchForm ? "Sign Up" : "Sign In"}</h2>
                <div className="form-group">
                    {
                        switchForm && 
                            (
                                <>
                                    <fieldset className="fieldset pt-0">
                                        <legend className="fieldset-legend pt-0">First Name</legend>
                                        <input type="text" className="input validator outline-none" placeholder="John" 
                                        value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                                        <div className="validator-hint mt-0">Enter your first name</div>
                                    </fieldset>
                                    <fieldset className="fieldset pt-0">
                                        <legend className="fieldset-legend pt-0">Last Name</legend>
                                        <input type="text" className="input validator outline-none" placeholder="Doe" 
                                        value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                                        <div className="validator-hint mt-0">Enter your last name</div>
                                    </fieldset>
                                </>
                            )
                    }
                    <fieldset className="fieldset pt-0">
                        <legend className="fieldset-legend pt-0">Email</legend>
                        <input type="email" className="input validator outline-none" placeholder="devtinder@devtinder.com" 
                        value={emailId} onChange={(e) => setEmailId(e.target.value)}/>
                        <div className="validator-hint mt-0">Enter valid email address</div>
                    </fieldset>
                    <fieldset className="fieldset pt-0">
                        <legend className="fieldset-legend pt-0">Password</legend>
                        <label className="input validator outline-none">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                            >
                            <path
                                d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                            ></path>
                            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </g>
                        </svg>
                        <input
                            type="password"
                            required
                            placeholder="Password"
                            className="input validator outline-none"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                            <svg className="h-[1em] opacity-50 size-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>

                        </label>
                        <div className="validator-hint mt-0">Enter valid email address</div>
                    </fieldset>
                </div>
                <div className="justify-center card-actions">
                 <button className="btn btn-primary" onClick={onLogin} disabled={loginLoader}>
                    { loginLoader ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : switchForm ? ( "Sign Up" ) : ( "Sign In" )
                    }
                 </button>
                </div>

                <div className="divider">OR</div>
                <div className="justify-center card-actions">
                    <input type="checkbox" className="toggle" onChange={() => setSwitchForm(!switchForm)}/>
                    <span className="text-white">{ switchForm ? "Sign Up" : "Sign In" }</span>
                </div>
            </div>
        </div>
    </div>
  )
}
