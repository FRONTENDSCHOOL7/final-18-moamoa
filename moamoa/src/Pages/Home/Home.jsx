import React, { useEffect, useState } from 'react';
import PostList from '../../Components/Post/PostList';
import styled from 'styled-components';
import HomeSearch from './HomeSearch';
import Header from '../../Components/Common/Header';
import Footer from '../../Components/Common/Footer';
import { Container } from '../../Components/Common/Container';
import { homePostList } from '../../API/Post/PostAPI';

export default function Home() {
  const [posts, setPosts] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getHomePostList = async () => {

      try{
        const postListData = await homePostList();
        setPosts(postListData.posts);
        setTimeout(() => {
          setIsLoading(true);
        }, 1500);
      } catch(error){
        console.error("페이지를 불러오는데 실패했습니다.");
      }
    };
    getHomePostList();
  }, []);
  return (
    <Container>
      <Header type='home' />
      <HomeWrap>
        { posts && Object.keys(posts).length !== 0 ? (
          <HomeContainer>
            <PostBg>
              {posts.map((item) => {
                return <PostList key={item.id} post={item} isLoading={isLoading}/>;
              })}
            </PostBg>
          </HomeContainer>
        ) : (
          <HomeContainer>
            <HomeSearch />
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
