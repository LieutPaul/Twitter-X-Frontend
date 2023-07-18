import React from 'react'
import { reTweet, unReTweet } from '../../TweetAPIs'
import { FaRetweet } from 'react-icons/fa'

export default function RetweetButton({userId, tweetId, postRetweeted,retweets}) {
  return (
    <div>
        
        <span style={{ display: 'flex', alignItems: 'center' }}>
            
            {postRetweeted ? 
                
                <FaRetweet 
                onClick = { async ()=>{
                    if(await unReTweet(userId,tweetId)){
                        window.location.reload();
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
                    if(await reTweet(userId,tweetId)){
                        window.location.reload();
                    }
                }} 
                style={{ marginRight: '7.5px' }} 
                className='hover:cursor-pointer'
                size={22}
                /> 
            
                }
            
            {retweets.length}
        </span>
    
    </div>
  )
}
