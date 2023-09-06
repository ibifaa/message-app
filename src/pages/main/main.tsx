import React, { useEffect, useState } from 'react';
import {getDocs, collection} from "firebase/firestore"
import { db } from '../../config/firebase';
import { Message} from './message';
// getDocs is used to get list of documents
// collection: is used to define which collection you going to refference to in our case is the posts
export interface Message {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
  
}

export const Main = () =>{ 
  const postRef = collection(db, "posts");

  const [postList, setPostList] =  useState<Message[] | null>(null);
  // state to keep track of the data we will get back

  const getPosts = async () => {
    const data = await getDocs(postRef); // represent the data will get from the getDocs function
    setPostList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id})) as Message[]
      // map through the object that will be returned from getDocs to get the items that I will want
      );
    };

    useEffect(() => {
      getPosts();
    }, [])

  return (
    <div>
      {postList?.map((msg) => (
    <Message msg ={msg}/>
    ))}
    </div>
  )
};

