import React, { useState } from 'react';
import PostCardUser from './PostCardUser';
import MoreBtn from '../Common/MoreBtn';
import styled from 'styled-components';
import heartBg from '../../Assets/icons/heart.svg';
import heartBgFill from '../../Assets/icons/heart-fill.svg';
import commentBg from '../../Assets/icons/message-circle.svg';
import Datacalc from '../Common/datecalc';

export default function PostCardDetail(post) {
  const [toggleCount, setToggleCount] = useState(true);
  const [heartcolor, setHeartColor] = useState(heartBg);
  const [showModal, setShowModal] = useState(false);

  const postprop = post.post.post;
  const postImgUrl = `${postprop.image}`;
  const accountName = postprop.author.accountname;

  const handleHeartCount = () => {
    setToggleCount((prev) => !prev);
    if (toggleCount === true) {
      setHeartColor(heartBgFill);
    } else {
      setHeartColor(heartBg);
    }
  };

  return (
    <>
      {post && (
        <PostList>
          <PostArticle>
            <Frofile>
              <PostCardUser
                url={postprop.author.image}
                username={postprop.author.username.slice(3)}
                accountname={accountName}
              />
              <MoreBtn
                accountname={accountName}
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(true);
                  console.log(showModal);
                }}
              />
            </Frofile>
            <PostDesc>{postprop.content}</PostDesc>
            {postImgUrl ? <PostImg src={postImgUrl} alt='게시글 사진' /> : null}
            <PostFooterContainer>
              <CreateDate>{Datacalc(postprop.createdAt)}</CreateDate>
              <div>
                <HeartBtn
                  onClick={() => {
                    handleHeartCount();
                  }}
                  heartcolor={heartcolor}
                >
                  {postprop.heartCount}
                </HeartBtn>
                <CommentBtn>{postprop.commentCount}</CommentBtn>
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
    padding-top: 4rem;
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
  margin: 1.2rem 0 1.6rem;
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

const HeartBtn = styled.button`
  padding-left: 2.6rem;
  height: 2rem;
  color: transparent;
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
