import { authInstance } from "../InstanceAPI";

export const getProductDetail = (productId, getProductData) => {
  const getProductInfo = async () => {
    try {
      const res = await authInstance.get(`/product/detail/${productId}`);
      if (res.status === 200) {
        const data = await res.data;
        await getProductData({ ...data });
        return data;
      } else {
        console.error('페이지를 불러오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('서버와 통신을 실패했습니다.', error);
    }
  };
  return getProductInfo();
}


export const deleteProduct = async (productId) => {
    try {
      await authInstance.delete(`/product/${productId}`);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        console.log('게시물 삭제에 실패했습니다.')
        if (status === 422 || status === 404) {
          console.log(data.message);
        }
      }
    }
  };