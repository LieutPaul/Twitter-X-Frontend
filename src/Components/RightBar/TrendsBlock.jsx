import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function TrendsBlock({link,name,tweets}) {
    const navigate = useNavigate();
    return (
        <div onClick={()=>{navigate(link)}} className='hover:bg-[#ededed] hover:cursor-pointer trends__block pt-[10px] pb-[10px] ps-[15px] pe-[15px]'>
            <div className='trends__trend-name text-[#0F1419] font-bold'>
                {name}
            </div>
            <div className='trends__block__info text-[#536471]'>
                {tweets} Tweets
            </div>
        </div>
    )
}
