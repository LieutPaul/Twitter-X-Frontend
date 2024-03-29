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
import Activity from './Components/MainBody/Activity';
import UsernameProfilePage from './Components/Profile/UsernameProfilePage';
import TrendingPage from './Components/Trending/TrendingPage';

export default function App() {
     
    return (
        <Routes>
        
            <Route path="*" element={<Navigate to={`/home`}/>} />
            
            <Route path="/home" element={<Home/>}/>
            <Route path="/activity" element={<Activity/>}/>
            <Route path="/home/tweet/:tweetId" element={<TweetPage/>}/>
            
            <Route path="/explore" element={<Explore/>}/>
            <Route path="/explore/trending" element={<TrendingPage/>} />
            
            <Route path="/profile/:profileId" element={<ProfilePage />} />
            <Route path="/profile/username/:username" element={<UsernameProfilePage />} />
            
            <Route path="/followings/:profileId" element={<FollowingsPage/>}/>
            <Route path="/followers/:profileId" element={<FollowersPage/>}/>
            
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/authenticate" element={<AuthenticatePage/>}/>
            
        
        </Routes>
    )
}
