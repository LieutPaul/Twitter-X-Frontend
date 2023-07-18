import React from 'react'

import {FaRegComment} from 'react-icons/fa'
import {FiShare2} from 'react-icons/fi'

import LikeButton from './LikeButton';
import RetweetButton from './RetweetButton';


export default function Tweet({tweetId,userId, name,handle,time,content,comments,retweets,likes}) {
    
    const postLiked = likes.some((like) => like.userId === userId);
    const postRetweeted = retweets.some((like) => like.userId === userId);

    return (
        <div className='tweet flex mb-4 mt-4 w-full'>
            
            <img className="tweet__author-logo w-[49px] h-[49px] rounded-[50%] mr-[10px]" src="/images/avatar.png" alt="profile"/>
            
            <div className='tweet__main w-[80%]'>
                
                <div className='tweet__header flex'>
                    <div className='tweet__author-name text-[15px] font-bold mr-[5px] text-[#14171a]'>
                        {name}
                    </div>
                    <div className='tweet__author-handle text-[15px] text-[#5b7083] '>
                        {handle}
                    </div>
                    <div className='tweet__published-time text-[15px] ml-[5px] text-[#657786]'>
                        {time}
                    </div>
                </div>

                <div className='tweet__content'>
                    {content}
                </div>

                <div className='tweet__reactions w-full mt-2 flex justify-between'>
                    
                    <div className=''>
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            <FaRegComment style={{ marginRight: '7.5px' }} />
                            {comments}
                        </span>
                    </div>

                    <RetweetButton userId={userId} tweetId={tweetId} postRetweeted={postRetweeted} retweets={retweets}/>

                    <LikeButton userId={userId} tweetId={tweetId} postLiked={postLiked} likes={likes} />
                    
                    <div className=''>
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            <FiShare2 />
                        </span>
                    </div>

                </div>

            </div>
        
        </div>
    )
}
