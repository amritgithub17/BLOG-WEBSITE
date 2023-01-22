import React, { useEffect } from 'react'
import { useState } from 'react';

// Document is just a entry and addDoc is used to add the document to firestore
import {addDoc, collection} from "firebase/firestore";
import {auth,db} from "../firebase-config"
import { useNavigate } from "react-router-dom";


function Post({isAuth}) {
  
  const [title,setTitle] = useState("");
  const [postText , setPostText] = useState("");

  // we are creating a reference to the collection that we have added in the firebase
  const postsCollectionRef = collection(db,"posts");
  // so now the below function will add the documennt to firestore . So our database will contain 3 fields called "title","postText", "author with name and id". So .to grab the name and id we have used the auth frome firebase-config file and used the "auth.currentuser.displayname" and " auth.currentUser.uid" to get name and id
  let navigate = useNavigate();
  const createPost = async () =>{
    await addDoc(postsCollectionRef ,
       {title,
        postText,
        author : {name : auth.currentUser.displayName, id: auth.currentUser.uid},
      });
      navigate("/");
  }


  // So below function is created so that whenever the page will render then if the person is not logged in then he will be redirected to the login page
//  Isme dikkat yhi h ki jb bhi page refresh hoga tb baar baar tumko login krna pdega kyunki tb tb useEffect call hoga
  useEffect(()=>{
    if(!isAuth){
      navigate("/Login");
    }
  },[])
  return (
    <div className="createPostPage">
      <div className='cpContainer'>
        <h1>Create a post</h1>
        {/* Now  we are creating 2 input groups :-> one for title and other one for body*/}
        <div className='inputGp'>
          <label>Title:</label>
          <input placeholder = "Title......" onChange={(event)=>{setTitle(event.target.value)}}></input>
        </div>
        <div className="inputGp">
          <label>Post:</label>
           <textarea placeholder='Post.....' onChange={(event) =>{setPostText(event.target.value)}}/>
        </div>
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  )
}

export default Post