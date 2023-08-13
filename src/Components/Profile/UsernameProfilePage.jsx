import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getUserFromUsername } from './ProfileAPIs';
import ReactLoading from "react-loading";

export default function UsernameProfilePage() {
	const navigate = useNavigate();
    var {username} = useParams();
	
	React.useEffect(()=>{
		async function getUserId(){
			const user = await getUserFromUsername(username);
			if(user == null){
				navigate("/profile/-1");
			}else{
				navigate(`/profile/${user.id}`);
			}
		}
		getUserId();
	},[navigate,username])
	
	return (
		<div className='bg-[#CFD9DE] h-[100vh] flex justify-center items-center'>
			<ReactLoading type="spokes" color="#0000FF" height={100} width={50} />
		</div>
	)
}
