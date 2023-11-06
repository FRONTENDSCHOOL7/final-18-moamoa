import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userTokenAtom from '../../Recoil/userTokenAtom'; //파일 경로 변경 완료
import PostCardItem from '../../Components/Post/PostCardItem';
import styled from 'styled-components';
import Comment from '../../Components/Comment/Comment';
import HeaderKebab from '../../Components/Common/HeaderKebab';
import PostDetailAPI from '../../API/Post/PostDetailAPI';

export default function ProductDetail() {
  const token = useRecoilValue(userTokenAtom);
  const [post, setPost] = useState();
  const {post_id} = useParams();

  const getPostDetail = (data) => {
    setPost(data.post);
  }

  const getPostData = () => PostDetailAPI(token, post_id, getPostDetail);

  useEffect(()=>{
    const getData = async () => {
      await getPostData();
    }
  getData();
  },[])
  return (
    <>
      {post && (
        <PostContainer>
          <HeaderKebab />
          <PostCardContainer>
            <PostCardItem post={post} />
          </PostCardContainer>
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
const PostCardContainer = styled.div`
  padding: 0 1.6rem 1.5rem;
  padding-top: 64px;
  li {
    article {
      margin-top: 0;
    }
  }
`;
