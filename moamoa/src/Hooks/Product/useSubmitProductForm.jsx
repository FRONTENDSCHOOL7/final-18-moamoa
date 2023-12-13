export const useSubmitProductForm = (
  uploadProduct,
  navigate,
  productData,
  validationChecks,
  productId = null,
) => {
  const submitProductForm = async (e) => {
    e.preventDefault();

    if (!validationChecks()) {
      return;
    }

    const processProduct = async () => {
      if (productId) {
        // 상품 수정
        await uploadProduct(productId, productData);
      } else {
        // 상품 등록
        await uploadProduct(productData);
      }
    };

    await processProduct();
    navigate('/product/list');
  };

  return submitProductForm;
};
