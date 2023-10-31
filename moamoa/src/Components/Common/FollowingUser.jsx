/* eslint-disable */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../Common/Button';
import PropTypes from 'prop-types'; // npm install prop-types 설치 필요

FollowUser.propTypes = {
  src: PropTypes.string.isRequired,
};

export default function FollowUser(props) {
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    // "isFollowed" 상태가 변경될 때마다 실행되는 효과 훅
    console.log(isFollowed);
  }, [isFollowed]);

  const handleButtonClick = () => {
    setIsFollowed(!isFollowed);
  };

  return (
    <div>
      <FollowWrap>
        <UserPhotoWrap>
          <UserPhoto src={props.src} alt='Follower'></UserPhoto>
        </UserPhotoWrap>
        <UserInfo>
          <UserId>{props.userId}</UserId>
          <UserText>{props.userText}</UserText>
        </UserInfo>
        <Button
          width='56'
          isFollowed={!isFollowed}
          buttonText={!isFollowed ? '취소' : '팔로우'}
          backgroundColor={!isFollowed ? '#fff' : '#87b7e4'}
          color={!isFollowed ? '#767676' : '#fff'}
          bordered={!isFollowed}
          onClickHandler={handleButtonClick}
        ></Button>
      </FollowWrap>
    </div>
  );
}

const FollowWrap = styled.div`
  width: 358px;
  height: 50px;

  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 0 8px 16px;
  Button {
    font-size: 12px;
    font-weight: bold;
    margin-left: 80px;
  }
`;
const UserPhotoWrap = styled.div`
  border: 1px solid var(--DBDBDB, #dbdbdb);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
`;
const UserPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const UserInfo = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const UserId = styled.h2`
  font-size: 14px;
`;
const UserText = styled.span`
  color: #767676;
  font-size: 12px;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
