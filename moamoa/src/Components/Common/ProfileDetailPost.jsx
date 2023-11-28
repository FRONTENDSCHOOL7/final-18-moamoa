/*
  설명: 프로필 상세 페이지 내 게시물 목록(기본형/앨범형)
  작성자: 이해지
  최초 작성 날짜: 2023.10.29
  마지막 수정 날까: 2023.11.02

  수정자: 장수연 (2023.11.28)
*/

import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import HomePostCardList from '../Home/HomePostCardList';
import PostList from '../Post/PostList';
import userToken from '../../Recoil/userTokenAtom'; //파일경로 변경 완료
import { getMyProfileData } from '../../API/Profile/ProfileAPI';

import Hamburger from '../../Assets/icons/icon-post-list-on.svg';
import Bento from '../../Assets/icons/icon-post-album-on.svg';

export default function ProfileDetailPost() {
  const location = useLocation();
  const token = useRecoilValue(userToken);
  const lastPath = location.pathname.replace('/profile/', '');
  const navigate = useNavigate();

  const [myPostList, setMyPostList] = useState([]);
  const [view, setView] = useState('PostList');

  const postList = async (accountName) => {
    const path = lastPath === 'myInfo' ? accountName : lastPath;
    const res = await fetch(`https://api.mandarin.weniv.co.kr/post/${path}/userpost`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();
    console.log(json);
    setMyPostList(json.post);
  };

  useEffect(() => {
    const getData = async () => {
      const myProfileInfo = await getMyProfileData();
      const accountName = myProfileInfo.user['accountname']; 
      postList(accountName);
    };
    getData();
  }, []);

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <PostListBox>
      <div>
        <BtnIcons view={view}>
          <button onClick={() => setView('PostList')} className='btn-postlist'>
            <img src={Hamburger} alt='List view' />
          </button>
          <button onClick={() => setView('PostImgList')} className='btn-postimglist'>
            <img src={Bento} alt='Grid view' />
          </button>
        </BtnIcons>

        <Views>
          {view === 'PostList' ? (
            <HamView>
              {/* 햄버거 버튼 */}
              <ul>
                {myPostList.map((item) => {
                  // 여기서 myInfo 조건을 확인하여 다른 컴포넌트 렌더링
                  return lastPath === 'myInfo' ? (
                    <PostList key={item.id} post={item} />
                  ) : (
                    <HomePostCardList key={item.id} post={item} />
                  );
                })}
              </ul>
            </HamView>
          ) : (
            <BenView>
              {/* 벤토 버튼 */}
              <ul>
                {myPostList.map((item) => {
                  return item.image ? (
                    <li onClick={() => handlePostClick(item.id)} key={item.id}>
                      <img src={item.image} alt='Product' />
                    </li>
                  ) : null;
                })}
              </ul>
            </BenView>
          )}
        </Views>
      </div>
    </PostListBox>
  );
}
const PostListBox = styled.div`
  width: 100%;
  background-color: #fff;
`;

const BtnIcons = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'view',
})`
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  justify-content: end;
  padding: 9px 16px 9px;
  gap: 9px;
  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  .btn-postlist img {
    filter: ${(props) => (props.view === 'PostImgList' ? 'grayscale(100%)' : 'none')};
    opacity: ${(props) => (props.view === 'PostImgList' ? '0.3' : '1')};
  }

  .btn-postimglist img {
    filter: ${(props) => (props.view === 'PostList' ? 'grayscale(100%)' : 'none')};
    opacity: ${(props) => (props.view === 'PostList' ? '0.3' : '1')};
  }
`;

const Views = styled.div`
  padding: 16px;
  padding-bottom: 6rem;
  ul {
    li {
      padding-top: 0px;
    }
  }
  li {
    width: 100%;
  }
`;

const HamView = styled.div`
  article {
    margin-bottom: 20px;
  }
  article:first-child {
    margin: 0px;
  }
`;

const BenView = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 0;
    margin: 0;
    list-style: none;

    gap: 10px;
  }

  img {
    vertical-align: top;
    width: 100%;
    height: 110px;
    object-fit: cover;
  }
`;
