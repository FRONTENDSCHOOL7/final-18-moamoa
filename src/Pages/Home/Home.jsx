import React, { useEffect, useState } from 'react';
import PostList from '../../Components/Post/PostList';
import HomeSearch from './HomeSearch';
import Header from '../../Components/Common/Header/Header';
import Footer from '../../Components/Common/Footer';
import { Container } from '../../Components/Common/Container';
import { homePostList } from '../../API/Post/PostAPI';
import { useRecoilState } from 'recoil';
import postsAtom from '../../Recoil/postsAtom';
import { useInView } from 'react-intersection-observer';
import { HomeWrap, HomeContainer, PostBg } from './HomeStyle';
import RecommendPlace from '../../Components/Common/RecommendPlace';
import Myfollowings from '../../Components/Common/Myfollowings';

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
          <>
            <HomeContainer>
              <PostBg>
                <ul>
                  {postData.map((item) => {
                    return <PostList key={item.id} post={item} isLoading={isLoading}/>;
                  })}
                </ul>
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
            <div>
              <RecommendPlace/>
              <Myfollowings/>
            </div>
          </>
        ) : (
          <>
            <HomeContainer>
              <HomeSearch />
            </HomeContainer>
            <div>
              <RecommendPlace/>
              <Myfollowings/>
            </div>
          </>
        )}
      </HomeWrap>
      <Footer />
    </Container>
  );
}