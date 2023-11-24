import axios from 'axios';

const ProductEditAPI = (productId, productInputs, eventType, eventPeriod, token) => {
  const reqURL = 'https://api.mandarin.weniv.co.kr/product';

  const handleProductEdit = async () => {
    try {
      await axios.put(
        `${reqURL}/${productId}`,
        {
          product: {
            ...productInputs.product,
            itemName:
              eventType === 'festival'
                ? `[f]${productInputs.product.itemName}`
                : `[e]${productInputs.product.itemName}`,
            price: eventPeriod,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
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
