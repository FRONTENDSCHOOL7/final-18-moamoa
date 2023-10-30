import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';
import userToken from '../../Recoil/userTokenAtom'; //파일 경로 변경 완료
// import followPostAtom from '../../Recoil/followPostAtom'; ////파일 경로 변경 완료
// import PostCard from '../../Components/Common/PostCard';
import styled from 'styled-components';

export default function PostDetailTest() {
  const token = useRecoilValue(userToken);
  // const [post, setPost] = useRecoilState(followPostAtom);
  // const [postIdList, setPostIdList] = useState([]);
  // const [pageIndex, setPageIndex] = useState(null);

  const location = useLocation();
  const postId = location.pathname.replace('/post/', '');
  useEffect(() => {
    const getPostInfo = async () => {
      const reqUrl = `https://api.mandarin.weniv.co.kr/post/${postId}`;

      try {
        const res = await fetch(reqUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        });

        if (res.status === 200) {
          const post = await res.json();
          console.log(post);
          // const postSet = posts.posts;
          // setPost(postSet);

          // const idList = post.map((item) => item.id);
          // setPostIdList(idList);
        } else {
          console.error('페이지를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('서버와 통신을 실패했습니다.', error);
      }
    };

    getPostInfo();
  }, [token]);

  // const params = useParams();
  // const index = params.post_id ? postIdList.indexOf(params.post_id) : -1;

  // useEffect(() => {
  //   if (index !== -1) {
  //     setPageIndex(index);
  //   }
  // }, [index]);

  return (
    <PostContainer>
      <PostCardContainer>
        {/* {console.log(pageIndex)}
        {post && pageIndex !== null && pageIndex !== -1 && <PostCard post={post[pageIndex]} />} */}
      </PostCardContainer>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff9e4;
`;

const PostCardContainer = styled.div`
  max-width: 39rem;
  width: 100%;
  height: 100vh;
  margin: auto;
  background-color: #ffffff;
  padding: 2rem 1.6rem;
`;
