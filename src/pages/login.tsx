import React from 'react'
import {auth, provider} from "../config/firebase";
import { signInWithPopup } from 'firebase/auth';
import {useNavigate} from 'react-router-dom';


export const Login = () =>{
  const navigate = useNavigate();

  const singInWithGoogle = async () =>{
   const result = await signInWithPopup(auth, provider)
  navigate("/");
  };
  return (
    <div className='login-section'>
      <div className='login-box'>
        <img className='google' src="google.png" />
      <p className='sign'>Sign in with your Google account to continue</p>
      <button className='login-btn' onClick={singInWithGoogle}> Sign in </button>
      </div>
    </div>
  )
}

