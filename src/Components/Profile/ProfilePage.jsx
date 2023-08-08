import React from 'react'
import { followUser, getFollowersLength, getFollowingsLength, getLikedTweetsByUser, getRetweetedTweetsByUser, getTweetsByUser, getUserFromId, isUserFollowing, unFollowUser } from './ProfileAPIs';
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
    const [following, setFollowing] = React.useState(false);

    const [followersLength,setFollowersLength] = React.useState([]);
    const [followingsLength,setFollowingsLength] = React.useState([]);

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
                        let res = await getUserFromId(profileId);
                        setProfile(res);
                        res = await isUserFollowing(profileId);
                        setFollowing(res);
                        res = await getFollowersLength(profileId);
                        setFollowersLength(res);
                        res = await getFollowingsLength(profileId);
                        setFollowingsLength(res);
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
                    
                    <div className='flex flex-col w-full'>
                        
                        <img className="tweet__author-logo w-[150px] h-[150px] rounded-[50%] mr-[10px]" src="/images/avatar.png" alt="profile"/>
                        
                        <div className='row'>
                            
                            <div className='col-8 flex flex-col justify-center'>
                                <div className='text-[20px] font-bold mt-3'>
                                    {profile === null ? "This user Does not exist" : profile.name}
                                </div>
                                <div className='text-[15px] text-[#6b767c]'>
                                    {profile !== null && "@"+profile.username}
                                </div>
                            </div>

                            <div className='col-4 flex flex-col justify-center'>
                                {userId === profileId ?
                                    
                                    <div className='text-right'>
                                        <button onClick={()=>{setShowEditProfile(true);}} className='mb-2 hover:bg-[#d3d3d3] ps-3 pe-3 rounded-[20px] font-bold border-1 border-[grey] w-[130px] h-[35px]'>Edit Profile</button>
                                        <EditProfileModal bio = {profile.bio} name={profile.name} username={profile.username} setShowEditProfile={setShowEditProfile} showEditProfile={showEditProfile}/>
                                    </div>
                                :
                                
                                    <div className='text-right'>
                                        
                                            <button onClick = { async () => {
                                                
                                                let res;
                                                
                                                if(following)
                                                    res = await unFollowUser(profileId);
                                                else
                                                    res = await followUser(profileId);
                                
                                                if(res)
                                                    window.location.reload();
                                                else
                                                    alert("error");
                                                
                                            }} className={`mb-2 ${following === true ? "hover:bg-red-100 hover:text-red-600" : "hover:bg-black hover:text-white"} ps-3 pe-3 rounded-[20px] font-bold border-1 border-[grey] w-[120px] h-[35px]`}>{following ? "Unfollow" : "Follow"}</button>
                                    </div>
                                }
                            </div>
                        
                        </div>


                        <div className='text-[15px] mt-4 text-left w-[full]'>
                            {profile !== null && profile.bio !==null && profile.bio}
                        </div>
                        
                        <div className='mt-3'>
                            <b>{followingsLength?.length}</b> <span className='hover:underline hover:cursor-pointer text-[#6b767c] mr-2' onClick={()=>{navigate(`/followings/${profileId}`)}}>Following</span> 
                            <b>{followersLength?.length}</b> <span className='hover:underline hover:cursor-pointer text-[#6b767c]' onClick={()=>{navigate(`/followers/${profileId}`)}}>Followers</span>
                        </div>
                        
                        {userId === profileId &&  
                            <button onClick={()=>{
                                    localStorage.removeItem("Twitter JWT");
                                    window.location.reload();
                                }} className='mt-3 hover:bg-[#d3d3d3] ps-3 pe-3 rounded-[20px] font-bold border-1 border-[grey] w-[100px] h-[40px]'>Logout</button>
                        }
                    
                    </div>
                    
                </div>
                
                {profile !== null && 
                    
                    <div>

                        <div className='text-[25px] font-bold mt-4 '>All Tweets</div>
                        {tweets.map((userTweet,index)=>{
                            return <Tweet 
                                key={index} 
                                tweetId={userTweet.id}
                                tweetUserId = {userTweet.user.id}
                                createdAt = {userTweet.createdAt}
                                userId={userId}
                                name={userTweet.user.name || userTweet.user.email} 
                                handle={userTweet.user.username} 
                                content={userTweet.content}
                                likes={userTweet.likes}
                                retweets={userTweet.retweets}
                                comments={userTweet.comments.length}
                                imageSrc = {userTweet.image}
                            />
                        })}

                        <div className='text-[25px] font-bold mt-4 '>Liked Tweets</div>
                        {likedTweets.map((userTweet,index)=>{
                            userTweet = userTweet.tweet;
                            return <Tweet 
                                key={index} 
                                tweetId={userTweet.id}
                                tweetUserId = {userTweet.user.id}
                                createdAt = {userTweet.createdAt}
                                userId={userId}
                                name={userTweet.user.name || userTweet.user.email} 
                                handle={userTweet.user.username} 
                                content={userTweet.content}
                                likes={userTweet.likes}
                                retweets={userTweet.retweets}
                                comments={userTweet.comments.length}
                                imageSrc = {userTweet.image}
                            />
                        })}

                        <div className='text-[25px] font-bold mt-4 mb-4'>Retweeted Tweets</div>
                        {retweetedTweets.map((userTweet,index)=>{
                            userTweet = userTweet.tweet;
                            return <Tweet 
                                key={index} 
                                tweetId={userTweet.id}
                                tweetUserId = {userTweet.user.id}
                                createdAt = {userTweet.createdAt}
                                userId={userId}
                                name={userTweet.user.name || userTweet.user.email} 
                                handle={userTweet.user.username} 
                                content={userTweet.content}
                                likes={userTweet.likes}
                                retweets={userTweet.retweets}
                                comments={userTweet.comments.length}
                                imageSrc = {userTweet.image}
                            />
                        })}
                    
                    </div>

                }
            
            </div>
            
            <RightBar/>
        
        </div>
    )
}
