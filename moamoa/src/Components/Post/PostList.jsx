import React from 'react';
import PostItem from './PostItem';
import styled from 'styled-components';

export default function PostList(post) {
  const postItem = post?.post;

  return (
    <Posts>
      {postItem && (
        <li><PostItem post={postItem}/></li>
      )}
    </Posts>
  );
}

const Posts = styled.ul`
  box-sizing: border-box;
  background-color: #ffffff;
  margin: 3rem 1.6rem;
  &:last-child{
    margin-bottom: 12rem;
  }
`;