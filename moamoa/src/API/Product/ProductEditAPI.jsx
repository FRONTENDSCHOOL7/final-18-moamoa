import { useRecoilValue } from 'recoil';
import userTokenAtom from '../../Recoil/userTokenAtom';

const ProductEditAPI = (productParam, productInputs, eventType, eventPeriod) => {
  const reqURL = 'https://api.mandarin.weniv.co.kr/product';
  const token = useRecoilValue(userTokenAtom);

  const handleProductEdit = async () => {
    try {
      await fetch(`${reqURL}/${productParam}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          product: {
            ...productInputs.product,
            itemName:
              eventType === 'festival'
                ? `[f]${productInputs.product.itemName}`
                : `[e]${productInputs.product.itemName}`,
            price: eventPeriod,
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
