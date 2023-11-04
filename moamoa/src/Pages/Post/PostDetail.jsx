import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userTokenAtom from '../../Recoil/userTokenAtom'; //파일 경로 변경 완료
import PostCardItem from '../../Components/Post/PostCardItem';
import styled from 'styled-components';
import Comment from '../../Components/Comment/Comment';
// import Header from '../../Components/Common/HeaderBasic';
import HeaderKebab from '../../Components/Common/HeaderKebab';

export default function ProductDetail() {
  const token = useRecoilValue(userTokenAtom);
  const [post, setPost] = useState(null);
  const {post_id} = useParams();

  useEffect(() => {
    const getPostInfo = async () => {
      const reqUrl = `https://api.mandarin.weniv.co.kr/post/${post_id}`;

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
          setPost(result.post);
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
      {post && (
        <PostContainer>
          <HeaderKebab />
            <PostCardContainer>
              <PostCardItem post={post} />
            </PostCardContainer>
            <Comment postId={post_id} />
        </PostContainer>
      )}
    </>
  );
}

const PostContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 39rem;
  margin: auto;
  background-color: #ffffff;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const PostCardContainer = styled.div`
  padding: 0 1.6rem 1.5rem;
  padding-top: 64px;
  li {
    article {
      margin-top: 0;
    }
  }
`;
