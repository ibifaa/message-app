import React, { useEffect, useState } from 'react'
import { Message as Msg} from './main'
import { addDoc, getDocs, collection, query, where, doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { number } from 'yup';

interface Props{
 msg: Msg;
}

interface Like{
    userId: string;
    likeId: string;
}

export const  Message = (props:Props) => {
    const {msg} = props;
  
    const [user]= useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>(null);
  
 
  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where ("postId", "==", msg.id ));

const getLikes = async () => {
    const data = await getDocs(likesDoc);
   setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId:doc.id})));
};

const addLike = async () => {
    try{
   const newDoc = await addDoc(likesRef, {userId:user?.uid , postId: msg.id });
    if(user){
    setLikes((prev) => 
    prev ? [...prev, {userId: user.uid, likeId: newDoc.id}] : [{userId: user.uid, likeId:newDoc.id}]); // to automatically update the likes and unlike
};
    } catch (err){
        console.log(err)
    }
}

const removeLike = async () => {
    try{
        const deleteLikeQuery = query(
            likesRef, 
            where("postId", "==", msg.id),
            where("userId", "==", user?.uid)
        );
    const likeToDeleteData = await getDocs(deleteLikeQuery);
    const likeId = likeToDeleteData.docs[0].id;
    const deleteLike = doc(db, "likes", likeId)
    await deleteDoc(deleteLike);
    if(user){
    setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId)
    );
};
    } catch (err){
        console.log(err)
    }
}


const hasUserLiked = likes?.find((like) =>like.userId === user?.uid); 

useEffect(() =>{
    getLikes()
}, [])

    return (
    <div className='message-box'>
        <div className='title-section'>
            <img className='user-image' src={user?.photoURL || ""}  width="100" height="100" alt='current user'/>            
            <h1>{msg.title}</h1>
        </div>

        <div>
            <p>{msg.description}</p>
        </div>

        <div>
            <p>@{msg.username}</p>
            <div className='likes-section'>
            <button className='btn' onClick={hasUserLiked ? removeLike : addLike}> {hasUserLiked ? <h2>&#128078;</h2> : <h2>&#128077;</h2>} </button>
            {likes && <p>{likes?.length} Likes </p>}
            </div>
        </div>
        
    </div>
  )
}

