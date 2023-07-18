import React from 'react'
import './Explore.scss'
export default function Explore({leftBarOption}) {
    return (
        <div className='explore col-6 mt-4'>
            <div className='font-bold text-lg mt-2'>{leftBarOption}</div> 
            <input placeholder='Search Twitter' className='ps-5 pt-3 pb-3 mt-4'></input>
        
        </div>
    )
}
