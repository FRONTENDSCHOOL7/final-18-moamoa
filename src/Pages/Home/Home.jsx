import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useInView } from 'react-intersection-observer';
import PostList from '../../Components/Post/PostList';
import HomeSearch from './HomeSearch';
import Header from '../../Components/Header/Header';
import NavBar from '../../Components/Common/NavBar';
import { Container } from '../../Components/Common/Container';
import { homePostList } from '../../API/Post/PostAPI';
import { HomeWrap, HomeContainer, PostBg } from './HomeStyle';
import RecommendPlace from '../../Components/Common/RecommendPlace';
import Myfollowings from '../../Components/Follow/Myfollowings';
import { useRecoilValue } from 'recoil';
import userTokenAtom from '../../Recoil/userTokenAtom';

export default function Home() {
  const limit = 5;
  const [ref, inView] = useInView();
  const [isLoading, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [postData, setPostData] = useState([]);
  const userToken = useRecoilValue(userTokenAtom);

    const getHomePostList = useCallback(async () => {
      try{
        const postListData = await homePostList(limit, skip,userToken);
        if(Object.keys(postListData).length !== 0){
          setPostData((prevData) => [...prevData, ...postListData.posts]);
        }
      } catch(error){
        console.error("페이지를 불러오는데 실패했습니다.");
      }
    },[skip]);

    useEffect(()=>{
      getHomePostList()
      setTimeout(() => {
        setIsLoading(true);
      }, 1000);
    },[getHomePostList, skip, userToken])

    // 무한스크롤
    useEffect(() => {
      if (inView && isLoading) {
        setSkip((prevSkip) => prevSkip + limit);
      }
    }, [inView, isLoading]);

    const posts = useMemo(() => {
      return postData.map((item) => {
        return <PostList key={uuidv4()} post={item} isLoading={isLoading}/>;
      });
    }, [postData, isLoading]);

  return (
    <Container>
      <Header type='home' />
      <NavBar />
      <HomeWrap>
        { postData && postData.length !== 0 ? (
          <>
            <HomeContainer>
              <PostBg>
                <ul>
                  {posts}
                </ul>
                <div ref={ref} />
              </PostBg>
            </HomeContainer>
            <div>
              <RecommendPlace/>
              <Myfollowings/>
            </div>
          </>
        ) : 
          <>
            <HomeContainer>
              <HomeSearch />
            </HomeContainer>
            <div>
              <RecommendPlace/>
              <Myfollowings/>
            </div>
          </>
        }
      </HomeWrap>
    </Container>
  );
}