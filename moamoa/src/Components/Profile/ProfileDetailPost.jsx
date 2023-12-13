/*
  설명: 프로필 상세 페이지 내 게시물 목록(기본형/앨범형)
  작성자: 이해지
  최초 작성 날짜: 2023.10.29
  마지막 수정 날까: 2023.11.02

  수정자: 장수연 (2023.11.29)
*/

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import PostList from '../Post/PostList';
import { userPostList } from '../../API/Post/PostAPI';
import accountNameAtom from '../../Recoil/accountNameAtom';

import Hamburger from '../../Assets/icons/icon-post-list-on.svg';
import Bento from '../../Assets/icons/icon-post-album-on.svg';
import { useRecoilValue } from 'recoil';

export default function ProfileDetailPost() {
  const location = useLocation();
  const lastPath = location.pathname.replace('/profile/', '');
  const navigate = useNavigate();

  const [myPostList, setMyPostList] = useState([]);
  const [view, setView] = useState('PostList');
  const [isLoading, setIsLoading] = useState(false);

  const loginAccountName = useRecoilValue(accountNameAtom);
  const path = lastPath === 'myInfo' ? loginAccountName : lastPath;

  const getUserPostList = userPostList(path);

  useEffect(() => {
    const postList = async () => {
      const res = await getUserPostList;
      setMyPostList(res.post);
      setTimeout(() => {
        setIsLoading(true);
      }, 1500);
    };
    postList();
  }, [path]);

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
                  return <PostList key={item.id} post={item} isLoading={isLoading} />;
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
  background-color: #fff;
  padding: 0;
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
  padding-bottom: 4.6rem;
`;

const HamView = styled.div`
  ul {
    margin-top: 0;
  }

  article {
    margin: 1.6rem 0;
  }

  div {
    button {
      width: 1.8rem;
    }
    div {
      img:first-child {
        width: 4.2rem;
      }
    }
    img {
      width: 100%;
    }
  }
`;

const BenView = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 1.6rem;
  padding-bottom: 1.6rem;

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
