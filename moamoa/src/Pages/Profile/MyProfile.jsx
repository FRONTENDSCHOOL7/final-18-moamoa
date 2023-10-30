/*
  설명: 사용자 accountname의 프로필 페이지(내 페이지)
  작성자: 이해지
  최초 작성 날짜: 2023.10.29
  마지막 수정 날까: 2023.10.29
*/

import React from 'react';
import { useNavigate } from 'react-router-dom';

import ProfileDetail from '../../Components/Common/ProfileDetail';
import ProfileDetailPost from '../../Components/Common/ProfileDetailPost';
import ProfileDetailProduct from '../../Components/Common/ProfileDetailProduct';
import Header from '../../Components/Common/HeaderBasic';
import Footer from '../../Components/Common/Footer';

// 프로필보기
function MyProfile() {
  const navigate = useNavigate();
  // const joinData = useRecoilValue(userTypeAtom);

  return (
    <section>
      <Header />
      <h1>내 프로필</h1>
      <section>
        <ProfileDetail />
        <button
          type='button'
          onClick={() => {
            navigate('/profile/edit');
          }}
        >
          프로필 수정
        </button>
        {/* 일반 계정일 경우 상품등록 버튼 제거 */}
        {/* {joinData.userType === 'organization' ? ( */}
        <button
          type='button'
          onClick={() => {
            navigate('/product');
          }}
        >
          상품 등록
        </button>
        {/* ) : null} */}
      </section>
      <ProfileDetailProduct />
      <ProfileDetailPost />
      <Footer />
    </section>
  );
}

export default MyProfile;
