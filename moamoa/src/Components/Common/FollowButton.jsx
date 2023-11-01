/*
  설명: 팔로우/언팔로우 버튼 - 남의 프로필
  작성자: 이해지
  최초 작성 날짜: 2023.10.29
  마지막 수정 날까: 2023.11.02
*/

import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import userToken from '../../Recoil/userTokenAtom'; //파일경로 변경 완료
import styled from 'styled-components';

// 팔로우
function Follow() {
  const token = useRecoilValue(userToken);
  const userAccountname = location.pathname.replace('/profile/', '');

  const follow = async () => {
    const res = await fetch(
      //  /profile/:accountname/follow => :accountname부분에 팔로우 할 계정의 accountname을 작성
      `https://api.mandarin.weniv.co.kr/profile/${userAccountname}/follow`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      },
    );
    const json = await res.json();
    console.log(json);
  };

  return follow;
}

// 언팔로우
function UnFollow() {
  const token = useRecoilValue(userToken);
  const userAccountname = location.pathname.replace('/profile/', '');

  const unfollow = async () => {
    const res = await fetch(
      //  /profile/:accountname/follow => :accountname부분에 팔로우 할 계정의 accountname을 작성
      `https://api.mandarin.weniv.co.kr/profile/${userAccountname}/unfollow`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      },
    );
    const json = await res.json();
    console.log(json);
  };
  return unfollow;
}

export default function FollowButton() {
  const followAction = Follow();
  const unfollowAction = UnFollow();
  const [isFollow, setIsFollow] = useState(true);

  const token = useRecoilValue(userToken);
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

    setIsFollow(json.profile['isfollow']);
  };

  useEffect(() => {
    getYourinfo(); // 컴포넌트가 마운트될 때 getMyinfo 함수 호출
  }, []); // 빈 의존성 배열을 전달하여 마운트될 때만 실행

  // 팔로우/언팔로우
  const handleFollow = () => {
    if (isFollow === true) {
      //팔로우 상태라면
      unfollowAction(); // 팔로우 상태를 변경합니다.
      setIsFollow(!isFollow);
    } else {
      // 언팔로우 상태라면
      followAction(); // 버튼 클릭시 followAction 함수를 실행합니다.
      setIsFollow(!isFollow); // 팔로우 상태를 변경합니다.
    }
  };

  return (
    <div>
      {/* 남의 계정 페이지 버튼 */}
      <FollowBtn isFollow={isFollow}>
        <button onClick={handleFollow}>{isFollow ? <p>언팔로우</p> : <p>팔로우</p>}</button>
      </FollowBtn>
      {/* 라우터에 연결되면 채팅방으로 연결 */}
    </div>
  );
}

const FollowBtn = styled.div`
  button {
    padding: 9px 42px;
    border-radius: 30px;
    font-size: 14px;
    font-weight: 700;
    color: #767676;
    background-color: ${(props) => (props.isFollow ? '#87B7E4' : '#fff')};
    border: 1px solid ${(props) => (props.isFollow ? '#87B7E4' : '#DBDBDB')};
  }

  p {
    color: ${(props) => (props.isFollow ? '#fff' : '#767676')};
  }
`;
