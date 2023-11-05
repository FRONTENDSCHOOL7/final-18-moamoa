/*
  설명: 프로필 상세 페이지 공통 UI
  작성자: 이해지
  최초 작성 날짜: 2023.10.29
  마지막 수정 날까: 2023.11.05
*/

import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types'; // npm install prop-types 설치 필요
import styled from 'styled-components';
import UserTypeCheck from '../../Assets/icons/icon-usertype-check.svg';

// 게시글 수
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
ProfileDetail.propTypes = {
  userInfoData: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
};

export default function ProfileDetail({ userInfoData, token }) {
  const navigate = useNavigate();
  const [followerCount, setFollowerCount] = useState(userInfoData.profileFollowerCount);

  // 부모 컴포넌트로부터 받은 userInfoData의 변경사항을 감지
  useEffect(() => {
    // 팔로워 수가 변경되었는지 확인하고 state를 업데이트합니다.
    setFollowerCount(userInfoData.profileFollowerCount);
  }, [userInfoData.profileFollowerCount]);

  return (
    <ProfileDetailBox>
      <section>
        <ProfileImg>
          <img src={userInfoData.profileImg} alt='Profile' />
        </ProfileImg>
        <ProfileInfo>
          <div>
            <p>
              {userInfoData.userType === 'organization'
                ? userInfoData.profileUsername.replace('[o]', '')
                : userInfoData.profileUsername.replace('[i]', '')}
              {userInfoData.userType === 'organization' ? <img src={UserTypeCheck} alt='' /> : ''}
            </p>
            <p>@{userInfoData.profileAccountname}</p>
          </div>
          <p className='profile-intro'>{userInfoData.profileIntro}</p>
        </ProfileInfo>

        <CountWrap>
          {userInfoData.profileAccountname &&
            userInfoData.profileImg &&
            userInfoData.profileUsername && (
              <PostCnt
                src={userInfoData.profileAccountname}
                token={token}
                userType={userInfoData.userType}
              />
            )}
          <span></span>
          <button
            type='button'
            onClick={() => {
              navigate(`/profile/${userInfoData.profileAccountname}/follower`);
            }}
          >
            <p>{followerCount}</p>
            <p>팔로워</p>
          </button>
          <span></span>
          <button
            type='button'
            onClick={() => {
              navigate(`/profile/${userInfoData.profileAccountname}/following`);
            }}
          >
            <p>{userInfoData.profileFollowingCount}</p>
            <p>팔로잉</p>
          </button>
        </CountWrap>
      </section>
    </ProfileDetailBox>
  );
}

const ProfileDetailBox = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #dbdbdb;
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
    background: #fff;
  }
`;

const ProfileInfo = styled.div`
  padding: 10px 16px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    color: #767676;
    font-size: 12px;
  }

  p:first-child {
    color: #000;
    font-size: 16px;
    margin-bottom: 0.2rem;
  }

  .profile-intro {
    font-size: 14px;
  }

  div {
    p:first-child {
      display: flex;
      align-items: center;
      gap: 3px;
    }
  }
`;

const CountWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  padding: 14px 0;
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
    display: inline-block; // inline-block으로 설정해야 width와 height가 적용
    width: 0.5px;
    height: 22px;
    background-color: #e3e3e3;
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
