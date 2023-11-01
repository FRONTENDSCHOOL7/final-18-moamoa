import { useRecoilValue } from 'recoil';
import userTokenAtom from '../../Recoil/userTokenAtom';

const ProductDeleteAPI = (params) => {
  const reqURL = 'https://api.mandarin.weniv.co.kr';
  const token = useRecoilValue(userTokenAtom);
  const productId = params.product_id;

  const handleProductDelete = async () => {
    try {
      await fetch(reqURL + `/product/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
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
  };

  return handleProductDelete;
};

export default ProductDeleteAPI;
