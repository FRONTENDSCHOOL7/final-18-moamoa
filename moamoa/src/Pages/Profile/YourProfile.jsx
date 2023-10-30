/*
  설명: 사용자 accountname의 프로필 페이지(남의 페이지)
  작성자: 이해지
  최초 작성 날짜: 2023.10.23
  마지막 수정 날까: 2023.10.29
*/

import React from 'react';

import ProfileDetail from '../../Components/Common/ProfileDetail';
import FollowButton from '../../Components/Common/FollowButton';
import ProfileDetailPost from '../../Components/Common/ProfileDetailPost';
import ProfileDetailProduct from '../../Components/Common/ProfileDetailProduct';
import Header from '../../Components/Common/HeaderBasic';
import Footer from '../../Components/Common/Footer';

// 프로필보기
function YourProfile() {
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
    <section>
      <Header />
      <h1>남의 프로필</h1>
      <section>
        <ProfileDetail />
        <FollowButton />
        {/* 라우터에 연결되면 채팅방으로 연결 */}
        <button>채팅 버튼</button>
        <button onClick={copyURLToClipboard}>공유 버튼</button>
      </section>
      <ProfileDetailProduct />
      <ProfileDetailPost />
      <Footer />
    </section>
  );
}

export default YourProfile;
