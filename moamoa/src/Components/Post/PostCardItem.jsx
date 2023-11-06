import React, { useState } from 'react';
import PostCardUser from './PostCardUser';
import MyPostMoreBtn from '../Post/MyPostMoreBtn';
import YourPostMoreBtn from '../Post/YourPostMoreBtn';
import styled from 'styled-components';
import heartBg from '../../Assets/icons/heart.svg';
import heartBgFill from '../../Assets/icons/heart-fill.svg';
import commentBg from '../../Assets/icons/message-circle.svg';
import Datacalc from '../Common/datecalc';
import { useRecoilValue } from 'recoil';
import accountNameAtom from '../../Recoil/accountNameAtom';

import PropTypes from 'prop-types';
import HeartCountDownAPI from '../../API/Post/HeartCountDownAPI';
import HeartCountUpAPI from '../../API/Post/HeartCountUpAPI';

PostCardDetail.propTypes = {
  post: PropTypes.object,
};

export default function PostCardDetail({ post }) {
  const postItemInfo = post;
  const postAuthorInfo = post.author;

  const accountAtom = useRecoilValue(accountNameAtom);

  const [heartcolor, setHeartColor] = useState(heartBg);
  const [heartcount, setHeartCount] = useState(postItemInfo.heartCount);
  const [showModal, setShowModal] = useState(false);
  const [heartValue, setHeartValue] = useState(postItemInfo.hearted);

  const postImgUrl = `${postItemInfo.image}`;
  const accountName = postAuthorInfo.accountname;
  const postId = postItemInfo.id;

  const heartPost = HeartCountUpAPI(postId);

  const hearted = async () => {
    await heartPost();
  };

  const ununheartPost = HeartCountDownAPI(postId);

  const unhearted = async () => {
    await ununheartPost();
  };

  const handleHeartCount = () => {
    setHeartColor(heartBgFill);
    setHeartCount((prev) => prev + 1);
    setHeartValue((prev) => !prev);
    hearted();
  };

  const handleUnheartCount = () => {
    setHeartCount((prev) => prev - 1);
    setHeartValue((prev) => !prev);
    unhearted();
    setHeartColor(heartBg);
  };

  return (
    <>
      {post && (
        <PostList>
          <PostArticle>
            <Frofile>
              <PostCardUser
                url={postAuthorInfo.image}
                username={postAuthorInfo.username}
<<<<<<< HEAD
                accountname={accountName}
                loginAccountName={accountAtom}
=======
                accountname={accountName} loginAccountName={accountAtom}
>>>>>>> develop
              />
              {accountAtom === accountName ? (
                <MyPostMoreBtn
                  accountname={accountName}
                  postid={postId}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(true);
                    console.log(showModal);
                  }}
                />
              ) : (
                <YourPostMoreBtn accountname={accountName} loginAccountName={accountAtom} />
              )}
              {accountAtom === accountName ? (
                <MyPostMoreBtn
                  accountname={accountName}
                  postid={postId}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(true);
                    console.log(showModal);
                  }}
                />
              ) : (
                <YourPostMoreBtn
                  accountname={accountName}
                  onClick={() => {
                    setShowModal(true);
                    console.log(showModal);
                  }}
                />
              )}
            </Frofile>
            <PostDesc>{postItemInfo.content}</PostDesc>
            {postImgUrl ? <PostImg src={postImgUrl} alt='게시글 사진' /> : null}
            <PostFooterContainer>
              <CreateDate>{Datacalc(postItemInfo.createdAt)}</CreateDate>
              <div>
                {heartValue ? (
                  <HeartBtn
                    onClick={() => {
                      handleUnheartCount();
                    }}
                    heartcolor={heartBgFill}
                  >
                    {heartcount}
                  </HeartBtn>
                ) : (
                  <HeartBtn
                    onClick={() => {
                      handleHeartCount();
                    }}
                    heartcolor={heartcolor}
                  >
                    {heartcount}
                  </HeartBtn>
                )}
                <CommentBtn>{postItemInfo.commentCount}</CommentBtn>
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
    /* padding-top: 1rem; */
  }
`;

const PostArticle = styled.article`
  margin-top: 3rem;
`;
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
  word-break: break-all;
  &:hover {
    cursor: default;
  }
  line-height: 2rem;
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

const HeartBtn = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'heartcolor',
})`
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
