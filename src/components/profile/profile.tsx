import { useEffect, useReducer } from "react";
import { environment } from "../../env/env.dev";
import { api } from "../../shared/api/api";
import type { UserProfile } from "../../shared/interfaces/users.interface";
import type { RootState } from "../../store/app.store";
import { addUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../userCard";
import './profile.css'
import type { Feed } from "../../shared/interfaces/feed.interface";

const initialState:Feed = {
    _id:'',
    firstName:'',
    lastName:'',
    age:'',
    gender:'',
    bio:'',
    profilePicture:'',
    about:'',
    skills:[],
};

type profileAction = 
| { type:'loadData', payload: Feed }
| { type:'updateField', payload: { name: keyof Omit<Feed, 'skills'>, value: string } }
| { type:'setSkills', payload:string[] } 

function profileReducer(state:Feed, action:profileAction):Feed {
     switch (action.type) {
        case 'loadData':
            return { ...action.payload };
        case 'updateField':
            return { ...state, [action.payload.name]: action.payload.value };
        case 'setSkills':
            return { ...state, skills: action.payload };
        default:
            return state;
    }
};


export default function Profile() {
    const  actionDispatch     = useDispatch();
    const  userSelector = useSelector((state:RootState) => state.user.user);
    const  [state, dispatch] = useReducer(profileReducer,initialState)

    const fetchUser = async () => {
      try {
          let profileInfo = await api.get<{data:UserProfile}>(`${environment.url}/user/view`);
          console.log('profileInfo',profileInfo.data.data);
          if(profileInfo.data.data){
              actionDispatch(addUser(profileInfo.data.data));
              dispatch({ type:'loadData', payload: profileInfo.data.data })
          }
      } catch(error){
          console.error(error);
      }
    };
    
    const editProfile = async () => {
        try {
            const updateProfile = {
                firstName:state.firstName || '',
                lastName:state.lastName || '',
                age:state.age || '',
                gender:state.gender?.toLowerCase() || '',
                bio:state.bio || '',
                profilePicture:state.profilePicture || '',
                about:state.about  || '',
                skills:state.skills || [],
            }
            console.log('updateProfile',updateProfile)
            let profileInfo = await api.patch<{message:string}>(`${environment.url}/user/update`,updateProfile);
            console.log('profileInfo',profileInfo.data);
        } catch(error){
            console.error(error);
        }
    };

    useEffect(() => {
      if(!userSelector.details){
          fetchUser();
      }else{
        dispatch({ type:'loadData', payload: userSelector.details})
      }
    },[]);

  return (
    <>
     <div className="flex justify-center h-screen-70 w-auto my-0 scale-70">
        <div className="card w-96 bg-base-400 card-lg shadow-sm">
            <div className="card-body bg-base-300">
                <h2 className="card-title justify-center ">Edit Profile</h2>
                <div className="form-group">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">First Name</legend>
                        <input type="text" className="input validator" placeholder="First Name" 
                        value={state.firstName} onChange={(e) => dispatch({
                            type:'updateField',
                            payload: { name:'firstName', value:e.target.value }
                        })}/>
                        <div className="validator-hint">Enter First Name</div>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Last Name</legend>
                        <input type="text" className="input validator" placeholder="Last Name" value={state.lastName} onChange={(e) => dispatch({
                            type:'updateField',
                            payload: { name:'lastName', value:e.target.value }
                        })}/>
                        <div className="validator-hint">Enter Last Name</div>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Photo URL</legend>
                        <input type="text" className="input validator" placeholder="Photo URL" 
                        value={state.profilePicture} onChange={(e) => dispatch({
                            type:'updateField',
                            payload: { name:'profilePicture', value:e.target.value }
                        })}/>
                        <div className="validator-hint">Enter Photo URL</div>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Age</legend>
                        <input type="number" className="input validator" placeholder="Age" 
                        value={state.age || ''} onChange={(e) => dispatch({
                            type:'updateField',
                            payload: { name:'age', value:e.target.value }
                        })}/>
                        <div className="validator-hint">Enter Age</div>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Gender</legend>
                        <select
                            className="select"
                            value={state.gender}
                            onChange={(e) =>
                                dispatch({
                                    type: "updateField",
                                    payload: {
                                        name: "gender",
                                        value: e.target.value,
                                    },
                                })
                            }
                        >
                            <option value="" disabled>
                                Select Gender
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                    </fieldset>
                    <fieldset className="fieldset" >
                        <legend className="fieldset-legend">About</legend>
                        <textarea className="textarea" placeholder="About" value={state.about} onChange={(e) => dispatch({
                            type:'updateField',
                            payload: { name:'about', value: e.target.value }
                        })}></textarea>
                    </fieldset>
                </div>

                <div className="justify-center card-actions">
                 <button className="btn btn-primary" onClick={editProfile} >
                    Edit Profile
                 </button>
                </div>
            </div>
        </div>
        
        <div className="relative w-80 h-125">
            {
                userSelector.details &&
                <UserCard key={ userSelector.details._id} user={state} type="userInfo"/>
            }
        </div>
    </div>

    </>
  )
}
