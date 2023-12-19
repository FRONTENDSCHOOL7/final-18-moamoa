import React, { useEffect, useState } from 'react';
import PostList from '../../Components/Post/PostList';
import styled from 'styled-components';
import HomeSearch from './HomeSearch';
import Header from '../../Components/Common/Header';
import Footer from '../../Components/Common/Footer';
import { Container } from '../../Components/Common/Container';
import { homePostList } from '../../API/Post/PostAPI';
import { useRecoilState } from 'recoil';
import postsAtom from '../../Recoil/postsAtom';
import { useInView } from 'react-intersection-observer';

export default function Home() {
  const limit = 5;
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useRecoilState(postsAtom);
  const [ref, inView] = useInView();
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const getHomePostList = async () => {
      try{
        const postListData = await homePostList(limit, skip);
        console.log(postListData.posts)
        setPostData(postListData.posts)
        // setPostData((prevData) => [...prevData, ...postListData.posts]);
        setTimeout(() => {
          setIsLoading(true);
        }, 1200);
      } catch(error){
        console.error("페이지를 불러오는데 실패했습니다.");
      }
    };
    getHomePostList();
  }, []);

  useEffect(() => {
    if (inView && !isLoading) {
      setSkip((prevSkip) => prevSkip + limit);
    }
  }, [inView, isLoading]);



  return (
    <Container>
      <Header type='home' />
      <HomeWrap>
        { postData && Object.keys(postData).length !== 0 ? (
          <HomeContainer>
            <PostBg>
              {postData.map((item) => {
                return <PostList key={item.id} post={item} isLoading={isLoading}/>;
              })}
              {/* {postData.map((item, index) => {
                const isLastPost = index === postData.length - 1;
                return (
                  <PostList
                    key={item.id}
                    post={item}
                    isLoading={isLoading}
                    ref={isLastPost ? ref : null}
                  />
                );
              })} */}

            <div ref={ref} />
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