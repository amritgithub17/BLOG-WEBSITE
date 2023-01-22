import React from 'react'
import {provider,auth} from "../firebase-config"
import { useNavigate } from 'react-router-dom';

// there are various signIn Ways but here we are signing up with the help of popup because it is a very common way
import {signInWithPopup} from "firebase/auth"
function Login({setIsAuth}) {
  let navigate = useNavigate();
  const signInWithGoogle = () =>
  {
    
    // so here we are specifying what we do when we logged into google
    // result will store the details of user
    signInWithPopup(auth,provider).then((result) => {
      localStorage.setItem("isAuth",true); //jb bhi koi user tab band krdega log in krne k baad aur fir chrome open krega toh woh logged in rhna chahiye toh uska data local storage m stored rhega
      setIsAuth(true);//set the variable as true
      navigate("/");
    })
    

  }
  return (
    <div className="loginPage">
      <p>Sign in with Google to continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with google
      </button>
    </div>

  )
}

export default Login