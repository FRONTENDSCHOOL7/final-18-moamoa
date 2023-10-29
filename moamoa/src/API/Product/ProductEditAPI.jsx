import { useRecoilValue } from 'recoil';
import userTokenAtom from '../../Recoil/userTokenAtom';

const ProductEditAPI = (productId, productInputs) => {
  const reqURL = 'https://api.mandarin.weniv.co.kr/product';
  const token = useRecoilValue(userTokenAtom);

  const handleProductEdit = async () => {
    try {
      await fetch(`${reqURL}/${productId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          product: {
            ...productInputs.product,
          },
        }),
      });
    } catch (error) {
      console.error('API 응답에 실패하였습니다.', error);
    }
  };

  return { handleProductEdit };
};

export default ProductEditAPI;
