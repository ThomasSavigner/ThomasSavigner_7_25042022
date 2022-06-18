import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Feeds from './pages/Feeds';
import CreatePost from './pages/CreatePost';
import FocusOnPost from './pages/FocusOnPost';
import Profile from './pages/Profile';
import MyPublications from './pages/MyPublications';
import NotFound from './pages/NotFound';
import PublicLayOut from './components/PublicLayOut/index'
import ProtectedLayout from './components/ProtectedLayout/index';

import './styles/App.css'

function App() {

    return (
    
            <Routes>
                <Route path="/" element={<PublicLayOut />} > 
                    <Route index element={<Login />} />
                </Route>
                <Route path="/app" element={<ProtectedLayout />} >
                    <Route path="feeds" element={<Feeds />} />
                    <Route path="post" element={<CreatePost />} />
                    <Route path=":postID" element={<FocusOnPost />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="mypublications" element={<MyPublications />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
   
    )
}

export default App