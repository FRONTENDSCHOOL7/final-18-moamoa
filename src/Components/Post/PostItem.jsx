import React, { useCallback, useState } from 'react';
import ArticleUserProfile from '../Common/ArticleUserProfile';
import PostMoreBtn from './PostMoreBtn';
import styled from 'styled-components';
import heartBg from '../../Assets/icons/heart.svg';
import heartBgFill from '../../Assets/icons/heart-fill.svg';
import commentBg from '../../Assets/icons/message-circle.svg';
import Datacalc from '../Common/datecalc';
import { useRecoilValue } from 'recoil';
import accountNameAtom from '../../Recoil/accountNameAtom';

import PropTypes from 'prop-types';
import { heartPost,  unheartPost } from '../../API/Post/PostAPI';
import PostContents from './PostContents';
import { Link } from 'react-router-dom';

PostItem.propTypes = {
  post: PropTypes.object
};

export default function PostItem({ post }) {
  const postItemInfo = post;
  const postAuthorInfo = post?.author;
  const loginAccountName = useRecoilValue(accountNameAtom);
  
  const [heartcolor, setHeartColor] = useState(heartBg);
  const [heartcount, setHeartCount] = useState(postItemInfo.heartCount);
  const [showModal, setShowModal] = useState(false);
  const [heartValue, setHeartValue] = useState(postItemInfo.hearted);

  const postImgUrl = `${postItemInfo?.image}`;
  const accountName = postAuthorInfo?.accountname;
  const userName = postAuthorInfo?.username;
  const profileImg = postAuthorInfo?.image;
  const postId = postItemInfo?.id;

  const userProfileData = { profileImg, userName, accountName, loginAccountName }
  const contentsData = { postItemInfo, postImgUrl, postId }
  const btnData = {postId, accountName, showModal}

  const hearted = useCallback(async () => {
    await heartPost(postId);
    setHeartColor(heartBgFill);
    setHeartCount((prev) => prev + 1);
    setHeartValue((prev) => !prev);
  }, [postId]);

  const unhearted = useCallback(async () => {
    await unheartPost(postId);
    setHeartCount((prev) => prev - 1);
    setHeartValue((prev) => !prev);
    setHeartColor(heartBg);
  }, [postId]);

  const handleHeartCount = useCallback(() => {
    hearted();
  }, [hearted]);

  const handleUnheartCount = useCallback(() => {
    unhearted();
  }, [unhearted]);

  return (
    <>
      {postItemInfo && postAuthorInfo && (
        <PostArticle>
          <Frofile>
            <ArticleUserProfile userProfileData={userProfileData} />
            <PostMoreBtn btnData={btnData} onClick={() => setShowModal(true)}
            />
          </Frofile>
          <PostContents contentsData={contentsData}/>
          <PostFooterContainer>
            <CreateDate>{Datacalc(postItemInfo.createdAt)}</CreateDate>
            <div>
              {heartValue ? (
                <HeartBtn onClick={() => handleUnheartCount()} heartcolor={heartBgFill} >
                  {heartcount}
                </HeartBtn>
              ) : (
                <HeartBtn onClick={() => handleHeartCount()} heartcolor={heartcolor} >
                  {heartcount}
                </HeartBtn>
              )}
              <Link to={`/post/${postId}`}><CommentBtn>{postItemInfo.commentCount}</CommentBtn></Link>
            </div>
          </PostFooterContainer>
        </PostArticle>
      )}
    </>
  );
}

const PostArticle = styled.article`
  margin-bottom: 3rem;
`;
const Frofile = styled.div`
  margin: 0 auto;
  height: 4.2rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (min-width: 768px) {
    max-width: 480px;
  }
`;

const PostFooterContainer = styled.div`
  margin: 1.5rem 0.8rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (min-width: 768px) {
    max-width: 480px;
  }
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
