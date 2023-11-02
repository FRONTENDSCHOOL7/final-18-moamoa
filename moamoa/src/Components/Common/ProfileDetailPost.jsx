/*
  설명: 프로필 상세 페이지 내 게시물 목록(기본형/앨범형)
  작성자: 이해지
  최초 작성 날짜: 2023.10.29
  마지막 수정 날까: 2023.11.02
*/

import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import PostCardList from '../Post/PostCardList';
import userToken from '../../Recoil/userTokenAtom'; //파일경로 변경 완료

import Hamburger from '../../Assets/icons/icon-post-list-on.svg';
import Bento from '../../Assets/icons/icon-post-album-on.svg';

export default function ProfileDetailPost() {
  const location = useLocation();
  const token = useRecoilValue(userToken);
  const userAccountname = location.pathname.replace('/profile/', '');
  const navigate = useNavigate();

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
    console.log(json);
    setMyPostList(json.post);
  };

  useEffect(() => {
    const fetchData = async () => {
      const accountName = await getMyAcnt();
      postList(accountName);
    };

    fetchData();
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
          <HamView>
            {/* 햄버거 버튼 */}
            {view === 'PostList' && (
              <ul>
                {myPostList.map((item) => {
                  return <PostCardList key={item.id} post={item} />;
                })}
              </ul>
            )}
          </HamView>
          <BenView>
            {/* 벤토 버튼 */}
            {view === 'PostImgList' && (
              <ul>
                {myPostList.map((item) => {
                  // 조건부 렌더링을 사용하여 이미지가 없는 경우에는 li를 생성하지 않음
                  return item.image ? (
                    <li onClick={() => handlePostClick(item.id)} key={item.id}>
                      <img src={item.image} alt='Product' />
                    </li>
                  ) : null;
                })}
              </ul>
            )}
          </BenView>
        </Views>
      </div>
    </PostListBox>
  );
}
const PostListBox = styled.div`
  width: 100%;
  background-color: #fff;
`;

const BtnIcons = styled.div`
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
