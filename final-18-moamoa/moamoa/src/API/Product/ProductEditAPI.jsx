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
      if (error.response) {
        const { status, data } = error.response;
        if (status === 422 || status === 404) {
          console.log(data.message);
        }
      }
    }
  };

  return { handleProductEdit };
};

export default ProductEditAPI;
