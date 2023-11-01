/*
  설명: 사용자 accountname의 프로필 페이지(남의 페이지)
  작성자: 이해지
  최초 작성 날짜: 2023.10.23
  마지막 수정 날까: 2023.10.29
*/

import React from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import ProfileDetail from '../../Components/Common/ProfileDetail';
import FollowButton from '../../Components/Common/FollowButton';
import ProfileDetailPost from '../../Components/Common/ProfileDetailPost';
import ProfileDetailProduct from '../../Components/Common/ProfileDetailProduct';
import userNameAtom from '../../Recoil/userNameAtom';
import styled from 'styled-components';
import Gobackbtn from '../../Components/Common/GoBackbtn';
import KebabBtn from '../../Assets/images/icon- more-vertical.png';

import MsgIcon from '../../Assets/icons/message-btn.svg';
import ShareIcon from '../../Assets/icons/share-btn.svg';

// import Header from '../../Components/Common/HeaderBasic';
import Footer from '../../Components/Common/Footer';
import { Container } from '../../Components/Common/Container';

// 프로필보기
function YourProfile() {
  const navigate = useNavigate();

  const userType = useRecoilValue(userNameAtom).includes('[o]') ? 'organization' : 'Individual';
  console.log(userType);
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
      <section>
        <HeaderContainer>
          <Gobackbtn />
          <img src={KebabBtn} />
        </HeaderContainer>
        {/* <Header /> */}
        <HiddenH1>남의 프로필</HiddenH1>
        <section>
          <ProfileTop>
            <ProfileDetail />
            <Btns>
              <FollowButton />
              <CircleBtn>
                <button
                  type='button'
                  onClick={() => {
                    navigate(`/chat`);
                  }}
                >
                  <img src={MsgIcon} alt='' />
                </button>
                <button onClick={copyURLToClipboard}>
                  <img src={ShareIcon} alt='' />
                </button>
              </CircleBtn>
            </Btns>
          </ProfileTop>

          {/* 라우터에 연결되면 채팅방으로 연결 */}
        </section>
        {userType === 'organization' ? <ProfileDetailProduct /> : null}
        <ProfileDetailPost />
        <Footer />
      </section>
    </Container>
  );
}

export default YourProfile;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  height: 48px;
  min-height: 48px;
  max-height: 48px;
  gap: 65px;
  width: 390px;
  background-color: #fff;
  border-bottom: 1px solid #dbdbdb;
  align-items: center;
  font-size: 21px;
  font-weight: bold;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;

  img {
    cursor: pointer;
    align-items: center;
    gap: 5px;
    width: 24px;
    height: 24px;
  }
`;

const a11yHidden = `
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  width: 1px
	height: 1px;
	margin: -1px;
  overflow: hidden;
	padding: 0;
	position: absolute;
`;

const HiddenH1 = styled.h1`
  ${a11yHidden}
`;

const ProfileTop = styled.div`
  position: relative;
`;

const Btns = styled.div`
  position: absolute;
  top: 128px;
  right: 16px;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 6px;

  button {
  }
`;

const CircleBtn = styled.div`
  display: flex;
  gap: 8px;
  button {
  }
`;
