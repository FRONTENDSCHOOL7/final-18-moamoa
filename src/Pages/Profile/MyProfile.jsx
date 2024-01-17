/*
  설명: 사용자 accountname의 프로필 페이지(내 페이지)
  작성자: 이해지
  최초 작성 날짜: 2023.10.29
  마지막 수정 날까: 2023.12.08
*/

import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import ProfileDetail from '../../Components/Profile/ProfileDetail';
import ProfileDetailPost from '../../Components/Profile/ProfileDetailPost';
import ProfileDetailProduct from '../../Components/Profile/ProfileDetailProduct';
import { Container } from '../../Components/Common/Container';

import userToken from '../../Recoil/userTokenAtom'; //파일경로 변경 완료

import Footer from '../../Components/Common/Footer';
import styled from 'styled-components';
import Header from '../../Components/Common/Header/Header';

import { getMyProfileData } from '../../API/Profile/ProfileAPI';

// 프로필보기
function MyProfile() {
  const navigate = useNavigate();
  const token = useRecoilValue(userToken);

  const [profileImg, setProfileImg] = useState('');
  const [profileUsername, setProfileUsername] = useState('');
  const [profileAccountname, setProfileAccountname] = useState('');
  const [profileIntro, setProfileIntro] = useState('');
  const [profileFollowerCount, setProfileFollowerCount] = useState(0);
  const [profileFollowingCount, setProfileFollowingCount] = useState(0);

  async function UserInfo() {
    try {
      const res = await getMyProfileData();

      setProfileImg(res.user['image']);
      setProfileAccountname(res.user['accountname']);
      setProfileUsername(res.user['username']);
      setProfileIntro(res.user['intro']);
      setProfileFollowerCount(res.user['followerCount']);
      setProfileFollowingCount(res.user['followingCount']);
    } catch (error) {
      console.error('An error occurred while fetching user info:', error);
    }
  }

  useEffect(() => {
    UserInfo();
  }, [token]); // `token`이 변경될 때만 `fetchUserInfo`를 호출합니다.

  const userType = profileUsername.slice(0, 3) === '[o]' ? 'organization' : 'Individual';

  console.log(`userType : ${userType}`);
  const userInfoData = {
    profileImg,
    profileUsername,
    profileAccountname,
    profileIntro,
    profileFollowerCount,
    profileFollowingCount,
    userType,
  };

  return (
    <Container>
      <Header type='moreKebab' />
      <ProfileWrap>
        <section>
          <HiddenH1>내 프로필</HiddenH1>
          <ProfileTop>
            <section>
              <ProfileDetail userInfoData={userInfoData} />
              <Btns>
                <button
                  type='button'
                  onClick={() => {
                    navigate('/profile/edit');
                  }}
                >
                  프로필 수정
                </button>
                {/* 일반 계정일 경우 상품등록 버튼 제거 */}
                {userType === 'organization' ? (
                  <button
                    type='button'
                    onClick={() => {
                      navigate('/product');
                    }}
                  >
                    행사 등록
                  </button>
                ) : null}
              </Btns>
            </section>
          </ProfileTop>
          {userType === 'organization' ? (
            <ProfileDetailProduct userInfoData={userInfoData} reFetchInfo={UserInfo} />
          ) : null}
          <ProfileDetailPost accountName={profileAccountname} />

          <Footer />
        </section>
      </ProfileWrap>
    </Container>
  );
}

export default MyProfile;

const a11yHidden = `
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  width: 1px;
	height: 1px;
	margin: -1px;
  overflow: hidden;
	padding: 0;
	position: absolute;
`;

const HiddenH1 = styled.h1`
  ${a11yHidden}
`;
const ProfileWrap = styled.div`
  background-color: #fff;
`;
const ProfileTop = styled.div`
  position: relative;
  margin-top: 48px;
`;

const Btns = styled.div`
  position: absolute;
  top: 128px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  button {
    padding: 8px 23px;
    border: 1px solid var(--DBDBDB, #dbdbdb);
    border-radius: 30px;
    font-size: 14px;
    font-weight: 700;

    color: #767676;
  }
`;