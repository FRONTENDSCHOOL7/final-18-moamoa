import React from 'react';
import PostItemSkeleton from '../Skeleton/PostItemSkeleton';
import PostItem from './PostItem';
import styled from 'styled-components';
import PropTypes from 'prop-types';

PostList.propTypes = {
  post: PropTypes.object,
  isLoading: PropTypes.bool
}


export default function PostList({post, isLoading}) {
  return (
      <Posts>
        {post && isLoading ? <PostItem post={post}/>
        :<PostItemSkeleton />}
      </Posts>
  );
}

const Posts = styled.li`
  box-sizing: border-box;
  background-color: #ffffff;
  margin: 3rem 1.6rem;
  &:last-child{
    margin-bottom: 12rem;
  }
  @media (min-width: 768px) {
    max-width: 480px;
    margin: 5rem 0;
    
  }
  @media (min-width: 1200px) {
    &:first-child{
      margin-top: 0;
    }
  }
`;