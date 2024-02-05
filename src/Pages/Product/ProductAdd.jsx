import React, { useEffect } from 'react';
import { ProductForm } from '../../Components/Product/ProductForm';
import { useProductData } from '../../Hooks/Product/useProductData';
import { Container } from '../../Components/Common/Container';
import { HeaderSubmitProduct } from '../../Components/Common/Header/HeaderComponents';
import DefaultImg from '../../Assets/images/img-product-default.png';
import { useImage } from '../../Hooks/Common/useImage';
import NavBar from '../../Components/Common/NavBar';
import RecommendPlace from '../../Components/Common/RecommendPlace';
import Myfollowings from '../../Components/Common/Myfollowings';
import { ProductSection } from './ProductAddEditStyle';
const ProductAdd = () => {
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

  useEffect(() => {
    setEditMode(false);
  }, []);

  const { imgData, showImgModal, onSelectFile, onCancel, setCroppedImageFor } =
    useImage(DefaultImg);

  return (
    <>
      <Container>
        <HeaderSubmitProduct />
        <h1 className='a11y-hidden'>상품 등록 페이지</h1>
        <ProductSection>
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
          />
          <div className='Recommend'>
            <RecommendPlace />
            <Myfollowings />
          </div>
        </ProductSection>
        <div className='large-scree'>
          <NavBar />
        </div>
      </Container>
    </>
  );
};

export default ProductAdd;
