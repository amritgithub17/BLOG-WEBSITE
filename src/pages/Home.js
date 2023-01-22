import { getDocs , collection,doc,deleteDoc} from 'firebase/firestore';
import React, { useState,useEffect } from 'react'
import { db ,auth} from '../firebase-config';

// So , Now we want to access the list of all post that we have created from firestore database and display it
function Home({isAuth}) {
  const[postList,setPostList] =useState([]);
  const postsCollectionRef = collection(db,"posts");

  const deletePost = async (id) =>{
    const postDoc = doc(db,"posts",id);
    await deleteDoc(postDoc);
  }

  useEffect(()=>{
    const getPosts = async() => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
    };

    getPosts();
  },[deletePost])

 
  return (
    <div className='homePage'>{postList.map((post)=>{
      return(
        <div className="post">
          <div className="postHeader">
            <div className='title'>
              <h1>{post.title}</h1>
            </div>
            <div className='deletePost'>
              
                {isAuth && post.author.id === auth.currentUser.uid &&
                (<button
                 onClick={()=>{
                deletePost(post.id)
              }}> &#128465;</button>)}
            </div>
          </div>
          <div className='postTextContainer'>
            {post.postText}
          </div>
          <h3>@{post.author.name}</h3>
        </div>
      )
    })}</div>
  )
}

export default Home