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
        <li>{post && isLoading ? <PostItem post={post}/>
        :<PostItemSkeleton />}</li>
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