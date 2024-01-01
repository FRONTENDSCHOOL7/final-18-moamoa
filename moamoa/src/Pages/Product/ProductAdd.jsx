import React, { useEffect } from 'react';
import { ProductForm } from '../../Components/Product/ProductForm';
import { useProductData } from '../../Hooks/Product/useProductData';
import { Container } from '../../Components/Common/Container';
import { HeaderSubmitProduct } from '../../Components/Common/Header/HeaderComponents';
import DefaultImg from '../../Assets/images/img-product-default.png';

const ProductAdd = () => {
  const initialState = {
    productType: '',
    productName: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    image: {
      imageUrl: DefaultImg,
      croppedImageUrl: null,
    },
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
    isOpen,
    setIsOpen,
    imgData,
    setImgData,
    prevImgData,
    setPrevImgData,
    showModal,
    setShowModal,
    editMode,
    setEditMode,
  } = useProductData(initialState);

  useEffect(() => {
    setEditMode(false);
  }, []);

  const onCancel = () => {
    setImgData((prevImage) => ({
      ...prevImage,
      imageUrl: prevImgData, // 이전 이미지로 설정
    }));
    setIsOpen(false);
  };

  const setCroppedImageFor = (crop, zoom, croppedImageUrl) => {
    const newImage = { ...imgData, croppedImageUrl, crop, zoom };

    setImgData(newImage);
    setIsOpen(false);
  };

  const onSelectFile = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setPrevImgData(imgData.imageUrl); // 이전 이미지 저장
        setImgData((prevImage) => ({
          ...prevImage,
          imageUrl: reader.result?.toString() || '', // 새로운 이미지 설정
        }));
      });
      reader.readAsDataURL(e.target.files[0]);
      setIsOpen(true);
    }
  };

  return (
    <>
      <Container>
        <HeaderSubmitProduct />
        <h1 className='a11y-hidden'>상품 등록 페이지</h1>
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
          isOpen={isOpen}
          editMode={editMode}
        />
      </Container>
    </>
  );
};

export default ProductAdd;
