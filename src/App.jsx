import React from 'react'
import LoginPage from './Components/Login/LoginPage';
import AuthenticatePage from './Components/Login/AuthenticatePage';
import ProfilePage from './Components/Profile/ProfilePage';
import Explore from './Components/Explore/Explore';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './Components/MainBody/Home';
import TweetPage from './Components/Tweet/TweetPage';
import FollowingsPage from './Components/Profile/FollowingsPage';
import FollowersPage from './Components/Profile/FollowersPage';

export default function App() {
     
    return (
        <Routes>
        
            <Route path="*" element={<Navigate to={`/home`}/>} />
            <Route path="/home" element={<Home/>}/>
            <Route path="/home/tweet/:tweetId" element={<TweetPage/>}/>
            <Route path="/explore" element={<Explore/>}/>
            <Route path="/profile/:profileId" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/authenticate" element={<AuthenticatePage/>}/>
            <Route path="/followings/:profileId" element={<FollowingsPage/>}/>
            <Route path="/followers/:profileId" element={<FollowersPage/>}/>
        
        </Routes>
    )
}
