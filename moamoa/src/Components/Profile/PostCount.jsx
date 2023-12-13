import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types'; // npm install prop-types 설치 필요
import styled from 'styled-components';

import { userPostList } from '../../API/Post/PostAPI';
import { productList } from '../../API/Product/ProductAPI';

export default function PostCount({ accountName, token, userType }) {
  const [postCount, setPostCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  const fetchPostCount = async () => {
    const response = await userPostList(accountName);
    setPostCount(response.post.length);
  };
  const fetchProductCount = async () => {
    const response = await productList(accountName);
    userType === 'organization' ? setProductCount(response.product.length) : setProductCount(0);
  };

  useEffect(() => {
    fetchPostCount();
    fetchProductCount();
  }, [accountName, token]);

  return (
    <PostCountWrap>
      <p>{postCount + productCount}</p>
      <p>게시글 수</p>
    </PostCountWrap>
  );
}

PostCount.propTypes = {
  accountName: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired,
};

const PostCountWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  p {
    font-size: 18px; // 여기에서 텍스트 사이즈를 10px로 변경합니다.
  }

  p:last-child {
    font-size: 10px; // 첫 번째 p 태그 (게시글 수 숫자)는 기존대로 유지합니다.
    color: #767676;
  }
`;
