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
  const limit = 10;
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useRecoilState(postsAtom);
  const [ref, inView] = useInView();
  const [skip, setSkip] = useState(0);



  useEffect(()=>{
    const getPostData = async () => {
      const res = await homePostList(limit, skip);
        const postList = res.posts;
        if(postList.length>0){
          console.log(postList);
          console.log(postData,...postList)
          console.log([...postData,...postList])
          console.log([...postData].concat(postList))
          setPostData((prev)=>[prev,...postList]);
        }
      // setPostData(res.posts);
      // setTimeout(() => {
        setIsLoading(true);
    //   }, 1200);
    };
    getPostData();
  },[skip])

  useEffect(()=>{
    if(inView && isLoading){
      setSkip((prev) => prev + limit);
    }
  },[inView, isLoading]);
  console.log(postData);
  return (
    <Container>
      <Header type='home' />
      <HomeWrap>
        { postData && Object.keys(postData).length !== 0 ? (
          <HomeContainer>
            <PostBg>
              {postData.map((item) => (
                <PostList key={item.id} post={item} isLoading={isLoading}/>
              ))}
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
