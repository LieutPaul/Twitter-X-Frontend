import React from 'react'
import { getUserId } from '../../TweetAPIs';
import { getFollowings } from './ProfileAPIs';
import { useNavigate, useParams } from 'react-router-dom';
import {BiArrowBack} from 'react-icons/bi'
import LeftBar from '../LeftBar/LeftBar';
import ReactLoading from "react-loading";
import RightBar from '../RightBar/RightBar';

export default function FollowingsPage() {
	const navigate = useNavigate();
    
    var {profileId} = useParams();
    profileId = Number(profileId);
    
    const [userId, setUserId] = React.useState(null);

    const [followings,setFollowings] = React.useState([]);
	const [loading, setLoading] = React.useState(false);

    React.useEffect(()=>{
        async function setUp(){
            const jwt = localStorage.getItem("Twitter JWT");
			setLoading(true);
            if(jwt){
                if(await getUserId(true,setUserId) == null){
					setLoading(false);
                    navigate("/login")
                }else{
					let res = await getFollowings(profileId);
					setFollowings(res);
					setLoading(false);
                }
            }else{
				setLoading(false);
                navigate("/login");
            }
        }
        setUp();
    }, [userId, profileId, navigate])
	
	return (
		<div className='row'>
            <LeftBar userId={userId} leftBarOption={"Profile"} />
			{loading === false ?
				<div className='col-6 mt-4'>
					
					<div className='flex text-[25px] font-bold'>
					<BiArrowBack onClick={() => {navigate(-1)}} className='mt-2 mr-4 hover:cursor-pointer'/> Followings
					</div>
					<div className='card-container overflow-y-scroll mt-4 w-[80%] rounded-[10px]'>
						{followings.map((user,key) => {
							return (
								<div onClick={()=>{navigate(`/profile/${user.following.id}`)}} key={key} className='user-item mt-2 mb-2 pt-2 pb-2 flex items-center hover:bg-[#f0f0f0] hover:cursor-pointer'>
									<img className="tweet__author-logo w-[49px] h-[49px] rounded-[50%] mr-[20px] ml-[2rem]" src="/images/avatar.png" alt="profile"/>
									<div className='text-[15px] font-bold mr-[15px] text-[#14171a]'>
										{user.following.name} 
									</div>
									<div className='text-[13px] text-[#5b7083]'>
										{user.following.username} 
									</div>
								</div>
							);
						})}

					</div>
				</div>
			:
				<div className='col-6 flex justify-center items-center h-[100vh]'>
					<ReactLoading type="spin" color="#1D9BF0" height={100} width={50} />
				</div>
			}
            <RightBar/>
        </div>
	);
}
