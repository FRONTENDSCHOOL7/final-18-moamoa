import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostItem from '../../Components/Post/PostItem';
import styled from 'styled-components';
import Comment from '../../Components/Comment/Comment';
import HeaderKebab from '../../Components/Common/Header/HeaderKebab';
import { getPostDetail } from '../../API/Post/PostAPI';

export default function ProductDetail() {
  const [post, setPost] = useState();
  const { post_id } = useParams();

  const getPostInfo = () => getPostDetail(post_id);

  useEffect(() => {
    const getPostData = async () => {
      const postData = await getPostInfo();
      setPost(postData.post);
    };
    getPostData();
  }, []);
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

const PostContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 39rem;
  margin: auto;
  background-color: #ffffff;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const PostItemContainer = styled.div`
  padding: 0 1.6rem 1.5rem;
  padding-top: 64px;
  li {
    article {
      margin-top: 0;
    }
  }
`;