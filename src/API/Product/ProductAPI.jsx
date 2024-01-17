import { authInstance } from '../InstanceAPI';

// 상품 상세
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
};

// 상품 리스트
export const productList = async (accountName) => {
  try {
    const res = await authInstance.get(`/product/${accountName}`);
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

// 상품 삭제
export const deleteProduct = async (productId) => {
  try {
    await authInstance.delete(`/product/${productId}`);
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      console.log('게시물 삭제에 실패했습니다.');
      if (status === 422 || status === 404) {
        console.log(data.message);
      }
    }
  }
};

// 상품 추가
export const uploadProduct = async (productData) => {
  try {
    await authInstance.post(`/product`, productData);
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 422 || status === 404) {
        console.log(data.message);
      }
    }
  }
};

// 상품 수정
export const editProduct = async (productId, productData) => {
  try {
    await authInstance.put(`/product/${productId}`, productData);
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 422 || status === 404) {
        console.log(data.message);
      }
    }
  }
};
// 축제&체험 리스트
export async function ProductListAPI() {
  const response = await authInstance.get(`product/?limit=400`);
  return response.data.product;
}
