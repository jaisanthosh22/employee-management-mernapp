import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import {Routes,Route } from 'react-router-dom'

    



function App() {
  

  return (
    <>  
       
        <Routes>
          <Route path="/register" element={<RegisterPage/> }/>
          <Route path="/login" element={<LoginPage/> }/>
          <Route path="/HomePage" element={<HomePage/> }/>
        </Routes>
        
      
        
         
        
    </>
  )
}

export default App
