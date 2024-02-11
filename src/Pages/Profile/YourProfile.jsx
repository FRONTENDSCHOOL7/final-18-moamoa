/*
  설명: 사용자 accountname의 프로필 페이지(남의 페이지)
  작성자: 이해지
  최초 작성 날짜: 2023.10.23
  마지막 수정 날까: 2023.02.07
*/

import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import ProfileDetail from '../../Components/Profile/ProfileDetail';

import FollowButton from '../../Components/Profile/FollowButton';
import ProfileDetailPost from '../../Components/Profile/ProfileDetailPost';
import ProfileDetailProduct from '../../Components/Profile/ProfileDetailProduct';

import MsgIcon from '../../Assets/icons/message-btn.svg';
import ShareIcon from '../../Assets/icons/share-btn.svg';
import MsgIcon_desktop from '../../Assets/icons/message-btn-desktop.svg';
import ShareIcon_desktop from '../../Assets/icons/share-btn-desktop.svg';
import userToken from '../../Recoil/userTokenAtom'; //파일경로 변경 완료

import NavBar from '../../Components/Common/NavBar';
import { Container } from '../../Components/Common/Container';
import HeaderKebab from '../../Components/Header/HeaderKebab';

import { getYourProfileData } from '../../API/Profile/ProfileAPI';
import { ProfileWrap, ProfileTop, Btns, CircleBtn } from './ProfileStyle';

// 프로필보기
function YourProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = useRecoilValue(userToken);

  const [profileImg, setProfileImg] = useState('');
  const [profileUsername, setProfileUsername] = useState('');
  const [profileAccountname, setProfileAccountname] = useState('');
  const [profileIntro, setProfileIntro] = useState('');
  const [profileFollowerCount, setProfileFollowerCount] = useState(0);
  const [profileFollowingCount, setProfileFollowingCount] = useState(0);
  const [isFollow, setIsFollow] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  async function UserInfo() {
    setIsLoading(true);
    try {
      const infoUrl = location.pathname;
      const res = await getYourProfileData(infoUrl);

      setProfileImg(res.profile['image']);
      setProfileAccountname(res.profile['accountname']);
      setProfileUsername(res.profile['username']);
      setProfileIntro(res.profile['intro']);
      setProfileFollowerCount(res.profile['followerCount']);
      setProfileFollowingCount(res.profile['followingCount']);
      setIsFollow(res.profile['isfollow']);
    } catch (error) {
      console.error('An error occurred while fetching user info:', error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    UserInfo();
  }, [token, location.pathname]); // `token`이 변경될 때만 `fetchUserInfo`를 호출합니다.

  const userType = profileUsername.slice(0, 3) === '[o]' ? 'organization' : 'Individual';

  const userInfoData = {
    profileImg,
    profileUsername,
    profileAccountname,
    profileIntro,
    profileFollowerCount,
    profileFollowingCount,
    userType,
    isFollow,
  };

  const userName = userInfoData.profileUsername
    .slice(3, userInfoData.profileUsername.length)
    .replace(/ /g, '-');

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 현제 페이지 주소 복사
  function copyURLToClipboard() {
    const currentURL = window.location.href;
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        alert('페이지 주소가 클립보드에 복사되었습니다!');
      })
      .catch((err) => {
        console.error('주소 복사 실패!: ', err);
      });
  }

  return (
    <Container>
      <HeaderKebab />
      <ProfileWrap>
        <section>
          <h1 className='a11y-hidden'>남의 프로필</h1>
          <ProfileTop>
            <section>
              <ProfileDetail userInfoData={userInfoData} />
              <Btns>
                <FollowButton
                  userAccount={userInfoData.profileAccountname}
                  isFollow={!isLoading && userInfoData.isFollow}
                  reFetchInfo={UserInfo}
                />
                <CircleBtn>
                  <button
                    type='button'
                    onClick={() => {
                      navigate(`/chat/${userName}`);
                    }}
                  >
                    <img src={windowWidth >= 1200 ? MsgIcon_desktop : MsgIcon} alt='' />
                  </button>
                  <button onClick={copyURLToClipboard}>
                    <img src={windowWidth >= 1200 ? ShareIcon_desktop : ShareIcon} alt='' />
                  </button>
                </CircleBtn>
              </Btns>
            </section>
          </ProfileTop>
          {/* 라우터에 연결되면 채팅방으로 연결 */}
        </section>
        {userType === 'organization' ? (
          <ProfileDetailProduct userInfoData={userInfoData} reFetchInfo={UserInfo} />
        ) : null}
        <ProfileDetailPost accountName={profileAccountname} />
        <NavBar />
      </ProfileWrap>
    </Container>
  );
}

export default YourProfile;
