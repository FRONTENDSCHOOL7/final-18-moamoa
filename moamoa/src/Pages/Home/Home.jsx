import React, { useEffect } from 'react';
import userToken from '../../Recoil/userTokenAtom'; //파일 경로 변경 완료
import { useRecoilValue, useRecoilState } from 'recoil';
import PostCard from '../../Components/Common/PostCard';
import PostState from '../../Recoil/followPostAtom'; //파일 경로 변경 완료
import styled from 'styled-components';
import HomeFeed from './HomeFeed';

export default function Home() {
  const [post, setPost] = useRecoilState(PostState);
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
          const posts = await res.json();
          const postSet = posts.posts;
          setPost(postSet);
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
      {console.log(post)}
      {post.length !== 0 ? (
        <HomeContainer>
          <PostList>
            <ul>
              {post.map((item) => {
                return <PostCard key={item.id} post={item} />;
              })}
            </ul>
          </PostList>
        </HomeContainer>
      ) : (
        <HomeContainer>
          <PostList>
            <HomeFeed/>
          </PostList>
        </HomeContainer>
      )}
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
  padding: 2rem 1.6rem 15rem;
`;