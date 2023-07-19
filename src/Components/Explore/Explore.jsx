import React from 'react'
import './Explore.scss'
import LeftBar from '../LeftBar/LeftBar'
import RightBar from '../RightBar/RightBar'
import { getUserId } from '../../TweetAPIs';
import { useNavigate } from 'react-router-dom';
export default function Explore({leftBarOption, setLeftBarOption}) {

    const [userId, setUserId] = React.useState(null);
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

    return (
        <div className='row'>
            <LeftBar userId={userId} leftBarOption={"Explore"}/>
                <div className='explore col-6 mt-4'>
                    <div className='font-bold text-lg mt-2'>{leftBarOption}</div> 
                    <input placeholder='Search Twitter' className='ps-5 pt-3 pb-3 mt-4'></input>
                </div>
            <RightBar/>
        </div>
    )
}
