import React, { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PostList from '../../Components/Post/PostList';
import styled from 'styled-components';
import HomeSearch from './HomeSearch';
import Header from '../../Components/Common/Header';
import Footer from '../../Components/Common/Footer';
import { Container } from '../../Components/Common/Container';
import { homePostList } from '../../API/Post/PostAPI';
import { useRecoilState } from 'recoil';
import postsAtom from '../../Recoil/postsAtom';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useRecoilState(postsAtom);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(1);
  const preventRef = useRef(true);
  const obsRef = useRef(null);

  useEffect(()=>{
    getPostData();
    const observer = new IntersectionObserver(obsHandler,{threshold:0.5});
    if(obsRef.current) observer.observe(obsRef.current);
    return()=>{observer.disconnect();}
  },[])

    useEffect(()=> {
        getPostData();
    }, [page])

    const obsHandler = ((entries) => {
        const target = entries[0];
        if(target.isIntersecting && preventRef.current){ 
            preventRef.current = false;
            setPage(prev => prev+1 );
        }
    })

  const getPostData = useCallback(async()=>{

        setLoad(true); //로딩 시작
      const res = await homePostList();
        const postList = res.posts;
        if(postList.length>0){
          console.log(postList);
          setPostData(prev=> [...prev, ...postList]);
          preventRef.current = true;
        }else{
          console.log(res); //에러
        }

        setLoad(false); //로딩 종료
        setIsLoading(true);
  },[])

  console.log(postData);
  return (
    <Container>
      <Header type='home' />
      <HomeWrap>
        { postData && Object.keys(postData).length !== 0 ? (
          <HomeContainer>
            <PostBg>
              {postData.map((item) => (
                <PostList key={uuidv4()} post={item} isLoading={isLoading}/>
              ))}
            </PostBg>
            {load && <div>로딩중</div>}
          </HomeContainer>
        ) : (
          <HomeContainer>
            <HomeSearch />
          </HomeContainer>
        )}
      <div ref={obsRef}/>
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
