import React from 'react'
import Tweet from '../Tweet/Tweet'
import './MainBody.scss'
import { postTweet } from '../../TweetAPIs';
import ReactLoading from "react-loading";
import ImagePicker from '../Helper/ImagePicker';

export default function MainBody({userId, allTweets}) {

	const textareaRef = React.useRef(null);
	const [tweet, setTweet] = React.useState("");
	const [file, setFile] = React.useState(null);
	const [uploadingTweet,setUploadingTweet] = React.useState(false)

	React.useLayoutEffect(() => {
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

	const addTweet = async () => {
		setUploadingTweet(true);
		const response = await postTweet(tweet,file);
		setUploadingTweet(false);
		if(response && response.data){
			window.location.reload();
		}else{
			alert("Error in adding Tweet");
		}
	}

  	return (
		
		uploadingTweet === false ? 
		
			<div className='col-6 mt-4'>
				<span className='font-bold text-lg mt-2'>Home</span>
				
				<div className='compose-tweet'>
					
					<div className='flex items-center mt-6'>
						
						<img className="tweet__author-logo w-[49px] h-[49px] rounded-[50%] mr-[10px]" src="/images/avatar.png" alt="profile"/>
						
						<div className='font-medium text-[20px] w-full ps-3'>
							<textarea 
								ref={textareaRef} 
								style={{"resize":"none", "overflowY":"hidden"}} 
								placeholder="What is Happening?" 
								className='custom-textarea pt-1 w-full' 
								onChange={(e) => setTweet(e.target.value)}
							/>
							
							<ImagePicker file={file} setFile={setFile}/>
						
						</div>
					
					</div>
					
					<div className='text-right mt-6 mb-3'>
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
		
		: 
		
			<ReactLoading type="spokes" color="#0000FF" height={100} width={50} />
	)
}
