import React, { useState } from 'react';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FollowWrap, UserPhotoWrap, UserPhoto, UserInfo, UserId, UserText } from './FollowStyle';

FollowUser.propTypes = {
  src: PropTypes.string.isRequired,
  userId: PropTypes.string,
  userText: PropTypes.string,
  accountname: PropTypes.string,
};

export default function FollowUser(props) {
  const [isFollowed, setIsFollowed] = useState(true);
  const navigate = useNavigate();
  const handleButtonClick = () => {
    setIsFollowed(!isFollowed);
  };
  const handleUser = (accountname) => {
    navigate(`/profile/${accountname}`);
  };
  return (
    <div>
      <FollowWrap>
        <UserPhotoWrap>
          <UserPhoto
            src={props.src}
            alt='Follower'
            onClick={() => handleUser(props.accountname)}
          ></UserPhoto>
        </UserPhotoWrap>
        <UserInfo onClick={() => handleUser(props.accountname)}>
          <UserId>{props.userId}</UserId>
          <UserText>{props.userText}</UserText>
        </UserInfo>
        <Button
          width='56'
          isFollowed={isFollowed}
          buttonText={isFollowed ? '취소' : '팔로우'}
          backgroundColor={isFollowed ? '#fff' : 'var(--buttonActive)'}
          color={isFollowed ? '#767676' : '#fff'}
          bordered={isFollowed}
          onClickHandler={handleButtonClick}
        ></Button>
      </FollowWrap>
    </div>
  );
}
