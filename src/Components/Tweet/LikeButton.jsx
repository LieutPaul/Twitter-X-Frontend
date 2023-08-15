import React from 'react'
import { LikeTweet, unLikeTweet } from '../../TweetAPIs'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import LikesRetweetsModal from './LikesRetweetsModal';

export default function LikeButton({userId, tweetId, postLiked,likes}) {
	const [showLikesModal, setShowLikesModal] = React.useState(false);
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
				
				<span onClick={()=>{setShowLikesModal(true)}} className='hover:text-[#5b7083] hover:underline hover:cursor-pointer'>{likes.length}</span>
				<LikesRetweetsModal setShowModal={setShowLikesModal} showModal={showLikesModal} likes={likes} retweets={null}/>
			
			</span>
		
		</div>
	)
}
