import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useInView } from 'react-intersection-observer';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { homePostList } from '../../API/Post/PostAPI';
import PostList from '../../Components/Post/PostList';
import styled from 'styled-components';
import HomeSearch from './HomeSearch';
import Header from '../../Components/Common/Header';
import Footer from '../../Components/Common/Footer';
import { Container } from '../../Components/Common/Container';
import postsAtom from '../../Recoil/postsAtom';

export default function Home() {
  const limit = 5;
  const [isLoading, setIsLoading] = useState(true);
  const [ref, inView] = useInView();
  const [skip, setSkip] = useState(0);
  const setPostData = useSetRecoilState(postsAtom);
  const postData = useRecoilValue(postsAtom);

  // const getHomePostList = homePostList(limit, skip);

  useEffect(()=>{
    const getPostData = async () => {
      try {
        const res = await homePostList(limit, skip);
        const postList = res.posts;
        if(postList.length>0){
          console.log(postList);
          console.log(postData,...postList)
          setPostData((prev)=>[prev,...postList]);
        }
        // setTimeout(() => {
        setIsLoading(false);
        //   }, 1200);
      } catch (error) {
        console.log(error);
      }
    }
    getPostData();
  },[skip])


  useEffect(()=>{
    if(inView && !isLoading){
    console.log(postData);
      setSkip((prev) => (prev + limit));
    }
  },[inView, isLoading]);

    console.log(postData.slice(1));
  return (
    <Container>
      <Header type='home' />
      <HomeWrap>
        { postData && postData.length !== 0 ? (
          <HomeContainer>
            <PostBg>
              {(postData.slice(1)).map((item) => {
                if(item !== null){
                  return (<PostList key={uuidv4()} post={item} isLoading={!isLoading}/>)
                } 
              })}
            </PostBg>
          </HomeContainer>
        ) : (
          <HomeContainer>
            <HomeSearch />
          </HomeContainer>
        )}
      <div ref={ref} />
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
