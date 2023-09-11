import React from 'react';
import {Link} from 'react-router-dom';
import {auth} from '../config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import { signOut} from 'firebase/auth';



export const Navbar = ()  =>{
const [user]= useAuthState(auth);

const signedOut = async () =>{
    await signOut(auth);
};

  return (
    <div className='navigation flex'>
        <h1 className='brand-name'>SkulConect</h1>
        <div className='user-section'>
            <div className='links'>
            <Link className='link' to="/"> Home</Link>
            {!user ?
                <Link className='link'to="/login">Login</Link> :
                <Link className='link'to="/write-message">Write message</Link>
            }
        
            </div>
        </div>
        <div>
        <div className='flex user-details'>{user && (
            <>
                <img className='user-image' src={user?.photoURL || ""}  width="100" height="100" alt='current user'/>            

                {/* <p>{user?.displayName}</p> */}
            
                <svg onClick={signedOut} className='svg-icon'width="40px" height="40px" viewBox="0 0 24 24" fill="none" stroke='#ffffff' xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            
           
            </>
        )}
        </div>
        </div>
    </div>
  )
}
