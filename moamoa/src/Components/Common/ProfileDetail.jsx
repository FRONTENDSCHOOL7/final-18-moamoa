/*
  설명: 프로필 상세 페이지 공통 UI
  작성자: 이해지
  최초 작성 날짜: 2023.10.29
  마지막 수정 날까: 2023.11.01
*/

import React, { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'; // npm install prop-types 설치 필요
import userToken from '../../Recoil/userTokenAtom'; //파일경로 변경 완료
import userNameAtom from '../../Recoil/userNameAtom';
import styled from 'styled-components';

function PostCnt({ src, token, userType }) {
  const [postCount, setPostCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  const fetchPostCount = async () => {
    const res = await fetch(`https://api.mandarin.weniv.co.kr/post/${src}/userpost`, {
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
    const res = await fetch(`https://api.mandarin.weniv.co.kr/product/${src}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();
    setProductCount(json.product.length);
    //판매자 계정이 아닐경우 행사 길이가 0
    userType === 'organization' ? setProductCount(json.product.length) : setProductCount(0);
  };

  useEffect(() => {
    fetchPostCount();
    fetchProductCount();
  }, [src, token]);

  return (
    <PostCountWrap>
      <p>{postCount + productCount}</p>
      <p>게시글 수</p>
    </PostCountWrap>
  );
}

PostCnt.propTypes = {
  src: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired,
};

export default function ProfileDetail() {
  const location = useLocation();
  const setUserName = useSetRecoilState(userNameAtom);

  const [profileImg, setProfileImg] = useState('');
  const [profileUsername, setProfileUsername] = useState('');
  const [profileAccountname, setProfileAccountname] = useState('');
  const [profileIntro, setProfileIntro] = useState('');
  const [profileFollowerCount, setProfileFollowerCount] = useState(0);
  const [profileFollowingCount, setProfileFollowingCount] = useState(0);

  const token = useRecoilValue(userToken);
  const userAccountname = location.pathname.replace('/profile/', ''); // 경로에서 사용자 accountname을 추출
  const myUrl = `https://api.mandarin.weniv.co.kr/user/myinfo`;
  const yourUrl = `https://api.mandarin.weniv.co.kr/profile/${userAccountname}`;
  let resultUrl = userAccountname === 'myInfo' ? myUrl : yourUrl;

  const getYourinfo = async () => {
    const res = await fetch(resultUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();
    console.log(json);

    if (userAccountname === 'myInfo') {
      setProfileImg(json.user['image']);
      setProfileAccountname(json.user['accountname']);
      setProfileUsername(json.user['username']);
      setProfileIntro(json.user['intro']);
      setProfileFollowerCount(JSON.stringify(json.user['followerCount']));
      setProfileFollowingCount(JSON.stringify(json.user['followingCount']));
      setUserName(json.user['username']);
    } else {
      setProfileImg(json.profile['image']);
      setProfileAccountname(json.profile['accountname']);
      setProfileUsername(json.profile['username']);
      setProfileIntro(json.profile['intro']);
      setProfileFollowerCount(JSON.stringify(json.profile['followerCount']));
      setProfileFollowingCount(JSON.stringify(json.profile['followingCount']));
      setUserName(json.profile['username']);
    }
  };

  useEffect(() => {
    getYourinfo(); // 컴포넌트가 마운트될 때 getMyinfo 함수 호출
  }, []); // 빈 의존성 배열을 전달하여 마운트될 때만 실행

  const userType = profileUsername.includes('[o]') ? 'organization' : 'Individual';

  return (
    <ProfileDetailBox>
      <section>
        <ProfileImg>
          <img src={profileImg} alt='Profile' />
        </ProfileImg>
        <ProfileInfo>
          <div>
            <p>
              {userType === 'organization'
                ? profileUsername.replace('[o]', '')
                : profileUsername.replace('[i]', '')}
              {userType === 'organization' ? <span>★</span> : ''}
            </p>
            <p>@{profileAccountname}</p>
          </div>
          <p className='profile-intro'>{profileIntro}</p>
        </ProfileInfo>

        <CountWrap>
          {profileAccountname && profileImg && profileUsername && (
            <PostCnt src={profileAccountname} token={token} userType={userType} />
          )}
          <span></span>
          <button>
            <p>{profileFollowerCount}</p>
            <p>팔로워</p>
          </button>
          <span></span>
          <button>
            <p>{profileFollowingCount}</p>
            <p>팔로잉</p>
          </button>
        </CountWrap>
      </section>
    </ProfileDetailBox>
  );
}

const ProfileDetailBox = styled.div`
  height: 328px;
`;
const ProfileImg = styled.div`
  background: linear-gradient(to bottom, #ffc700 50%, #ffc700 calc(30% + 65px), transparent 50%);
  padding-top: 65px;
  padding-left: 20px;

  img {
    width: 105px;
    height: 105px;
    border-radius: 50%;
    border: 5px solid #fff;
  }
`;

const ProfileInfo = styled.div`
  padding: 10px 16px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  background: red;

  p {
    color: #767676;
    font-size: 12px;
  }

  p:first-child {
    color: #000;
    font-size: 16px;
  }

  .profile-intro {
    font-size: 14px;
  }
`;

const CountWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  padding: 14px 0;
  background: green;
  text-align: center;

  p {
    font-size: 18px;
  }

  button {
    display: flex; // button 내부를 flex 레이아웃으로 설정합니다.
    flex-direction: column; // 세로 방향으로 아이템을 배치합니다.
    gap: 5px; // p 태그 간의 간격을 5px로 설정합니다. 원하는 크기로 조절 가능합니다.
    align-items: center;
    p: last-child {
      font-size: 10px; // 버튼 내의 <p> 태그에 대한 텍스트 크기
      color: #767676;
    }
  }

  span {
    display: inline-block; // inline-block으로 설정해야 width와 height가 적용됩니다.
    width: 0.5px; // 가로 길이를 50px로 설정
    height: 22px; // 세로 길이를 2px로 설정 (원하는대로 조절 가능)
    background-color: #e3e3e3; // span의 배경 색을 검정색으로 설정
  }
`;

const PostCountWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  p {
    font-size: 18px; // 여기에서 텍스트 사이즈를 10px로 변경합니다.
  }

  p:last-child {
    font-size: 10px; // 첫 번째 p 태그 (게시글 수 숫자)는 기존대로 유지합니다.
    color: #767676;
  }
`;
