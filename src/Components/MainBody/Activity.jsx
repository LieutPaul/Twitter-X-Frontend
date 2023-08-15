import React from 'react';
import LeftBar from "../LeftBar/LeftBar";
import MainBody from "./MainBody";
import RightBar from "../RightBar/RightBar";
import { useNavigate } from 'react-router-dom';
import { getAllTweetsByFollowed, getUserId } from '../../TweetAPIs';
import ReactLoading from "react-loading";

export default function Activity() {
  
  const [tweets,setTweets] = React.useState([]);
  const navigate = useNavigate();
  const [userId, setUserId] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		async function getUserIdAndSetUp() {
			const jwt = localStorage.getItem("Twitter JWT");
			if (jwt) {
				setLoading(true);
				const userId = await getUserId(true, setUserId);
				setLoading(false);
				if (userId == null) {
					navigate("/login");
				} else {
					setLoading(true);
					const tweets = await getAllTweetsByFollowed(setTweets);
					setLoading(false);
					if (tweets == null) {
						navigate("/login");
					}
				}
			} else {
				navigate("/login");
			}
		}
		getUserIdAndSetUp();
	}, [navigate]);

	return (
		<div className="layout row">
			<LeftBar userId={userId} leftBarOption={"Activity"}/>
			{ loading === false ? 
				<MainBody compose={false} userId = {userId} allTweets={tweets}/>
				:
				<div className='col-6 flex justify-center items-center h-[100vh]'>
					<ReactLoading type="spin" color="#1D9BF0" height={100} width={50} />
				</div>
			}
			
			<RightBar/>
		</div>  
	);

}
