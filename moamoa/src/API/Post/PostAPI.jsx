import { useNavigate } from "react-router-dom";
import { authInstance } from "../InstanceAPI";

// 게시글 상세 
export const getPostDetail = async (post_id) => {
    try {
      const res = await authInstance.get(`/post/${post_id}`);
      
      if (res.status === 200) {
        const responseData = res.data;
        return responseData;
      } else {
      console.error('페이지를 불러오는데 실패했습니다.');
      }
    } 
    catch (error) {
      console.error('서버와 통신을 실패했습니다.', error);
    }
  };


// 게시글 작성

// 게시글 수정

// 게시글 삭제
export const deletePost = async (postId) => {
      try{ 
        await authInstance.delete(`https://api.mandarin.weniv.co.kr/post/${postId}`) 
      }
      catch(err){
        const { status, data } = err.response;
      if (status === 422) {
        console.log(data);
      }
      if (status === 404) {
        const navigate = useNavigate()
        navigate('/*')
      }
        console.error('게시글 삭제를 실패했습니다.')
      }
    }



// 게시글 신고

// 좋아요

// 좋아요 취소