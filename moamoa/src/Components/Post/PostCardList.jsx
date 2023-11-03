import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostCardUser from './PostCardUser';
import MyPostMoreBtn from '../Post/MyPostMoreBtn';
import styled from 'styled-components';
import heartBg from '../../Assets/icons/heart.svg';
import heartBgFill from '../../Assets/icons/heart-fill.svg';
import commentBg from '../../Assets/icons/message-circle.svg';
import Datacalc from '../Common/datecalc';
import userTokenAtom from '../../Recoil/userTokenAtom';
import { useRecoilValue } from 'recoil';

export default function PostCardList(post) {

  const [showModal, setShowModal] = useState(false);
  const postItem = post.post;
  const profileImgUrl = `${postItem.author.image}`;
  const postImgUrl = `${postItem.image}`;
  const postId = postItem.id;
  const postDetailUrl = `/post/${postId}`;
  const token = useRecoilValue(userTokenAtom);

  const [heartValue, setHeartValue] = useState(postItem.hearted);
  const [heartcolor, setHeartColor] = useState(heartBg);
  const [heartcount, setHeartCount] = useState(postItem.heartCount);

  const heartPost = async () => {
    try {
      const response = await fetch(`https://api.mandarin.weniv.co.kr/post/${postId}/heart`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      return data;
      
    } catch (error) {
      console.error('API 응답에 실패하였습니다.', error);
    }
  };

const unheartPost = async () => {
    try {
      const response = await fetch(`https://api.mandarin.weniv.co.kr/post/${postId}/unheart`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('API 응답에 실패하였습니다.', error);
    }
  };

  const handleHeartCount = () => {
      setHeartColor(heartBgFill);
      setHeartCount((prev)=>prev + 1);
      setHeartValue((prev)=>!prev)
      heartPost();
  };

  const handleUnheartCount = () => {
    setHeartCount((prev)=>prev -1)
    setHeartValue((prev)=>!prev)
    unheartPost()
    setHeartColor(heartBg);
  }

  return (
    <>
      {post && (
        <PostList>
          <PostArticle>
            <Frofile>
              <PostCardUser
                url={profileImgUrl}
                username={postItem.author.username.slice(3)}
                accountname={postItem.author.accountname}
              />

              <MyPostMoreBtn postid={postId}
                accountname={postItem.author.accountname}
                onClick={() => {
                  setShowModal(true);
                  console.log(showModal);
                }}
              />
            </Frofile>
            <Link to={postDetailUrl}>
              <PostDesc>{post.post.content}</PostDesc>
              {postImgUrl ? <PostImg src={postImgUrl} alt='게시글 사진' /> : null}
            </Link>
            <PostFooterContainer>
              <CreateDate>{Datacalc(postItem.createdAt)}</CreateDate>
              <div>
                { heartValue ? <HeartBtn
                  onClick={() => { handleUnheartCount(); }}
                  heartcolor={heartBgFill}
                >
                  {heartcount}
                </HeartBtn>:<HeartBtn
                  onClick={() => {
                    handleHeartCount();
                  }}
                  heartcolor={heartcolor}
                >
                  {heartcount}
                </HeartBtn>}
                <Link to={postDetailUrl}>
                  <CommentBtn>{postItem.commentCount}</CommentBtn>
                </Link>
              </div>
            </PostFooterContainer>
          </PostArticle>
        </PostList>
      )}
    </>
  );
}

const PostList = styled.li`
  &:first-child {
    padding-top: 0rem;
  }
  margin-bottom: 25px;
`;

const PostArticle = styled.article``;
const Frofile = styled.div`
  margin: 0 auto;
  height: 4.2rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const PostImg = styled.img`
  width: 35.8rem;
  height: 22.8rem;
  margin: 0 auto;
  aspect-ratio: 358/228;
  object-fit: cover;
  border-radius: 1rem;
  &:hover {
    cursor: default;
  }
`;
const PostDesc = styled.p`
  font-size: 1.4rem;
  margin: 1.2rem 0;
  line-height: 2rem;
  word-break: break-all;
  &:hover {
    cursor: default;
  }
`;
const PostFooterContainer = styled.div`
  margin: 1.5rem 0.8rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CreateDate = styled.p`
  font-size: 1rem;
  color: #767676;
`;

const HeartBtn = styled.button`
  padding-left: 2.6rem;
  padding-right: 1.6rem;
  height: 2rem;
  color: #767676;
  background: url(${(props) => props.heartcolor}) 0.2rem no-repeat;
  &:hover {
    cursor: pointer;
  }
  &:active {
    background: url(${(props) => props.heartcolor}) 0.2rem no-repeat;
  }
`;

const CommentBtn = styled.button`
  height: 2rem;
  padding-left: 2.3rem;
  color: #767676;
  &:link {
    color: #767676;
  }
  &:hover {
    cursor: pointer;
  }
  background: url(${commentBg}) 0.2rem no-repeat;
  background-position-x: -0.1rem;
`;
