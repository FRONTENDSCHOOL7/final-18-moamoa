import { authInstance } from "../InstanceAPI";

export default function PostDetailAPI(post_id) {
  const getPostInfo = async () => {
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
  return getPostInfo;
}
