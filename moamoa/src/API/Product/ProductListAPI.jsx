// ProductAPI.js

import axios from 'axios';

export async function ProductListAPI(token) {
  const response = await axios.get('https://api.mandarin.weniv.co.kr/product/', {
    // const response = await axios.get('https://api.mandarin.weniv.co.kr/product/?limit=400&skip=0', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // 요청이 성공했을 때 데이터 반환
  return response.data.product;
}
