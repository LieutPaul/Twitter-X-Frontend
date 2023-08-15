import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

export default function LikesRetweetsModal({likes, showModal, setShowModal, retweets}) {
    
    const navigate = useNavigate();
    
    return (
        
        <Modal show={showModal} onHide={() => {setShowModal(false);}}>
            <Modal.Header closeButton>
                <div className='w-full flex justify-between items-center'>
                    <div className='font-bold text-[20px]'>{likes !== null ? "Likes" : "Retweets"}</div>
                </div>
            </Modal.Header>

            <Modal.Body>
                
                {likes !== null && 
                    likes.map((like,key) => {
                        return(
                            <div onClick={()=>{navigate(`/profile/${like.user.id}`)}} key={key} className='user-item mt-2 mb-2 pt-2 pb-2 flex items-center hover:bg-[#f0f0f0] hover:cursor-pointer'>
                                <img className="tweet__author-logo w-[49px] h-[49px] rounded-[50%] mr-[20px] ml-[2rem]" src="/images/avatar.png" alt="profile"/>
                                <div className='text-[15px] font-bold mr-[15px] text-[#14171a]'>
                                    {like.user.name} 
                                </div>
                                <div className='text-[13px] text-[#5b7083]'>
                                    {like.user.username} 
                                </div>
                            </div>
                        );
                    })
                }
                
                {retweets !== null && 
                    retweets.map((retweet,key) => {
                        return(
                            <div onClick={()=>{navigate(`/profile/${retweet.user.id}`)}} key={key} className='user-item mt-2 mb-2 pt-2 pb-2 flex items-center hover:bg-[#f0f0f0] hover:cursor-pointer'>
                                <img className="tweet__author-logo w-[49px] h-[49px] rounded-[50%] mr-[20px] ml-[2rem]" src="/images/avatar.png" alt="profile"/>
                                <div className='text-[15px] font-bold mr-[15px] text-[#14171a]'>
                                    {retweet.user.name} 
                                </div>
                                <div className='text-[13px] text-[#5b7083]'>
                                    {retweet.user.username} 
                                </div>
                            </div>
                        );
                    })
                }

            </Modal.Body>
        </Modal>

    );
}
