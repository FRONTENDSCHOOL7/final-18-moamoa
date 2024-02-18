import { useNavigate } from 'react-router-dom';
import { authInstance } from '../InstanceAPI';

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
  } catch (error) {
    console.error('서버와 통신을 실패했습니다.', error);
  }
};

// 게시글 작성
export const uploadPost = async (addPostData) => {
  try {
    await authInstance.post('/post', addPostData);
  } catch (error) {
    alert('아이템 등록에 실패했습니다!');
  }
};

// 게시글 수정
export const editPost = async (postId, postData) => {
  try {
    await authInstance.put(`post/${postId}`, postData);
  } catch (error) {
    alert('아이템 수정에 실패했습니다!');
  }
};

// 게시글 삭제
export const deletePost = async (postId) => {
  try {
    await authInstance.delete(`/post/${postId}`);
  } catch (err) {
    const { status, data } = err.response;
    if (status === 422) {
      console.log(data);
    }
    if (status === 404) {
      const navigate = useNavigate();
      navigate('/*');
    }
    console.error('게시글 삭제를 실패했습니다.');
  }
};

// 게시글 신고
export const reportPost = async (postId) => {
  try {
    await authInstance.post(`/post/${postId}/report`);
  } catch (error) {
    console.error('게시물 신고를 실패했습니다.', error);
  }
};

// 좋아요
export const heartPost = async (postId) => {
  try {
    const response = await authInstance.post(`/post/${postId}/heart`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error('API 응답에 실패하였습니다.', error);
  }
};

// 좋아요 취소
export const unheartPost = async (postId) => {
  try {
    const response = await authInstance.delete(`/post/${postId}/unheart`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error('API 응답에 실패하였습니다.', error);
  }
};

// 홈 피드 게시글 목록
export const homePostList = async (limit,skip,userToken) => {
  try {
    const res = await authInstance.get(`/post/feed/?limit=${limit}&skip=${skip}`,{
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      const result = await res.data;
      return result;
    } else {
      console.error('페이지를 불러오는데 실패했습니다.');
    }
  } catch (error) {
    console.error('서버와 통신을 실패했습니다.', error);
  }
};

// 유저 게시글 목록
export const userPostList = async (accountName) => {
  try {
    const res = await authInstance.get(`/post/${accountName}/userpost`);
    if (res.status === 200) {
      const result = await res.data;
      return result;
    } else {
      console.error('페이지를 불러오는데 실패했습니다.');
    }
  } catch (error) {
    console.error('서버와 통신을 실패했습니다.', error);
  }
};
