export default function PostDetailAPI(token, post_id, getPostDetail) {

    const getPostInfo = async () => {
      const reqUrl = `https://api.mandarin.weniv.co.kr/post/${post_id}`;

      try {
        const res = await fetch(reqUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        });

        if (res.status === 200) {
          const data = await res.json();
          await getPostDetail({...data})
        } else {
          console.error('페이지를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('서버와 통신을 실패했습니다.', error);
      }

    };

    return getPostInfo

}