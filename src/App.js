
import './App.css';
import {BrowserRouter as Router , Routes , Route , Link} from "react-router-dom"
import Home  from "./pages/Home"
import Login  from "./pages/Login"
import Post  from "./pages/Post"
import { signOut } from 'firebase/auth' ;
import {auth} from './firebase-config'
import React, { useState } from 'react';

function App() {
  // The below variable is created to identify whether the user is logged in or not
  const [isAuth,setIsAuth] = useState(localStorage.getItem("isAuth"));

  // This function is created so that when we want to logout then clear the local storage and set the variable as false so that the person can log in again and redirect the page to "Login"
  const signOutUser = () => {
    // We should pass the details of the user as "auth"
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/Login"; //redirecting the page to Login Page . We cannot use useNavigate Link here because it is used inside return statement
    })
  }
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        

        {/* Ab login hone k baad bhi navbar m login ka symbol aa rha h toh isliye hume yeh condition : Agar hum login nhi h toh Login Dikhaye Nhi toh Logout Dikhaye */}
        {!isAuth ?  <Link to="/login">Login</Link> : 
        (<>
        <Link to="/Post">Create Post</Link>
        <button onClick={signOutUser}>LogOut</button>
        </>
        )}
      </nav>
      <Routes>
        {/* below line signifies that when "/" will be hit then the element will be rendered */}
        <Route path='/' element={<Home isAuth={isAuth}/>}></Route>

        {/* We are passing the state as props to Login Page */}
        <Route path='/login' element={<Login setIsAuth={setIsAuth}/>}></Route>
        <Route path='/Post' element={<Post isAuth={isAuth}/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
