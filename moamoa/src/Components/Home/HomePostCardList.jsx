import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostCardUser from '../Post/PostCardUser';
import HomePostMoreBtn from './HomePostMoreBtn';
import styled from 'styled-components';
import heartBg from '../../Assets/icons/heart.svg';
import heartBgFill from '../../Assets/icons/heart-fill.svg';
import commentBg from '../../Assets/icons/message-circle.svg';
import Datacalc from '../Common/datecalc';

import HeartCountDownAPI from '../../API/Post/HeartCountDownAPI';
import HeartCountUpAPI from '../../API/Post/HeartCountUpAPI';
import accountNameAtom from '../../Recoil/accountNameAtom'; 
import { useRecoilValue } from 'recoil';


export default function HomePostCardList(post) {
  
  const accountAtom = useRecoilValue(accountNameAtom);

  const postInfo = post.post;
  const postAuthorInfo = postInfo.author;
  const profileImgUrl = `${postAuthorInfo.image}`;
  const postImgUrl = `${postInfo.image}`;
  const postId = post.post.id;
  const postDetailUrl = `/post/${postId}`;
  
  const [heartValue, setHeartValue] = useState(postInfo.hearted);
  const [heartcolor, setHeartColor] = useState(heartBg);
  const [heartcount, setHeartCount] = useState(postInfo.heartCount);

  const heartPost = HeartCountUpAPI(postId)

  const hearted = async () => {
      await heartPost();
  }

  const ununheartPost = HeartCountDownAPI(postId)

  const unhearted = async () => {
      await ununheartPost();
  }

  
  const handleHeartCount = () => {
      setHeartColor(heartBgFill);
      setHeartCount((prev)=>prev + 1);
      setHeartValue((prev)=>!prev)
      hearted();
  };

  const handleUnheartCount = () => {
    setHeartCount((prev)=>prev -1)
    setHeartValue((prev)=>!prev)
    unhearted()
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
                username={postAuthorInfo.username}
                accountname={postAuthorInfo.accountname}
                loginAccountName={accountAtom}
              />
              <HomePostMoreBtn postid={postId}/>
            </Frofile>
            <Link to={postDetailUrl}>
              {postInfo.content!==""?<PostDesc>{postInfo.content}</PostDesc>:null}
              
              {postImgUrl ? <PostImg src={postImgUrl} alt='게시글 사진' /> : null}
            </Link>
            <PostFooterContainer>
              <CreateDate>{Datacalc(postInfo.createdAt)}</CreateDate>
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
                  <CommentBtn>{postInfo.commentCount}</CommentBtn>
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
    padding-top: 1.5rem;
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
  margin: 1.2rem auto 0;
  aspect-ratio: 358/228;
  object-fit: cover;
  border-radius: 1rem;
  &:hover {
    cursor: default;
  }
`;
const PostDesc = styled.p`
  font-size: 1.4rem;
  margin: 1.2rem 0 0;
  line-height: 2rem;
  overflow:hidden;  
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
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
