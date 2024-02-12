import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostItem from '../../Components/Post/PostItem';
import Comment from '../../Components/Comment/Comment';
import HeaderKebab from '../../Components/Header/HeaderKebab';
import NavBar from '../../Components/Common/NavBar';
import { getPostDetail } from '../../API/Post/PostAPI';
import { PostContainer, PostItemContainer, NavbarCont } from './PostDetailStyle';

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
      <HeaderKebab />
      {post && (
        <PostContainer>
          <NavbarCont>
            <NavBar />
          </NavbarCont>
          <PostItemContainer>
            <PostItem post={post} />
          </PostItemContainer>
          <Comment postId={post_id} />
        </PostContainer>
      )}
    </>
  );
}
