/*
  설명: 프로필 상세 페이지 공통 UI
  작성자: 이해지
  최초 작성 날짜: 2023.10.29
  마지막 수정 날까: 2023.10.29
*/

import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';
import userToken from '../../Recoil/userTokenAtom'; //파일경로 변경 완료

import userTypeAtom from '../../Recoil/userTypeAtom'; //파일경로 변경 완료

function PostCnt() {
  const location = useLocation();
  const token = useRecoilValue(userToken);
  // const joinData = useRecoilValue(userTypeAtom);
  const userAccountname = location.pathname.replace('/profile/', ''); // 경로에서 사용자 accountname을 추출

  const [postCount, setPostCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchPostCount = async () => {
      const res = await fetch(`https://api.mandarin.weniv.co.kr/post/${userAccountname}/userpost`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const json = await res.json();
      setPostCount(json.post.length);
    };

    const fetchProductCount = async () => {
      const res = await fetch(`https://api.mandarin.weniv.co.kr/product/${userAccountname}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const json = await res.json();

      setProductCount(json.product.length);
      // //판매자 계정이 아닐경우 행사 길이가 0
      // joinData.userType === 'organization'
      //   ? setProductCount(json.product.length)
      //   : setProductCount(0);
    };

    fetchPostCount();
    fetchProductCount();
  }, [userAccountname, token]);

  return <p>게시글 수 : {postCount + productCount}</p>;
}

export default function ProfileDetail() {
  const location = useLocation();

  const [profileImg, setProfileImg] = useState('');
  const [profileUsername, setProfileUsername] = useState('');
  const [profileAccountname, setProfileAccountname] = useState('');
  const [profileIntro, setProfileIntro] = useState('');
  const [profileFollowerCount, setProfileFollowerCount] = useState(0);
  const [profileFollowingCount, setProfileFollowingCount] = useState(0);

  const token = useRecoilValue(userToken);
  const joinData = useRecoilValue(userTypeAtom);
  const userAccountname = location.pathname.replace('/profile/', ''); // 경로에서 사용자 accountname을 추출

  const getYourinfo = async () => {
    // const accountname = localStorage.getItem('accountname');

    const res = await fetch(`https://api.mandarin.weniv.co.kr/profile/${userAccountname}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();
    console.log(json);
    console.log(`유저타입: ${JSON.stringify(joinData)}`);

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
    <section>
      <img src={profileImg} alt='Profile' />
      <p>
        닉네임: {profileUsername}
        {joinData.userType === 'organization' ? <span>★</span> : ''}
      </p>
      <p>계정 id: {profileAccountname}</p>
      <p>소개글: {profileIntro}</p>
      {/* <p>게시글 수: 행사</p>   */}
      <PostCnt />
      <p>팔로워: {profileFollowerCount}</p>
      <p>팔로잉: {profileFollowingCount}</p>
    </section>
  );
}
