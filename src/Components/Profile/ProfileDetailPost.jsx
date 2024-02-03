/*
  설명: 프로필 상세 페이지 내 게시물 목록(기본형/앨범형)
  작성자: 이해지
  최초 작성 날짜: 2023.10.29
  마지막 수정 날까: 2024.02.03

  수정자: 장수연 (2023.11.29)
*/

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import PostList from '../Post/PostList';
import { userPostList } from '../../API/Post/PostAPI';

import Hamburger from '../../Assets/icons/icon-post-list-on.svg';
import Bento from '../../Assets/icons/icon-post-album-on.svg';

import { PostListBox, BtnIcons, HamView, BenView } from './ProfileStyle';

export default function ProfileDetailPost({ accountName }) {
  const navigate = useNavigate();

  const [myPostList, setMyPostList] = useState([]);
  const [view, setView] = useState('PostList');
  const [isLoading, setIsLoading] = useState(false);

  const userAccountname = accountName;

  useEffect(() => {
    const postList = async () => {
      try {
        const res = await userPostList(userAccountname);
        setMyPostList(res.post);
        setTimeout(() => {
          setIsLoading(true);
        }, 1500);
      } catch (error) {
        console.error('게시글을 가져올 수 없습니다 :', error);
      }
    };

    if (userAccountname) {
      postList();
    }
  }, [userAccountname]);

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <PostListBox>
      <section>
        <BtnIcons view={view}>
          <button onClick={() => setView('PostList')} className='btn-postlist'>
            <img src={Hamburger} alt='List view' />
          </button>
          <button onClick={() => setView('PostImgList')} className='btn-postimglist'>
            <img src={Bento} alt='Grid view' />
          </button>
        </BtnIcons>

        {myPostList.length > 0 ? (
          view === 'PostList' ? (
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
          )
        ) : (
          <p className='emptyItem'>등록된 게시물이 없습니다!</p>
        )}
      </section>
    </PostListBox>
  );
}

ProfileDetailPost.propTypes = {
  accountName: PropTypes.string.isRequired,
};
