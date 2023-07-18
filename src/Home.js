import React from 'react';
import LeftBar from "./Components/LeftBar/LeftBar";
import MainBody from "./Components/MainBody/MainBody";
import RightBar from "./Components/RightBar/RightBar";
import { useNavigate } from 'react-router-dom';
import { getAllTweets, getUserId } from './TweetAPIs';
import Explore from './Components/Explore/Explore';

function Home() {
  
  const [leftBarOption, setLeftBarOption] = React.useState("Home");
  
  const [tweets,setTweets] = React.useState([]);
  const [userId, setUserId] = React.useState(null);

  const navigate = useNavigate();

  React.useEffect(()=>{
    async function setUp(){
        const jwt = localStorage.getItem("Twitter JWT");
        if(jwt){
            if(await getUserId(setUserId) == null){
              navigate("/login")
            }
            if(await getAllTweets(setTweets) == null){
              navigate("/login");
            }
        }else{
            navigate("/login");
        }
    }
    setUp();
  },[navigate]);


  return (
    <div className="layout row">
      <LeftBar leftBarOption={leftBarOption} setLeftBarOption={setLeftBarOption}/>
      {leftBarOption === "Home" &&
        <MainBody userId = {userId} leftBarOption={leftBarOption} allTweets={tweets}/>
      }
      {leftBarOption === "Explore" &&
        <Explore leftBarOption={leftBarOption}/>
      }
      <RightBar/>
    </div>  
  );
}

export default Home;
