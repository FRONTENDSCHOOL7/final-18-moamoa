import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostItem from '../../Components/Post/PostItem';
import Comment from '../../Components/Comment/Comment';
import HeaderKebab from '../../Components/Common/Header/HeaderKebab';
import { getPostDetail } from '../../API/Post/PostAPI';
import { PostContainer, PostItemContainer } from './PostDetailStyle'

export default function ProductDetail() {
  const [post, setPost] = useState();
  const {post_id} = useParams();

  
  const getPostInfo = () => getPostDetail(post_id);

  useEffect(()=>{
    const getPostData = async () => {
      const postData = await getPostInfo();  
      setPost(postData.post);
    }
    getPostData();
  },[])
  return (
    <>
      {post && (
        <PostContainer>
          <HeaderKebab />
          <PostItemContainer>
            <PostItem post={post} />
          </PostItemContainer>
          <Comment postId={post_id} />
        </PostContainer>
      )}
    </>
  );
}