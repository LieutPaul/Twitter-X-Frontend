import React from 'react'

export default function Tweet({name,handle,time,content}) {
    return (
        <div className='tweet flex mb-4 mt-4'>
            
            <img className="tweet__author-logo w-[49px] h-[49px] rounded-[50%] mr-[10px]" src="/images/avatar.png" alt="profile"/>
            
            <div className='tweet__main'>
                
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
            </div>
        
        </div>
    )
}
