import React from 'react'
import Tweet from '../Tweet/Tweet'
import './MainBody.scss'
import { postTweet } from '../../TweetAPIs';

export default function MainBody({userId, allTweets}) {

  const textareaRef = React.useRef(null);
  const [tweet, setTweet] = React.useState("");

  React.useEffect(() => {
      const textarea = textareaRef.current;
      const adjustTextareaHeight = () => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      };
      textarea.addEventListener('input', adjustTextareaHeight);
      return () => {
        textarea.removeEventListener('input', adjustTextareaHeight);
      };
  }, []);

  const addTweet = async () =>{
      const response = await postTweet(tweet);
      if(response.data){
        window.location.reload();
      }else{
        alert("Error in adding Tweet");
      }
  }

  return (
    <div className='col-6 mt-4'>
        <span className='font-bold text-lg mt-2'>Home</span>
        
        <div className='compose-tweet'>
            
            <div className='flex items-center mt-6'>
                <img className="tweet__author-logo w-[49px] h-[49px] rounded-[50%] mr-[10px]" src="/images/avatar.png" alt="profile"/>
                <div className='font-medium text-[20px] w-full'>
                   <textarea 
                    ref={textareaRef} 
                    style={{"resize":"none", "overflowY":"hidden"}} 
                    placeholder="What is Happening?" 
                    className='custom-textarea ps-3 pt-1 w-full' 
                    onChange={(e) => setTweet(e.target.value)}
                   />
                </div>
            </div>
            
            <div className='text-right mt-6'>
                <button 
                disabled={tweet.trim() === ""} 
                className={`font-bold bg-[#1D9BF0] rounded-[20px] text-white ps-4 pt-2 pe-4 pb-2 ${tweet.trim() === "" ? "opacity-50" : "hover:opacity-80"}`}
                onClick={addTweet}
                >  
                  Tweet
                </button>
            </div>
        </div>

        {allTweets.map((userTweet,index)=>{
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
  )
}
