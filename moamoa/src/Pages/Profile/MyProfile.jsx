/*
  설명: 사용자 accountname의 프로필 페이지(내 페이지)
  작성자: 이해지
  최초 작성 날짜: 2023.10.29
  마지막 수정 날까: 2023.11.01
*/

import React from 'react';
import { useNavigate } from 'react-router-dom';

import ProfileDetail from '../../Components/Common/ProfileDetail';
import ProfileDetailPost from '../../Components/Common/ProfileDetailPost';
import ProfileDetailProduct from '../../Components/Common/ProfileDetailProduct';
import { Container } from '../../Components/Common/Container';

import userNameAtom from '../../Recoil/userNameAtom';
import { useRecoilValue } from 'recoil';
import Footer from '../../Components/Common/Footer';
import styled from 'styled-components';
import Gobackbtn from '../../Components/Common/GoBackbtn';
import KebabBtn from '../../Assets/images/icon- more-vertical.png';

// 프로필보기
function MyProfile() {
  const navigate = useNavigate();
  // const joinData = useRecoilValue(userTypeAtom);
  const userType = useRecoilValue(userNameAtom).includes('[o]') ? 'organization' : 'Individual';
  console.log(`userType : ${userType}`);

  return (
    <Container>
      <HeaderContainer>
        <Gobackbtn />
        <img src={KebabBtn} />
      </HeaderContainer>

      <section>
        <HiddenH1>내 프로필</HiddenH1>
        <ProfileTop>
          <section>
            <ProfileDetail />
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
                  상품 등록
                </button>
              ) : null}
            </Btns>
          </section>
        </ProfileTop>
        {userType === 'organization' ? <ProfileDetailProduct /> : null}
        <ProfileDetailPost />
        <Footer />
      </section>
    </Container>
  );
}

export default MyProfile;

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

const ProfileTop = styled.div`
  position: relative;
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
