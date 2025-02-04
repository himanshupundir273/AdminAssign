import React from 'react'
import LoginPage from './component/LoginPage'
import RegisterPage from './component/RegisterPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from './component/WelcomePage';
import ProfileUploadPage from './component/ProfileUploadPage';
import AdminPanel1 from './page/AdminPanel1';


const App = () => {
  return (
    <Router> 
          <Routes>
          <Route path="/" element={ <LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/home" element={ <WelcomePage/>}/>
          <Route path="/profile" element={ <ProfileUploadPage/>}/>
          <Route path="/admin" element={ <AdminPanel1/>}/>


      </Routes>
    </Router>
  )
}

export default App