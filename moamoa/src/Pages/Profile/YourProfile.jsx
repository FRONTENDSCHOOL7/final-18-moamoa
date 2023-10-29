/*
  설명: 사용자 accountname의 프로필 페이지(남의 페이지)
  작성자: 이해지
  최초 작성 날짜: 2023.10.23
  마지막 수정 날까: 2023.10.29
*/

import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';
import userToken from '../../Recoil/userTokenAtom'; //파일경로 변경 완료

import ProductImgBox from '../../Components/Common/ProductImgBox';
import ProfileDetail from '../../Components/Common/ProfileDetail';
import FollowButton from '../../Components/Common/FollowButton';
import ProfileDetailPost from '../../Components/Common/ProfileDetailPost';

//진행중인 행사
function EventList() {
  const location = useLocation();
  const [eventList, setEventList] = useState([]);
  const token = useRecoilValue(userToken);
  // const joinData = useRecoilValue(joinStateAtom);
  const userAccountname = location.pathname.replace('/profile/', ''); // 경로에서 사용자 accountname을 추출

  const getEventList = async () => {
    const res = await fetch(`https://api.mandarin.weniv.co.kr/product/${userAccountname}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();

    console.log(json);
    setEventList(json.product);
  };

  useEffect(() => {
    getEventList();
  }, []);

  // 판매자일 경우에만 진행중인 행사를 출력
  return (
    <article>
      <h2>진행중인 행사</h2>
      {/* <button type='button' onClick={getEventList}> </button> */}
      <section>
        {eventList.map((event) => (
          //
          <div key={event.id}>
            <ProductImgBox src={event.itemImage} />
            <p>{event.itemName}</p>
            <p>{event.price}</p>
          </div>
        ))}
      </section>
    </article>
  );
}

// 프로필보기
function YourProfile() {
  // 게시글 화면 전환

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
    <div>
      <section>
        <h1>남의 프로필</h1>
        <section>
          <ProfileDetail />
          <FollowButton />
          {/* 라우터에 연결되면 채팅방으로 연결 */}
          <button>채팅 버튼</button>
          <button onClick={copyURLToClipboard}>공유 버튼</button>
        </section>
        <EventList />
        <ProfileDetailPost />
      </section>
    </div>
  );
}

export default YourProfile;
