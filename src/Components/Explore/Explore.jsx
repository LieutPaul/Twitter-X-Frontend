import React from 'react'
import './Explore.scss'
import LeftBar from '../LeftBar/LeftBar'
import RightBar from '../RightBar/RightBar'
import { getUserId } from '../../TweetAPIs';
import { useNavigate } from 'react-router-dom';
import { getAllUsersFromSearchedString } from './ExploreAPIs';

export default function Explore() {

    const [userId, setUserId] = React.useState(null);
    const [searchedUsers, setSearchedUsers] = React.useState([]);
    
    const navigate = useNavigate();
    
    React.useEffect(()=>{
        async function setUp(){
            const jwt = localStorage.getItem("Twitter JWT");
            if(jwt){
                if(await getUserId(true,setUserId) == null){
                    navigate("/login")
                }
            }else{
                navigate("/login");
            }
        }
        setUp();
    }, [navigate])

    const handleChange = async (e) => {
        if(e.target.value !== "")
            setSearchedUsers(await getAllUsersFromSearchedString(e.target.value));
        else
            setSearchedUsers([])
    }
    
    return (
        <div className='row'>
            
            <LeftBar userId={userId} leftBarOption={"Explore"}/>
            
            <div className='explore col-6 mt-4'>
                
                <input onChange={handleChange} placeholder='Search Twitter' className='ps-5 pt-3 pb-3 mt-4'></input>
                
                <div className='card-container overflow-y-scroll mt-4 w-[80%] rounded-[10px]'>

                    {searchedUsers.map((user,key) => {
                        return (
                            <div onClick={()=>{navigate(`/profile/${user.id}`)}} key={key} className='user-item mt-2 mb-2 pt-2 pb-2 flex items-center'>
                                <img className="tweet__author-logo w-[49px] h-[49px] rounded-[50%] mr-[20px] ml-[2rem]" src="/images/avatar.png" alt="profile"/>
                                <div className='text-[15px] font-bold mr-[15px] text-[#14171a]'>
                                    {user.name} 
                                </div>
                                <div className='text-[13px] text-[#5b7083]'>
                                    {user.username} 
                                </div>
                            </div>
                        );
                    })}

                </div>
            
            </div>
            
            <RightBar/>
        
        </div>
    )
}
