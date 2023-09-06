import React from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {addDoc, collection} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {useNavigate} from 'react-router-dom'


interface writeMessageData{
    title: string;
    description: string
  }

export const MessageForm = () =>{
    const [user]= useAuthState(auth);
    
    const navigate = useNavigate();

    const schema = yup.object().shape({
    title: yup.string().required("Add a title"),
    description: yup.string().required("Add a description"),
});

const {register, handleSubmit, formState:{errors}} = useForm<writeMessageData>({
    resolver:yupResolver(schema),
});

const postRef = collection(db, "posts");

const onWriteMessage = async (data: writeMessageData) => {
    await addDoc(postRef, {
        title: data.title,
        description: data.description,
        username: user?.displayName,
        userId: user?.uid,
    });

    navigate("/")
};

  return (
        <form className='message-form' onSubmit={handleSubmit(onWriteMessage)}>
            <h1 className='formHead'>Write your message</h1>
            <input className='input' placeholder="Title..." {...register("title")} />
            <p style={{color:"red"}}>{errors.title?.message}</p>
            <textarea className='input des' placeholder="Description..." {...register("description")} />
            <p style={{color:"red"}}>{errors.description?.message}</p>
            <input  className='input sub' placeholder='Submit'type="submit" />
        </form>
  );
};

