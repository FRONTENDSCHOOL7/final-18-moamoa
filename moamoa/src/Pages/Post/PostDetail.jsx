import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import userToken from '../../Recoil/UserToken';
import PostState from '../../Recoil/PostState';
import PostCard from '../../Components/Common/PostCard';

export default function ProductDetail() {
  
  const token = useRecoilValue(userToken);
  const [post, setPost] = useRecoilState(PostState);
  const [postIdList,setPostIdList] = useState([]);
  const [pageIndex, setPageIndex] = useState(null);

  useEffect(() => {
    const getPostInfo = async () => {
      const reqUrl = `https://api.mandarin.weniv.co.kr/post/feed`;

      try {
        const res = await fetch(reqUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        });

        if (res.status === 200) {
          const posts = await res.json();
          const postSet = posts.posts;
          setPost(postSet);
          console.log(postSet);
          
          const idList = post.map((item) => item.id);
          console.log(idList);
          setPostIdList(idList);
        } else {
          console.error('페이지를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('서버와 통신을 실패했습니다.', error);
      }
    };

    getPostInfo();

    

    
  }, [token,setPost]);

  const params = useParams();
  console.log(params);
  console.log(params.post_id);
  const index = params.post_id ? postIdList.indexOf(params.post_id) : -1;
  console.log(postIdList.indexOf(params.post_id))
  console.log(index);

  useEffect(() => {
    if (index !== -1) {
      setPageIndex(index);
      console.log(pageIndex)
    }
  }, [index]);

  // post와 pageIndex 값이 변경될 때만 작업 수행
  useEffect(() => {
    if (post && pageIndex !== null && pageIndex !== -1) {
      console.log(pageIndex);
    }
  }, [post, pageIndex]);

  return (
    <>
    {console.log(pageIndex)}
    {post && pageIndex !== null && pageIndex !== -1 && (
      <PostCard post={post[pageIndex]}/>
      )}
    </>
  );
}
