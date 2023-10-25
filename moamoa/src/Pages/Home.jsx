import React, { useEffect, useState } from 'react';
import userToken from '../Recoil/UserToken';
import { useRecoilValue } from 'recoil';
import PostCard from '../Components/Common/PostCard';
// import PostCard from '../Components/Common/PostCard';

export default function Home() {
  const [post, setPost] = useState([]);
  const token = useRecoilValue(userToken);

  useEffect(() => {
    const getPostInfo = async () => {
      const reqUrl = `https://api.mandarin.weniv.co.kr/post/feed`;

      try {
        const res = await fetch(reqUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
          }
        });

        if (res.status === 200) {
          const posts = await res.json();
          setPost(posts.posts);        
          console.log(posts);        
          console.log(posts.posts);        

        } else {
          console.error("페이지를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error("서버와 통신을 실패했습니다.", error);
      }
    };

    getPostInfo();
  }, []);




  return (

    <>
      {post && (
        
        <ul>
          {post.map((item)=>{
            return <PostCard key={item.id} post={item}/>
          })}
        </ul>
      )};  
    </>
  )
}
