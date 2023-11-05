/*
  설명: 팔로우/언팔로우 버튼 - 남의 프로필
  작성자: 이해지
  최초 작성 날짜: 2023.10.29
  마지막 수정 날까: 2023.11.05
*/

import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types'; // npm install prop-types 설치 필요

import FollowAPI from '../../API/Profile/FollowAPI';
import UnFollowAPI from '../../API/Profile/UnFollowAPI';

FollowButton.propTypes = {
  userAccount: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  isFollow: PropTypes.bool.isRequired,
  reFetchInfo: PropTypes.func.isRequired,
};

export default function FollowButton({ userAccount, token, isFollow, reFetchInfo }) {
  const [isFollowed, setIsFollowed] = useState(isFollow);

  useEffect(() => {
    setIsFollowed(isFollow);
  }, [isFollow]);

  // 팔로우/언팔로우
  const handleFollow = async () => {
    if (isFollowed === true) {
      await UnFollowAPI(userAccount, token, reFetchInfo);
    } else {
      await FollowAPI(userAccount, token, reFetchInfo);
    }
    setIsFollowed(!isFollowed);
  };

  return (
    <div>
      {/* 남의 계정 페이지 버튼 */}
      <FollowBtn className={isFollowed ? 'followed' : 'not-followed'}>
        <button onClick={handleFollow}>{isFollowed ? <p>언팔로우</p> : <p>팔로우</p>}</button>
      </FollowBtn>
      {/* 라우터에 연결되면 채팅방으로 연결 */}
    </div>
  );
}

const FollowBtn = styled.div`
  button {
    padding: 9px 42px;
    border-radius: 30px;
    font-size: 14px;
    font-weight: 700;
    color: #767676;
    background-color: #fff;
    border: 1px solid #dbdbdb;
  }

  p {
    color: #767676;
  }

  &.followed button {
    background-color: #87b7e4;
    border-color: #87b7e4;
  }

  &.followed p {
    color: #fff;
  }
`;
