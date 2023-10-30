import { useRecoilValue } from 'recoil';
import axios from 'axios';
import userTokenAtom from '../../Recoil/userTokenAtom';

const ProductUploadAPI = (inputValue) => {
  const reqURL = 'https://api.mandarin.weniv.co.kr/product';
  const token = useRecoilValue(userTokenAtom);
  const { eventName, eventPeriod, eventDetail, imgSrc, eventType } = inputValue;

  const uploadProduct = async () => {
    try {
      await axios({
        method: 'post',
        url: reqURL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          product: {
            itemName: eventType === 'festival' ? `[f]${eventName}` : `[e]${eventName}`,
            price: eventPeriod,
            link: eventDetail,
            itemImage: imgSrc,
          },
        },
      }).then((res) => {
        console.log(res.data);
      });
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 422) {
          console.log(data.message);
        } else if (status === 404) {
          //404 이미지 출력
        }
      }
    }
  };
  return uploadProduct;
};

export default ProductUploadAPI;
