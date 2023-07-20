import React from 'react'
import { getLikedTweetsByUser, getRetweetedTweetsByUser, getTweetsByUser, getUserFromId } from './ProfileAPIs';
import Tweet from '../Tweet/Tweet';
import { useNavigate, useParams } from 'react-router-dom';
import LeftBar from '../LeftBar/LeftBar';
import RightBar from '../RightBar/RightBar';
import { getUserId } from '../../TweetAPIs';
import EditProfileModal from './EditProfileModal';

export default function ProfilePage() {
    const navigate = useNavigate();
    
    var {profileId} = useParams();
    profileId = Number(profileId);
    
    const [userId,setUserId] = React.useState(null);
    const [tweets, setTweets] = React.useState([]);
    const [likedTweets, setLikedTweets] = React.useState([]);
    const [retweetedTweets, setRetweetedTweets] = React.useState([]);
    const [profile, setProfile] = React.useState({});
    const [showEditProfile, setShowEditProfile] = React.useState(false);

    React.useEffect(()=>{
        async function setUp(){
            const jwt = localStorage.getItem("Twitter JWT");
            if(jwt){
                if(await getUserId(true,setUserId) == null){
                    navigate("/login")
                }else{
                    if(await getTweetsByUser(profileId,setTweets) == null || 
                    await getLikedTweetsByUser(profileId,setLikedTweets) == null || 
                    await getRetweetedTweetsByUser(profileId,setRetweetedTweets) == null){
                        navigate("/login");
                    }else{
                        const res = await getUserFromId(profileId);
                        setProfile(res);
                    }
                }
            }else{
                navigate("/login");
            }
        }
        setUp();
    }, [userId, profileId, navigate])
    
    return (
        <div className='row'>
            <LeftBar userId={userId} leftBarOption={"Profile"} />
            <div className='col-6 mt-4'>
                
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col items-center justify-center'>
                        <img className="tweet__author-logo w-[150px] h-[150px] rounded-[50%] mr-[10px]" src="/images/avatar.png" alt="profile"/>
                        <div className='text-[20px] font-bold mt-3'>
                            {profile === null ? "This user Does not exist" : profile.name}
                        </div>
                        <div className='text-[15px] text-[#6b767c]'>
                            {profile !== null && "@"+profile.username}
                        </div>
                    </div>
                    {userId === profileId && 
                        <button onClick={()=>{setShowEditProfile(true);}} className='hover:bg-[#d3d3d3] ps-3 pe-3 rounded-[20px] font-bold border-1 border-[grey] h-[40px]'>Edit Profile</button>
                    }
                    <EditProfileModal bio = {profile.bio} name={profile.name} username={profile.username} setShowEditProfile={setShowEditProfile} showEditProfile={showEditProfile}/>
                </div>
                

                <div>
                    
                    <div className='text-[25px] font-bold mt-4 '>All Tweets</div>
                    {tweets.map((userTweet,index)=>{
                        return <Tweet 
                            key={index} 
                            tweetId={userTweet.id}
                            userId={userId}
                            name={userTweet.user.name || userTweet.user.email} 
                            handle={userTweet.user.username} 
                            time={"9h"} 
                            content={userTweet.content}
                            likes={userTweet.likes}
                            retweets={userTweet.retweets}
                            comments={0}
                        />
                    })}

                    <div className='text-[25px] font-bold mt-4 '>Liked Tweets</div>
                    {likedTweets.map((userTweet,index)=>{
                        userTweet = userTweet.tweet;
                        return <Tweet 
                            key={index} 
                            tweetId={userTweet.id}
                            userId={userId}
                            name={userTweet.user.name || userTweet.user.email} 
                            handle={userTweet.user.username} 
                            time={"9h"} 
                            content={userTweet.content}
                            likes={userTweet.likes}
                            retweets={userTweet.retweets}
                            comments={0}
                        />
                    })}

                    <div className='text-[25px] font-bold mt-4 '>Retweeted Tweets</div>
                    {retweetedTweets.map((userTweet,index)=>{
                        userTweet = userTweet.tweet;
                        return <Tweet 
                            key={index} 
                            tweetId={userTweet.id}
                            userId={userId}
                            name={userTweet.user.name || userTweet.user.email} 
                            handle={userTweet.user.username} 
                            time={"9h"} 
                            content={userTweet.content}
                            likes={userTweet.likes}
                            retweets={userTweet.retweets}
                            comments={0}
                        />
                    })}
                </div>
            </div>
            <RightBar/>
        </div>
    )
}
