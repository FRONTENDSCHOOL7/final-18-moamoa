import axios from 'axios';

const ProductUploadAPI = (inputValue) => {
  const reqURL = 'https://api.mandarin.weniv.co.kr/product';
  const { token, eventName, eventPeriod, eventDetail, imgSrc, eventType } = inputValue;

  const uploadProduct = async () => {
    try {
      await axios.post(
        reqURL,
        {
          product: {
            itemName: eventType === 'festival' ? `[f]${eventName}` : `[e]${eventName}`,
            price: eventPeriod,
            link: eventDetail,
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
