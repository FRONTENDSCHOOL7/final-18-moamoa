const ProductDeleteAPI = (params, token) => {
  const reqURL = 'https://api.mandarin.weniv.co.kr';
  const productId = params.product_id;

  const handleProductDelete = async () => {
    try {
      await fetch(reqURL + `/product/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        console.log('게시물 삭제에 실패했습니다.')
        if (status === 422 || status === 404) {
          console.log(data.message);
        }
      }
    }
  };

  return handleProductDelete();
};

export default ProductDeleteAPI;
