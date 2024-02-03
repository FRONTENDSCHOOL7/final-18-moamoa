import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types'; // npm install prop-types 설치 필요

import { userPostList } from '../../API/Post/PostAPI';
import { productList } from '../../API/Product/ProductAPI';
import { PostCountWrap } from './ProfileStyle';

export default function PostCount({ accountName, userType }) {
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
  }, [accountName]);

  return (
    <PostCountWrap>
      <p>{postCount + productCount}</p>
      <p>게시글 수</p>
    </PostCountWrap>
  );
}

PostCount.propTypes = {
  accountName: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired,
};
