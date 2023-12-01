import React from 'react';
import PostItem from './PostItem';
import { useLocation } from 'react-router-dom';

export default function PostList(post) {
  const postItem = post.post;

  const location = useLocation();
  const currnetPath = location.pathname.slice(1);

  return (
    <>
      {post && (
        <PostItem post={postItem} currnetPath={currnetPath}/>
      )}
    </>
  );
}