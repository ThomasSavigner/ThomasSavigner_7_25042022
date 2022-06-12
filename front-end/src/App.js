import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login';
import Feeds from './pages/Feeds';
import CreatePost from './pages/CreatePost';
import FocusOnPost from './pages/FocusOnPost';
import Profile from './pages/Profile';
import MyPublications from './pages/MyPublications';
import NotFound from './pages/NotFound';
import ProtectedLayout from './components/ProtectedLayout/index';

import './styles/App.css'

function App() {



    return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/app" element={<ProtectedLayout />} >
                <Route path="feeds" element={<Feeds />} />
                <Route path="post" element={<CreatePost />} />
                <Route path=":postID" element={<FocusOnPost />} />
                <Route path="profile" element={<Profile />} />
                <Route path="mypublications" element={<MyPublications />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
    )
}

export default App