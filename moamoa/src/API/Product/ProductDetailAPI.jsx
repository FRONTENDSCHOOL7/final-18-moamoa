import axios from 'axios';

export default function ProductDetailAPI(token, productId, getProductData) {
  const getProductInfo = async () => {
    const reqUrl = `https://api.mandarin.weniv.co.kr/product/detail/${productId}`;

    try {
      const res = await axios.get(reqUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        const data = res.data;
        await getProductData({ ...data });
      } else {
        console.error('페이지를 불러오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('서버와 통신을 실패했습니다.', error);
    }
  };
  return getProductInfo();
}
