/*
  설명: 프로필 상세 페이지 하단 게시물 목록 컴포넌트
  작성자: 이해지
  최초 작성 날짜: 2023.10.29
  마지막 수정 날까: 2023.10.29
*/

import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';
import PostCard from '../../Components/Common/PostCard';
import userToken from '../../Recoil/userTokenAtom'; //파일경로 변경 완료

export default function ProfileDetailPost() {
  const location = useLocation();
  const token = useRecoilValue(userToken);
  const userAccountname = location.pathname.replace('/profile/', '');

  const [myPostList, setMyPostList] = useState([]);
  const [view, setView] = useState('PostList');

  const getMyAcnt = async () => {
    const res = await fetch(`https://api.mandarin.weniv.co.kr/user/myinfo`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();
    return json.user['accountname'];
  };

  const postList = async (accountName) => {
    const acnt = userAccountname === 'myInfo' ? accountName : userAccountname;
    const res = await fetch(`https://api.mandarin.weniv.co.kr/post/${acnt}/userpost`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();
    setMyPostList(json.post);
  };

  useEffect(() => {
    const fetchData = async () => {
      const accountName = await getMyAcnt();
      postList(accountName);
    };

    fetchData();
  }, []);

  return (
    <div>
      <button onClick={() => setView('PostList')}>햄버거 버튼</button>
      <button onClick={() => setView('PostImgList')}>벤토 버튼</button>

      {view === 'PostList' && (
        <ul>
          {myPostList.map((item) => {
            return <PostCard key={item.id} post={item} />;
          })}
        </ul>
      )}
      {view === 'PostImgList' && <p>벤토버튼 클릭</p>}
    </div>
  );
}
