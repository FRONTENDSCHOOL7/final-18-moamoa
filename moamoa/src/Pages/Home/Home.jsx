import React, { useEffect } from 'react';
import userToken from '../../Recoil/userTokenAtom'; //파일 경로 변경 완료
import { useRecoilValue, useRecoilState } from 'recoil';
import HomePostCardList from '../../Components/Home/HomePostCardList';
import followPostAtom from '../../Recoil/followPostAtom'; //파일 경로 변경 완료
import styled from 'styled-components';
import HomeFeed from './HomeFeed';
import Header from '../../Components/Common/HeaderBasic';
import Footer from '../../Components/Common/Footer';

export default function Home() {
  const [posts, setPosts] = useRecoilState(followPostAtom);
  const token = useRecoilValue(userToken);

  useEffect(() => {
    const getPostInfo = async () => {
      const reqUrl = `https://api.mandarin.weniv.co.kr/post/feed`;

      try {
        const res = await fetch(reqUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        });

        if (res.status === 200) {
          const result = await res.json();
          setPosts(result.posts);
        } else {
          console.error('페이지를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('서버와 통신을 실패했습니다.', error);
      }
    };

    getPostInfo();
  }, []);

  return (
    <>
      <Header />
      {posts.length !== 0 ? (
        <HomeContainer>
          <PostList>
            <ul>
              {posts.map((item) => {
                return <HomePostCardList key={item.id} post={item} />;
              })}
            </ul>
          </PostList>
        </HomeContainer>
      ) : (
        <HomeContainer>
          <PostList>
            <HomeFeed />
          </PostList>
        </HomeContainer>
      )}
      <Footer />
    </>
  );
}

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff9e4;
`;
const PostList = styled.div`
  box-sizing: border-box;
  max-width: 39rem;
  width: 39rem;
  height: 100%;
  margin: auto;
  background-color: #ffffff;
  padding: 15px 1.6rem 8rem;
`;
