import React from 'react';
import { Container} from '@material-ui/core';
import {BrowserRouter, Route, Routes, Navigate ,useNavigate} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import {GoogleOAuthProvider} from "@react-oauth/google";

const App = () => {
  const user =JSON.parse(localStorage.getItem('profile'));
  
  return(
  <GoogleOAuthProvider
      clientId={'119754270216-faeor0gjmsi32pthg5j72b6lv8j9jg2o.apps.googleusercontent.com'}>
   <BrowserRouter>
    <Container maxWidth="xl">
      <Navbar />
      <Routes>
        {/* <Route path="/" exact component={() => <Navigate  to ="/posts"/>} /> */}
        <Route path="/" element={<Navigate to="/posts" replace />} />
        <Route path= "/posts" element={<Home/>} />
        <Route path= "/posts/search" element={<Home/>} />
        <Route path= "/posts/:id" element={<PostDetails/>} />
        {/* <Route path="/auth" element={() => (!user ? <Auth /> :<Navigate to="/posts"/>)} /> */}
        <Route path="/auth" element={user ? <Navigate to="/posts" /> : <Auth />} />
      </Routes>
      
    </Container>
    </BrowserRouter>
    </GoogleOAuthProvider>
  )
}
  
  
    


export default App;