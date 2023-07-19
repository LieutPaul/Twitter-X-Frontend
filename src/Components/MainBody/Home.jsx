import React from 'react';
import LeftBar from "../LeftBar/LeftBar";
import MainBody from "./MainBody";
import RightBar from "../RightBar/RightBar";
import { useNavigate } from 'react-router-dom';
import { getAllTweets, getUserId } from '../../TweetAPIs';

function Home() {
  
  const [tweets,setTweets] = React.useState([]);
  const navigate = useNavigate();
  const [userId, setUserId] = React.useState(null);

  React.useEffect(() => {
    async function getUserIdAndSetUp() {
      const jwt = localStorage.getItem("Twitter JWT");
      if (jwt) {
        const userId = await getUserId(true, setUserId);
        if (userId == null) {
          navigate("/login");
        } else {
          const tweets = await getAllTweets(setTweets);
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
      <LeftBar userId={userId} leftBarOption={"Home"}/>
      <MainBody userId = {userId} allTweets={tweets}/>
      <RightBar/>
    </div>  
  );

}

export default Home;
