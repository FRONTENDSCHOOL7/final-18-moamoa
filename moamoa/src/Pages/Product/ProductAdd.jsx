import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductForm } from '../../Components/Product/ProductForm';
import { useProductData } from '../../Hooks/Product/useProductData';
import { uploadProduct } from '../../API/Product/ProductAPI';
import useDateValidation from '../../Hooks/Product/useDateValidation';
import { Container } from '../../Components/Common/Container';
import { HeaderSubmitProduct } from '../../Components/Common/Header/HeaderComponents';
import DefaultImg from '../../Assets/images/img-product-default.png';

const ProductAdd = () => {
  const navigate = useNavigate();

  const initialState = {
    productType: '',
    productName: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    missingInputMessage: '',
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
    missingInputMessage,
    setMissingInputMessage,
    isOpen,
    setIsOpen,
    imgData,
    setImgData,
    prevImgData,
    setPrevImgData,
  } = useProductData(initialState);

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

  const { progressPeriod, dateSelectionErrorMsg } = useDateValidation(startDate, endDate);

  const productData = {
    product: {
      itemName: productType === 'festival' ? `[f]${productName}` : `[e]${productName}`,
      price: progressPeriod,
      link: `${description}+[l]${location}`,
      itemImage: imgData.croppedImageUrl ? imgData.croppedImageUrl : imgData.imageUrl,
    },
  };

  const validationChecks = () => {
    if (
      productName.length < 2 ||
      !startDate ||
      !endDate ||
      !location ||
      !description ||
      !productType ||
      startDate > endDate
    ) {
      setMissingInputMessage('입력하지 않은 정보가 있습니다. 다시 확인해주세요.');
      return false;
    } else {
      setMissingInputMessage('');
      return true;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validationChecks()) {
      return;
    }

    await uploadProduct(productData);
    navigate('/product/list');
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
          dateSelectionErrorMsg={dateSelectionErrorMsg}
          setLocation={setLocation}
          setDescription={setDescription}
          onSubmit={onSubmit}
          missingInputMessage={missingInputMessage}
          imgData={imgData}
          onCancel={onCancel}
          onSelectFile={onSelectFile}
          setCroppedImageFor={setCroppedImageFor}
          isOpen={isOpen}
        />
      </Container>
    </>
  );
};

export default ProductAdd;
