/*
  설명: 프로필 상세 페이지 공통 UI
  작성자: 이해지
  최초 작성 날짜: 2023.10.29
  마지막 수정 날까: 2024.02.03
*/

import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types'; // npm install prop-types 설치 필요
import UserTypeCheck from '../../Assets/icons/icon-usertype-check.svg';

import PostCount from './PostCount';
import { ProfileDetailBox, ProfileImg, ProfileInfo, CountWrap } from './ProfileStyle';

ProfileDetail.propTypes = {
  userInfoData: PropTypes.object.isRequired,
};

export default function ProfileDetail({ userInfoData }) {
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
