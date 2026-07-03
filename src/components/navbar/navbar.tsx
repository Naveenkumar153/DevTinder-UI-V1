import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/app.store";
import { api } from "../../shared/api/api";
import { environment } from "../../env/env.dev";
import { showToaster } from "../../store/toasterSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../../store/userSlice";
import type { UserProfile } from "../../shared/interfaces/users.interface";

function NavBar(){
    const [ tabIndex, _setTabIndex ] = useState<number>(1);
    const  userSelector = useSelector((state:RootState) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const locaiton = useLocation();

     const onLogout = async () => {
            try {
                let response = await api.post<{message:string}>(`${environment.url}/logout`, {});
                console.log(response.data.message);
                if(response.data.message){
                    dispatch(
                        showToaster({
                            message: response.data.message,
                            clsName: 'alert-success'
                        })
                    );
                    dispatch(removeUser());
                    navigate('/login');
                }
            } catch (error){
                    dispatch(
                        showToaster({
                            message: JSON.stringify(error),
                            clsName: 'alert-success'
                        })
                    );
            }
     };

     const fetchUser = async () => {
           try {
               let profileInfo = await api.get<{data:UserProfile}>(`${environment.url}/user/view`);
               if(profileInfo.data.data){
                   dispatch(addUser(profileInfo.data.data));
               }
           } catch(error){
               console.error(error);
           }
    };

    useEffect(() => {
        if(locaiton.pathname !== '/login' && !userSelector.isAuthenticated){
            fetchUser();
        }
    },[]);

    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <Link to={'/'} className="btn btn-ghost text-xl">👨🏻‍💻 DevTinder</Link>
            </div>
            <div className="flex gap-2">
                <div className="dropdown dropdown-end">
                    {
                        userSelector.details && 
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar flex justify-end min-w-56">
                            <span>Welcome { userSelector.details.firstName }</span>
                            <div className="w-10 rounded-full">
                              <img alt={userSelector.details.about} src={userSelector.details.profilePicture} />
                            </div>
                        </div>
                    }
                <ul
                    tabIndex={tabIndex}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                            <Link to='/profile' className="justify-between">
                                Profile
                            </Link>
                    </li>
                    <li>
                            <Link to='/connection' className="justify-between">
                                Friends
                            </Link>
                    </li>
                    <li>
                            <Link to='/request' className="justify-between">
                                Requests
                            </Link>
                    </li>
                    <li onClick={onLogout}><span>Logout</span></li>
                </ul>
                </div>
            </div>
        </div>
    )
};

export default NavBar;