/*
  설명: 사용지 accountname의 프로필 페이지(남의 페이지)
  작성자: 이해지
  최초 작성 날짜: 2023.10.23
  마지막 수정 날까: 
*/

import React, { useState, useEffect } from 'react';

function EventList() {
  const [eventList, setEventList] = useState([]);

  const getEventList = async () => {
    const token = localStorage.getItem('token');
    const accountname = localStorage.getItem('accountname');

    const res = await fetch(`https://api.mandarin.weniv.co.kr/product/${accountname}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();

    setEventList(json.product);
  };

  useEffect(() => {
    getEventList();
  }, []);

  return (
    <div>
      <section>
        <h2>진행중인 행사</h2>
        {/* <button type='button' onClick={getEventList}>
          행사 불러오기
        </button> */}
        <section>
          {eventList.map((event) => (
            <div key={event.id}>
              <img src={event.itemImage} alt='Profile' />
              <p>{event.itemName}</p>
              <p>{event.price}</p>
            </div>
          ))}
        </section>
      </section>
    </div>
  );
}

// 프로필보기
function ProfileInfo() {
  const [profileImg, setProfileImg] = useState('');
  const [profileUsername, setProfileUsername] = useState('');
  const [profileAccountname, setProfileAccountname] = useState('');
  const [profileIntro, setProfileIntro] = useState('');
  // const [profileTotalPost, setProfileTotalPost] = useState('')
  const [profileFollowerCount, setProfileFollowerCount] = useState(0);
  const [profileFollowingCount, setProfileFollowingCount] = useState(0);

  const getYourinfo = async () => {
    const token = localStorage.getItem('token');
    const accountname = localStorage.getItem('accountname');

    const res = await fetch(`https://api.mandarin.weniv.co.kr/profile/${accountname}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();
    // console.log(json);

    setProfileImg(json.profile['image']);
    setProfileAccountname(JSON.stringify(json.profile['accountname']));
    setProfileUsername(JSON.stringify(json.profile['username']));
    setProfileIntro(JSON.stringify(json.profile['intro']));
    setProfileFollowerCount(JSON.stringify(json.profile['followerCount']));
    setProfileFollowingCount(JSON.stringify(json.profile['followingCount']));
  };

  useEffect(() => {
    getYourinfo(); // 컴포넌트가 마운트될 때 getMyinfo 함수 호출
  }, []); // 빈 의존성 배열을 전달하여 마운트될 때만 실행

  return (
    <div>
      <section>
        <h1>남의 프로필</h1>
        {/* <button type='button' onClick={getYourinfo}>
          내 정보 불러오기
        </button> */}
        <article>
          <img src={profileImg} alt='Profile' />
          <p>닉네임: {profileUsername}</p>
          <p>계정 id: {profileAccountname}</p>
          <p>소개글: {profileIntro}</p>
          {/* <p>게시글 수: 행사</p>   */}
          <p>팔로워: {profileFollowerCount}</p>
          <p>팔로잉: {profileFollowingCount}</p>
          <button type='button'>상품 등록</button>
          <button type='button'>프로필 수정</button>
        </article>
        <article>
          <EventList />
        </article>
      </section>
    </div>
  );
}

export default ProfileInfo;
