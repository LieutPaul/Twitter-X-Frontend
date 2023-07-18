import React from 'react';
import LeftBar from "./Components/LeftBar/LeftBar";
import MainBody from "./Components/MainBody/MainBody";
import RightBar from "./Components/RightBar/RightBar";
import { useNavigate } from 'react-router-dom';
import { getAllTweets } from './TweetAPIs';

function Home() {
  
  const [leftBarOption, setLeftBarOption] = React.useState("Home");
  const [tweets,setTweets] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(()=>{
      const jwt = localStorage.getItem("Twitter JWT");
      if(jwt){
          if(getAllTweets(setTweets) == null){
            navigate("/login");
          }
      }else{
          navigate("/login");
      }
  },[navigate,tweets]);


  return (
    <div className="layout row">
      <LeftBar leftBarOption={leftBarOption} setLeftBarOption={setLeftBarOption}/>
      <MainBody leftBarOption={leftBarOption} userTweets={tweets}/>
      <RightBar/>
    </div>  
  );
}

export default Home;
