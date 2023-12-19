import { authInstance } from "../InstanceAPI";

// 댓글 삭제
export const deleteComment = async (postId, commentId) => {
  try{ 
    await authInstance.delete(`/post/${postId}/comments/${commentId}`) 
  }
  catch(err){
    console.error('댓글 삭제를 실패했습니다.')
  }
}