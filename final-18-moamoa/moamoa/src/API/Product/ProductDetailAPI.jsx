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
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 422 || status === 404) {
          console.log(data.message);
        }
      }
    }
  }, [productId, token]);

  return getProductDetail;
};

export default ProductDetailAPI;
