import { useRecoilValue } from 'recoil';
import { useCallback } from 'react';
import userTokenAtom from '../../Recoil/userTokenAtom';

const ProductDetailAPI = (productId) => {
  const reqURL = 'https://api.mandarin.weniv.co.kr';
  const token = useRecoilValue(userTokenAtom);

  const getProductDetail = useCallback(async () => {
    try {
      const response = await fetch(reqURL + `/product/detail/${productId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();

      return data;
    } catch (err) {
      const { status, data } = err.response;
      if (status === 422) {
        console.log(data);
      }
      if (status === 404) {
        //404 이미지 출력
      }

      if (status === 500) {
        console.log('Server error');
      }
    }
  }, [productId, token]);

  return getProductDetail;
};

export default ProductDetailAPI;
