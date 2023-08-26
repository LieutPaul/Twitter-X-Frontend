import React from 'react'
import { reTweet, unReTweet } from '../../TweetAPIs'
import { FaRetweet } from 'react-icons/fa'
import LikesRetweetsModal from './LikesRetweetsModal';

export default function RetweetButton({userId, tweetId, postRetweeted, retweets, setRetweetLoading}) {

    const handleBeforeReload = () => {
        localStorage.setItem('scrollPosition', window.scrollY);
    };
    
    React.useEffect(() => {
        const savedScrollPosition = localStorage.getItem('scrollPosition');
        if (savedScrollPosition) {
            window.scrollTo(0, parseInt(savedScrollPosition, 10));
        }
        localStorage.removeItem('scrollPosition');
    }, []);
    
    React.useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeReload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeReload);
        };
    }, []);
    
    const [showRetweetsModal, setShowRetweetsModal] = React.useState(false);
    
    return (
        
        <div>
            
            <span style={{ display: 'flex', alignItems: 'center' }}>
                
                {postRetweeted ? 
                    
                    <FaRetweet 
                        onClick = { async ()=>{
                            setRetweetLoading(true);
                            if(await unReTweet(userId,tweetId)){
                                window.location.reload();
                            }else{
								setRetweetLoading(false);
								alert("Could not un-retweet the tweet.")
							}
                        }} 
                        color={"green"}
                        className='hover:cursor-pointer' 
                        style={{ marginRight: '7.5px' }} 
                        size={22}
                    />
                    
                    :
                    
                    <FaRetweet 
                        onClick = { async ()=>{
                            setRetweetLoading(true);
                            if(await reTweet(userId,tweetId)){
                                window.location.reload();
                            }else{
								setRetweetLoading(false);
								alert("Could not retweet the tweet.")
							}
                        }} 
                        style={{ marginRight: '7.5px' }} 
                        className='hover:cursor-pointer'
                        size={22}
                    /> 
                
                    }
                
                    <span onClick={()=>{setShowRetweetsModal(true)}} className='hover:text-[#5b7083] hover:underline hover:cursor-pointer'>{retweets.length}</span>
                <LikesRetweetsModal setShowModal={setShowRetweetsModal} showModal={showRetweetsModal} likes={null} retweets={retweets}/>
            
            </span>
        
        </div>
    );
}
