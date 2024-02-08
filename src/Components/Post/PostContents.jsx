import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

PostContents.propTypes = {
  contentsData: PropTypes.object,
};

export default function PostContents({ contentsData }) {
  const { postItemInfo, postImgUrl, postId } = contentsData;

  return (
    <Link to={`/post/${postId}`}>
      <ContentsBox>
        {postImgUrl ? <PostImg src={postImgUrl} alt='' /> : null}
        <PostDesc>{postItemInfo.content}</PostDesc>
      </ContentsBox>
    </Link>
  );
}

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column-reverse;
  @media (min-width: 768px) {
    max-width: 480px;
  }
`;

const PostImg = styled.img`
  // width: 35.8rem;
  // height: 22.8rem;
  // margin: 0 auto;
  aspect-ratio: 358/228;
  object-fit: cover;
  border-radius: 1rem;
  &:hover {
    cursor: default;
  }
  @media (min-width: 768px) {
    width: 480px;
    height: 290px;
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
