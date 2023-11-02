import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Common/Button';
import PropTypes from 'prop-types'; // npm install prop-types 설치 필요
import { useNavigate } from 'react-router-dom';

FollowUser.propTypes = {
  src: PropTypes.string.isRequired,
  userId: PropTypes.string,
  userText: PropTypes.string,
  accountname: PropTypes.string,
};

export default function FollowUser(props) {
  const [isFollowed, setIsFollowed] = useState(false);
  const navigate = useNavigate();
  const handleButtonClick = () => {
    setIsFollowed(!isFollowed);
  };
  const { userText, userId } = props;
  const handleUser = (accountname) => {
    navigate(`/profile/${accountname}`);
  };
  return (
    <div>
      <FollowWrap>
        <UserPhotoWrap>
          <UserPhoto
            src={props.src}
            onClick={() => handleUser(props.accountname)}
            alt='Follower'
          ></UserPhoto>
        </UserPhotoWrap>
        <UserInfo onClick={() => handleUser(props.accountname)}>
          <UserId>{userId}</UserId>
          <UserText>{userText}</UserText>
        </UserInfo>
        <Button
          width='56'
          isFollowed={isFollowed}
          buttonText={isFollowed ? '취소' : '팔로우'}
          backgroundColor={isFollowed ? '#fff' : '#87b7e4'}
          color={isFollowed ? '#767676' : '#fff'}
          bordered={isFollowed}
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
