import axios from 'axios';

const ProductUploadAPI = (inputValue) => {
  const reqURL = 'https://api.mandarin.weniv.co.kr/product';
  const { token, imgSrc, productType, productName, progressPeriod, description } = inputValue;

  const uploadProduct = async () => {
    try {
      await axios.post(
        reqURL,
        {
          product: {
            itemName: productType === 'festival' ? `[f]${productName}` : `[e]${productName}`,
            price: progressPeriod,
            link: description,
            itemImage: imgSrc,
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

  return uploadProduct;
};

export default ProductUploadAPI;
