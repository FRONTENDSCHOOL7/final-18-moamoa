import React, { useEffect, useState } from 'react';
import HomePostCardList from '../../Components/Home/HomePostCardList';
import styled from 'styled-components';
import HomeFeed from './HomeFeed';
import Header from '../../Components/Common/HeaderBasic';
import Footer from '../../Components/Common/Footer';
import { Container } from '../../Components/Common/Container';
import { homePostList } from '../../API/Post/PostAPI';

export default function Home() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const getHomePostList = async () => {
      const postListData = await homePostList();
      setPosts(postListData.posts);
    };
    getHomePostList();
  }, []);

  return (
    <Container>
      <Header />
      <HomeWrap>
        {posts ? (
          <HomeContainer>
            <PostBg>
              <PostList>
                {posts.map((item) => {
                  return <HomePostCardList key={item.id} post={item} />;
                })}
              </PostList>
            </PostBg>
          </HomeContainer>
        ) : (
          <HomeContainer>
            <HomeFeed />
          </HomeContainer>
        )}
      </HomeWrap>
      <Footer />
    </Container>
  );
}

const HomeWrap = styled.div`
  background-color: #fff;
  margin-top: 35px;
  margin-bottom: 60px;
  flex: 1;
  // height: 100%;
`;
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff9e4;
`;
const PostBg = styled.div`
  max-width: 39rem;
  height: 100%;
  margin: auto;
  background-color: #fff;
`;
const PostList = styled.ul`
  box-sizing: border-box;
  background-color: #ffffff;
  margin: 15px 1.6rem 8rem;
`;
