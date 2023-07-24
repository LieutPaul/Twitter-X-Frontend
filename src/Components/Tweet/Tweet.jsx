import React from 'react'
import {FaRegComment} from 'react-icons/fa'
import {FiShare2} from 'react-icons/fi'
import {TfiNewWindow} from 'react-icons/tfi'
import LikeButton from './LikeButton';
import RetweetButton from './RetweetButton';
import { useNavigate } from 'react-router-dom';


export default function Tweet({tweetId,userId, name,handle,time,content,comments,retweets,likes}) {
    
    const postLiked = likes.some((like) => like.userId === userId);
    const postRetweeted = retweets.some((like) => like.userId === userId);
    const navigate = useNavigate();
    
    return (
        <div className='tweet flex ps-2 pb-4 pt-4 w-full'>
            
            <img className="tweet__author-logo w-[49px] h-[49px] rounded-[50%] mr-[10px]" src="/images/avatar.png" alt="profile"/>
            
            <div className='tweet__main w-[80%]'>
                
                <div className='tweet__header mb-1 flex justify-between'>
                    <div className='flex'>
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
                    <div>
                        <TfiNewWindow className='hover:cursor-pointer' onClick={()=>{navigate(`/home/tweet/${tweetId}`)}}/>
                    </div>
                </div>

                <div className='tweet__content'>
                    {content}
                </div>

                <div className='tweet__reactions w-full mt-2 flex justify-between'>
                    
                    <div className=''>
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            <FaRegComment className="hover:cursor-pointer" onClick={()=>{navigate(`/home/tweet/${tweetId}`)}} style={{ marginRight: '7.5px' }} />
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
