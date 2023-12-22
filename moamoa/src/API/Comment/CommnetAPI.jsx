import { authInstance } from "../InstanceAPI";

// 댓글 작성
export const addComment = async (postId, AddData) => {
  try {
    const res = await authInstance.post(`post/${postId}/comments`, AddData);
    return res.data;
  } catch (error) {
    console.error('댓글 작성에 실패했습니다!');
  }
};

// 댓글 목록 가져오기
export const getCommentList = async (postId) => {
  try {
    const res = await authInstance.get(`/post/${postId}/comments`);
    return res.data;
  } catch (error) {
    console.error('댓글 목록을 불러오는데 실패했습니다!');
  }
};

// 댓글 삭제
export const deleteComment = async (postId, commentId) => {
  try{ 
    await authInstance.delete(`/post/${postId}/comments/${commentId}`) 
  }
  catch(err){
    console.error('댓글 삭제를 실패했습니다.')
  }
}

// 댓글 신고
export const reportComment = async (postId, commentId) => {
  try{ 
    await authInstance.post(`/post/${postId}/comments/${commentId}`) 
  }
  catch(err){
    console.error('댓글 신고를 실패했습니다.')
  }
}