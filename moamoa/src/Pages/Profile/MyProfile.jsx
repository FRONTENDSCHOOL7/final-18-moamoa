/*
  설명: 사용자 accountname의 프로필 페이지(내 페이지)
  작성자: 이해지
  최초 작성 날짜: 2023.10.29
  마지막 수정 날까: 2023.11.02
*/

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import ProfileDetail from '../../Components/Common/ProfileDetail';
import ProfileDetailPost from '../../Components/Common/ProfileDetailPost';
import ProfileDetailProduct from '../../Components/Common/ProfileDetailProduct';
import { Container } from '../../Components/Common/Container';

import userNameAtom from '../../Recoil/userNameAtom';

import Footer from '../../Components/Common/Footer';
import styled from 'styled-components';
import HeaderKebab from '../../Components/Common/HeaderKebab';

// 프로필보기
function MyProfile() {
  const navigate = useNavigate();

  const userType = useRecoilValue(userNameAtom).includes('[o]') ? 'organization' : 'Individual';

  console.log(`userType : ${userType}`);

  return (
    <Container>
      <HeaderKebab />
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
