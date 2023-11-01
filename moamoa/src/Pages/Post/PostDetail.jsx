import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userTokenAtom from '../../Recoil/userTokenAtom'; //파일 경로 변경 완료
import PostCardItem from '../../Components/Post/PostCardItem';
import styled from 'styled-components';
import Comment from '../../Components/Comment/Comment';
import Header from '../../Components/Common/HeaderBasic';

export default function ProductDetail() {
  const token = useRecoilValue(userTokenAtom);
  const [post, setPost] = useState(null);
  const params = useParams();

  useEffect(() => {
    const getPostInfo = async () => {
      const reqUrl = `https://api.mandarin.weniv.co.kr/post/${params.post_id}`;

      try {
        const res = await fetch(reqUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        });

        if (res.status === 200) {
          const result = await res.json();
          console.log(result)
          setPost(result);
        } else {
          console.error('페이지를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('서버와 통신을 실패했습니다.', error);
      }
    };

    getPostInfo();
  }, [token]);
  return (
    <>
      { post && <PostContainer>
        <Header />
        <BgCont>
          <PostCardContainer>
            <PostCardItem post={post} />
          </PostCardContainer>
          <Comment postId={params.post_id} />
        </BgCont>
      </PostContainer>}
    </>
  );
}

const PostContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff9e4;
`;
const BgCont = styled.div`
  box-sizing: border-box;
  max-width: 39rem;
  width: 100%;
  height: 100%;
  margin: auto;
  background-color: #ffffff;
`;
const PostCardContainer = styled.div`
  padding: 0 1.6rem 1.5rem;
`;
