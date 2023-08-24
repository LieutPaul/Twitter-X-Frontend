import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addComment, getTweetFromId, getUserId } from '../../TweetAPIs';
import {BiArrowBack} from 'react-icons/bi'
import Tweet from './Tweet';
import LeftBar from '../LeftBar/LeftBar';
import RightBar from '../RightBar/RightBar';
import ReactLoading from "react-loading";

export default function TweetPage() {
    
    const textareaRef = React.useRef(null);
    
    const { tweetId } = useParams();
    const [userId, setUserId] = React.useState(null);
    const [tweet, setTweet] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [comment, setComment] = React.useState("");

    const navigate = useNavigate();

    React.useEffect(() => {
        const textarea = textareaRef.current;
        const adjustTextareaHeight = () => {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        };

        if (textarea) {
            textarea.addEventListener('input', adjustTextareaHeight);
        }

        return () => {
            if (textarea) {
                textarea.removeEventListener('input', adjustTextareaHeight);
            }
        };
    }, []);

    React.useEffect(() => {
        async function setUp() {
            const jwt = localStorage.getItem("Twitter JWT");
            if (jwt) {
                const fetchedUserId = await getUserId(true, setUserId);
                if (fetchedUserId === null) {
                    navigate("/login");
                } else {
                    const res = await getTweetFromId(tweetId);
                    if (res === null) {
                        navigate("/login");
                    } else {
                        setTweet(res);
                        setLoading(false);
                    }
                }
            } else {
                navigate("/login");
            }
        }
        
        setUp();
    }, [tweetId, userId, navigate]);

    async function AddCommentToPost(){
        await addComment(userId,tweetId,comment);
        window.location.reload();
    }

    return (
        <div className="layout row">
            
            <LeftBar userId={userId} leftBarOption={"Home"}/>
            
            {loading === false ? 
                <div className='col-6'>
                    
                    <div className='flex font-bold text-[25px] mt-3 mb-2'> 
                        <BiArrowBack onClick={() => {navigate(-1)}} className='mt-2 mr-4 hover:cursor-pointer'/> 
                        Tweet
                    </div>
                    
                    <Tweet 
                        tweetId={tweet.id}
                        tweetUserId = {tweet.user.id}
                        createdAt = {tweet.createdAt}
                        userId={userId}
                        name={tweet.user?.name || tweet.user?.email} 
                        handle={tweet.user?.username} 
                        content={tweet.content}
                        likes={tweet.likes}
                        retweets={tweet.retweets}
                        comments={tweet.comments.length}
                        imageSrc = {tweet.image}
                    />
                    <hr/>
                    <div className='flex justify-between items-center'>
                        <textarea 
                            ref={textareaRef} 
                            style={{"resize": 'none',"overflowY": 'hidden',}}
                            placeholder="Comment on this post" 
                            className='custom-textarea ps-3 pt-1 w-full mr-3' 
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button 
                        disabled={comment.trim() === ""} 
                        className={`font-bold bg-[#1D9BF0] rounded-[20px] text-white ps-4 pt-2 pe-4 pb-2 ${comment.trim() === "" ? "opacity-50" : "hover:opacity-80"}`}
                        onClick={AddCommentToPost}
                        >  
                        Comment
                        </button>
                    </div>
                    <hr/>
                    
                    {tweet.comments.map((comment,index) => {
                        return (
                            <div key={index}  className='flex ps-2 pb-4 pt-4 w-full'>
                                <img className="tweet__author-logo w-[49px] h-[49px] rounded-[50%] mr-[10px]" src="/images/avatar.png" alt="profile"/>
                                <div className='w-[80%]'>
                                    <div className='comment__header mb-1 flex justify-between'>
                                        <div className='flex'>
                                            <div className='comment__author-name text-[15px] font-bold mr-[5px] text-[#14171a]'>
                                                {comment.user.name}
                                            </div>
                                            <div className='comment__author-handle text-[15px] text-[#5b7083] '>
                                                {comment.user.username}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='comment__content'>
                                        {comment.content}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                :
                <div className='col-6 flex justify-center items-center h-[100vh]'>
                    <ReactLoading type="spin" color="#1D9BF0" height={100} width={50} />
				</div>
            }
            
            <RightBar/>
        
        </div>
    )
}
