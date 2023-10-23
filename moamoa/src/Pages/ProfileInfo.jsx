import React, { useState, useEffect } from 'react';

// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzY2M2VmYjJjYjIwNTY2Mzg1NzkwMSIsImV4cCI6MTcwMzI1MTUyNywiaWF0IjoxNjk4MDY3NTI3fQ.mhjKmJmBu7Acf-oukcUJOLcWya3m5yj145787KK36ws';

// 프로필보기
export default function ProfileInfo() {
  const [profileImg, setProfileImg] = useState('');
  const [profileUsername, setProfileUsername] = useState('');
  const [profileAccountname, setProfileAccountname] = useState('');
  const [profileIntro, setProfileIntro] = useState('');
  // const [profileTotalPost, setProfileTotalPost] = useState('')
  const [profileFollowerCount, setProfileFollowerCount] = useState(0);
  const [profileFollowingCount, setProfileFollowingCount] = useState(0);

  const getMyinfo = async () => {
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
    getMyinfo(); // 컴포넌트가 마운트될 때 getMyinfo 함수 호출
  }, []); // 빈 의존성 배열을 전달하여 마운트될 때만 실행

  return (
    <div>
      <section>
        <h2>내 프로필</h2>
        {/* <button type='button' onClick={getMyinfo}>
          내 정보 불러오기
        </button> */}
        <section>
          <img src={profileImg} alt='Profile' />
          <p>닉네임: {profileUsername}</p>
          <p>계정 id: {profileAccountname}</p>
          <p>소개글: {profileIntro}</p>
          <p>게시글 수: </p>
          <p>팔로워: {profileFollowerCount}</p>
          <p>팔로잉: {profileFollowingCount}</p>
        </section>
      </section>
    </div>
  );
}
