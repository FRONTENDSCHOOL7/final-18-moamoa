import axios from 'axios';

const ProductEditAPI = (token, productId, productInputs, productType, progressPeriod) => {
  const reqURL = 'https://api.mandarin.weniv.co.kr/product';

  const handleProductEdit = async () => {
    try {
      await axios.put(
        `${reqURL}/${productId}`,
        {
          product: {
            ...productInputs.product,
            itemName:
              productType === 'festival'
                ? `[f]${productInputs.product.itemName}`
                : `[e]${productInputs.product.itemName}`,
            price: progressPeriod,
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
