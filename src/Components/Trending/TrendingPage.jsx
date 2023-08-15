import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getTweetsFromTrend } from './TrendingPageAPI';
import LeftBar from '../LeftBar/LeftBar';
import MainBody from '../MainBody/MainBody';
import RightBar from '../RightBar/RightBar';
import ReactLoading from "react-loading";
import { getUserId } from '../../TweetAPIs';

export default function TrendingPage() {
    
    const searchParams = new URLSearchParams(useLocation().search);
    const trend = searchParams.get('trend').toLowerCase();
    const navigate = useNavigate(); 

    const [trendingTweets, setTrendingTweets] = React.useState([]);
    const [userId, setUserId] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(()=>{
        async function tweetsFromTrend(){
            const jwt = localStorage.getItem("Twitter JWT");
            if (jwt) {
                const userId = await getUserId(true, setUserId);
                if (userId == null) {
                    navigate("/login");
                } else{
                    setTrendingTweets(await getTweetsFromTrend(trend));
                }
            }
        }
        setLoading(true);
        tweetsFromTrend();
        setLoading(false);
    }, [trend, navigate]);
    
    return (
        <div className="row">
            <LeftBar userId={userId} leftBarOption={"Explore"}/>
            { loading === false ? 
				<MainBody trending={trend} compose = {false} userId = {userId} allTweets={trendingTweets}/>
				:
				<div className='col-6 flex justify-center items-center h-[100vh]'>
					<ReactLoading type="spin" color="#1D9BF0" height={100} width={50} />
				</div>
			}
            
            <RightBar/>
        </div>  
    )
}
