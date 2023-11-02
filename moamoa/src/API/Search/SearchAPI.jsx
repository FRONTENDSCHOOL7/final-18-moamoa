import axios from 'axios';

export async function SearchAPI(token, debounceValue) {
  const response = await axios.get(
    `https://api.mandarin.weniv.co.kr/user/searchuser/?keyword=${debounceValue}&limit=1&skip=1`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}
