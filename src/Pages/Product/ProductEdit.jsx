import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductForm } from '../../Components/Product/ProductForm';
import { useProductData } from '../../Hooks/Product/useProductData';
import { getProductDetail } from '../../API/Product/ProductAPI';
import { Container } from '../../Components/Common/Container';
import DefaultImg from '../../Assets/images/img-product-default.png';
import { HeaderSubmitProduct } from '../../Components/Common/Header/HeaderComponents';
import { useImage } from '../../Hooks/Common/useImage';

const ProductEdit = () => {
  const params = useParams();
  const productId = params.product_id;

  const initialState = {
    productType: '',
    productName: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
  };

  const {
    productType,
    setProductType,
    productName,
    setProductName,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    location,
    setLocation,
    description,
    setDescription,
    showModal,
    setShowModal,
    editMode,
    setEditMode,
  } = useProductData(initialState);

  const { imgData, setImgData, showImgModal, onSelectFile, onCancel, setCroppedImageFor } =
    useImage(DefaultImg);

  const getProductData = (data) => {
    const period = data.product.price.toString();

    setProductType(data.product.itemName.slice(0, 3) === '[f]' ? 'festival' : 'experience');
    setProductName(data.product.itemName.slice(3));
    setImgData((prevImg) => ({ ...prevImg, imageUrl: data.product.itemImage }));
    setDescription(data.product.link.split('+[l]')[0]);
    setLocation(data.product.link.split('+[l]')[1]);
    setStartDate(`${period.slice(0, 4)}-${period.slice(4, 6)}-${period.slice(6, 8)}`);
    setEndDate(`${period.slice(8, 12)}-${period.slice(12, 14)}-${period.slice(14, 16)}`);
  };

  useEffect(() => {
    const fetchProductInfo = async () => {
      await getProductDetail(productId, getProductData);
    };

    fetchProductInfo();
    setEditMode(true);
  }, []);

  return (
    <Container>
      <HeaderSubmitProduct />
      <h1 className='a11y-hidden'>상품 수정 페이지</h1>
      <ProductForm
        product={{ productName, productType, startDate, endDate, location, description }}
        setProductType={setProductType}
        setProductName={setProductName}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setLocation={setLocation}
        setDescription={setDescription}
        showModal={showModal}
        setShowModal={setShowModal}
        imgData={imgData}
        onCancel={onCancel}
        onSelectFile={onSelectFile}
        setCroppedImageFor={setCroppedImageFor}
        showImgModal={showImgModal}
        editMode={editMode}
        productId={productId}
      />
    </Container>
  );
};

export default ProductEdit;
