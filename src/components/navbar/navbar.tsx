import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/app.store";
import { api } from "../../shared/api/api";
import { environment } from "../../env/env.dev";
import { showToaster } from "../../store/toasterSlice";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../../store/userSlice";

function NavBar(){
    const [ tabIndex, setTabIndex ] = useState<number>(1);
    const  userSelector = useSelector((state:RootState) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log('userSelector',userSelector.isAuthenticated);

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
                // logout
            } catch (error){
                    dispatch(
                        showToaster({
                            message: JSON.stringify(error),
                            clsName: 'alert-success'
                        })
                    );
            }
        };

    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">👨🏻‍💻 DevTinder</a>
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
                        <span>
                            <Link to={'/profile'} className="justify-between">
                                Profile
                            </Link>
                        </span>
                    </li>
                    <li onClick={onLogout}><span>Logout</span></li>
                </ul>
                </div>
            </div>
        </div>
    )
};

export default NavBar;