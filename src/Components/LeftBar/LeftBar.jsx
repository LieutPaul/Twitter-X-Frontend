import React from 'react'
import {RiHome7Fill} from 'react-icons/ri'
import {FaSearch,FaEnvelope,FaUserFriends} from 'react-icons/fa'
import {BiHomeCircle,BiSearch} from 'react-icons/bi'
import {BsPersonFill,BsPerson} from "react-icons/bs"
import {PiEnvelopeSimple} from 'react-icons/pi'
import {LiaUserFriendsSolid} from 'react-icons/lia'
import './LeftBar.scss'
import { useNavigate } from 'react-router-dom'

export default function LeftBar({userId,leftBarOption}) {
  const navigate = useNavigate();
  return(
      <div className='col-2'> 
          <div className='sidebar-menu flex flex-col items-center'>

              <svg viewBox="0 0 24 24" aria-hidden="true" className="brandLogo r-1cvl2hr r-4qtqp9 r-yyyyoo r-16y2uox r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>
              
              <div className='mt-4 sidebar-menu__item flex items-center w-full' onClick={()=>{navigate("/home")}}>
                <span className='mr-6'>{ leftBarOption === "Home" ? <RiHome7Fill size={30}/> : <BiHomeCircle size={30}/>}</span>
                <span className={`hidden sm:inline-block ${leftBarOption === "Home" && "font-black"}`}>Home</span>
              </div>

              <div className='sidebar-menu__item flex items-center w-full' onClick={()=>{navigate("/activity")}}>
                <span className='mr-6'>{ leftBarOption === "Activity" ? <FaUserFriends size={25}/> : <LiaUserFriendsSolid  size={25}/>}</span>
                <span className={`hidden sm:inline-block ${leftBarOption === "Activity" && "font-black"}`}>Activity</span>
              </div>

              <div className='sidebar-menu__item flex items-center w-full' onClick={()=>{navigate("/explore")}}>
                <span className='mr-6'>{ leftBarOption === "Explore" ? <FaSearch  size={25}/> : <BiSearch size={30}/>}</span>
                <span className={`hidden sm:inline-block ${leftBarOption === "Explore" && "font-black"}`}>Explore</span>
              </div>

              <div className='sidebar-menu__item flex items-center w-full' onClick={()=>{navigate("/messages")}}>
                <span className='mr-6'>{ leftBarOption === "Messages" ? <FaEnvelope size={25}/> : <PiEnvelopeSimple size={30}/> }</span>
                <span className={`hidden sm:inline-block ${leftBarOption === "Messages" && "font-black"}`}>Messages</span>
              </div>

              <div className='sidebar-menu__item flex items-center w-full' onClick={()=>{navigate("/profile/" + userId)}}>
                <span className='mr-6'>{ leftBarOption === "Profile" ? <BsPersonFill size={30}/> : <BsPerson size={30}/> }</span>
                <span className={`hidden sm:inline-block ${leftBarOption === "Profile" && "font-black"}`}>Profile</span>
              </div>

          </div>
      </div>
  );
}

