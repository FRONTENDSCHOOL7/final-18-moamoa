/*
  설명: 프로필 상세 페이지 공통 UI
  작성자: 이해지
  최초 작성 날짜: 2023.10.29
  마지막 수정 날까: 2023.12.13
*/

import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types'; // npm install prop-types 설치 필요
import styled from 'styled-components';
import UserTypeCheck from '../../Assets/icons/icon-usertype-check.svg';

import PostCount from './PostCount';

ProfileDetail.propTypes = {
  userInfoData: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
};

export default function ProfileDetail({ userInfoData, token }) {
  const navigate = useNavigate();
  const [followerCount, setFollowerCount] = useState(userInfoData.profileFollowerCount);

  // 부모 컴포넌트로부터 받은 userInfoData의 변경사항을 감지
  useEffect(() => {
    // 팔로워 수가 변경되었는지 확인하고 state를 업데이트합니다.
    setFollowerCount(userInfoData.profileFollowerCount);
  }, [userInfoData.profileFollowerCount]);

  return (
    <ProfileDetailBox>
      <section>
        <ProfileImg>
          <img src={userInfoData.profileImg} alt='Profile' />
        </ProfileImg>
        <ProfileInfo>
          <div>
            <p>
              {userInfoData.userType === 'organization'
                ? userInfoData.profileUsername.replace('[o]', '')
                : userInfoData.profileUsername.replace('[i]', '')}
              {userInfoData.userType === 'organization' ? <img src={UserTypeCheck} alt='' /> : ''}
            </p>
            <p>@{userInfoData.profileAccountname}</p>
          </div>
          <p className='profile-intro'>{userInfoData.profileIntro}</p>
        </ProfileInfo>

        <CountWrap>
          {userInfoData.profileAccountname &&
            userInfoData.profileImg &&
            userInfoData.profileUsername && (
              <PostCount
                accountName={userInfoData.profileAccountname}
                token={token}
                userType={userInfoData.userType}
              />
            )}
          <span></span>
          <button
            type='button'
            onClick={() => {
              navigate(`/profile/${userInfoData.profileAccountname}/follower`);
            }}
          >
            <p>{followerCount}</p>
            <p>팔로워</p>
          </button>
          <span></span>
          <button
            type='button'
            onClick={() => {
              navigate(`/profile/${userInfoData.profileAccountname}/following`);
            }}
          >
            <p>{userInfoData.profileFollowingCount}</p>
            <p>팔로잉</p>
          </button>
        </CountWrap>
      </section>
    </ProfileDetailBox>
  );
}

const ProfileDetailBox = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #dbdbdb;
`;
const ProfileImg = styled.div`
  background: linear-gradient(to bottom, #ffc700 50%, #ffc700 calc(30% + 65px), transparent 50%);
  padding-top: 65px;
  padding-left: 20px;

  img {
    width: 105px;
    height: 105px;
    border-radius: 50%;
    border: 5px solid #fff;
    background: #fff;
  }
`;

const ProfileInfo = styled.div`
  padding: 10px 16px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    color: #767676;
    font-size: 12px;
  }

  p:first-child {
    color: #000;
    font-size: 16px;
    margin-bottom: 0.2rem;
  }

  .profile-intro {
    font-size: 14px;
  }

  div {
    p:first-child {
      display: flex;
      align-items: center;
      gap: 3px;
    }
  }
`;

const CountWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  padding: 14px 0;
  text-align: center;

  p {
    font-size: 18px;
  }

  button {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    p: last-child {
      font-size: 10px;
      color: #767676;
    }
  }

  span {
    display: inline-block;
    width: 0.5px;
    height: 22px;
    background-color: #e3e3e3;
  }
`;
