import React from 'react'
import { LikeTweet, unLikeTweet } from '../../TweetAPIs'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'

export default function LikeButton({userId, tweetId, postLiked,likes}) {
  return (
    <div>
        
        <span style={{ display: 'flex', alignItems: 'center' }}>
            
            {postLiked ? 
                
                <AiFillHeart 
                onClick = { async ()=>{
                    if(await unLikeTweet(userId,tweetId)){
                        window.location.reload();
                    }
                }} 
                color={"red"}
                className='hover:cursor-pointer' 
                style={{ marginRight: '7.5px' }} 
                size={20}
                />
                
                :
                
                <AiOutlineHeart 
                onClick = { async ()=>{
                    if(await LikeTweet(userId,tweetId)){
                        window.location.reload();
                    }
                }} 
                style={{ marginRight: '7.5px' }} 
                className='hover:cursor-pointer'
                size={20}
                /> 
            
                }
            
            {likes.length}
        </span>
    
    </div>
  )
}
