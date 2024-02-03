/*
  설명: 팔로우/언팔로우 버튼 - 남의 프로필
  작성자: 이해지
  최초 작성 날짜: 2023.10.29
  마지막 수정 날까: 2024.02.03
*/

import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types'; // npm install prop-types 설치 필요

import { followAPI, unFollowAPI } from '../../API/Follow/FollowAPI';
import { FollowBtn } from './ProfileStyle';
FollowButton.propTypes = {
  userAccount: PropTypes.string.isRequired,
  isFollow: PropTypes.bool.isRequired,
  reFetchInfo: PropTypes.func.isRequired,
};

export default function FollowButton({ userAccount, isFollow, reFetchInfo }) {
  const [isFollowed, setIsFollowed] = useState(isFollow);

  useEffect(() => {
    setIsFollowed(isFollow);
  }, [isFollow]);

  // 팔로우/언팔로우
  const handleFollow = async () => {
    if (isFollowed) {
      await unFollowAPI(userAccount);
    } else {
      await followAPI(userAccount);
    }
    reFetchInfo();
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
