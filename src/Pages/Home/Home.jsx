import React, { useEffect, useState } from 'react';
import PostList from '../../Components/Post/PostList';
import HomeSearch from './HomeSearch';
import Header from '../../Components/Common/Header/Header';
import NavBar from '../../Components/Common/NavBar';
import { Container } from '../../Components/Common/Container';
import { homePostList } from '../../API/Post/PostAPI';
import { useRecoilState } from 'recoil';
import postsAtom from '../../Recoil/postsAtom';
import { HomeWrap, HomeContainer, PostBg } from './HomeStyle';
import RecommendPlace from '../../Components/Common/RecommendPlace';
import Myfollowings from '../../Components/Common/Myfollowings';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useRecoilState(postsAtom);

  useEffect(() => {
    const getHomePostList = async () => {
      try{
        const postListData = await homePostList();
        setPostData(postListData.posts);
        setTimeout(() => {
          setIsLoading(true);
        }, 1200);
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
        { postData && Object.keys(postData).length !== 0 ? (
          <>
            <HomeContainer>
              <PostBg>
                <ul>
                  {postData.map((item) => {
                    return <PostList key={item.id} post={item} isLoading={isLoading}/>;
                  })}
                </ul>
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
      <NavBar />
    </Container>
  );
}