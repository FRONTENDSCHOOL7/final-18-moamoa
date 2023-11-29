import axios from 'axios';

export async function ProductListAPI(token) {
  const response = await axios.get('https://api.mandarin.weniv.co.kr/product/?limit=284&skip=0', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.product;
}
