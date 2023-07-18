import React from 'react'
import TrendsBlock from './TrendsBlock'

export default function RightBar() {
  return (
    <div className='col-4 flex justify-center mt-4 right-bar-container'>
        <div className='right-bar fixed w-[350px]'>
            <div className='trends rounded-[15px] bg-[#f5f8fa]'>
                <div className='font-black text-lg trends-heading pt-[20px] pb-[10px] ps-[15px] pe-[15px] mb-2'>
                  What's Happening?
                </div>
                <TrendsBlock info="Entertainment Trending" name="Oppenheimer" tweets={"100K"}/>
                <TrendsBlock info="Entertainment Trending" name="Oppenheimer" tweets={"100K"}/>
                <TrendsBlock info="Entertainment Trending" name="Oppenheimer" tweets={"100K"}/>
                <TrendsBlock info="Entertainment Trending" name="Oppenheimer" tweets={"100K"}/>

            </div>
        </div>
    </div>
  )
}
