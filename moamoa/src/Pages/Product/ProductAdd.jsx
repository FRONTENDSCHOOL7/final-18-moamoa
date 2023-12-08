import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductForm } from '../../Components/Product/ProductForm';
import { useProductData } from '../../Hooks/Product/useProductData';
import { useSubmitProductForm } from '../../Hooks/Product/useSubmitProductForm';
import { uploadProduct } from '../../API/Product/ProductAPI';
import useDateValidation from '../../Hooks/Product/useDateValidation';
// Styled-Component 수정 예정
import { Container } from '../../Components/Common/Container';
import Gobackbtn from '../../Components/Common/GoBackbtn';
import DefaultImg from '../../Assets/images/img-product-default.png';
import { Header } from '../../Components/Common/ProductSharedStyle';

const ProductAdd = () => {
  const navigate = useNavigate();

  const initialState = {
    imgSrc: DefaultImg,
    productType: '',
    productName: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    missingInputMessage: '',
  };

  const {
    imgSrc,
    setImgSrc,
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
  } = useProductData(initialState);

  const { progressPeriod, dateSelectionErrorMsg } = useDateValidation(startDate, endDate);

  const productData = {
    product: {
      itemName: productType === 'festival' ? `[f]${productName}` : `[e]${productName}`,
      price: progressPeriod,
      link: `${description}+[l]${location}`,
      itemImage: imgSrc,
    },
  };

  const validationChecks = () => {
    if (
      !imgSrc ||
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

  const submitProductForm = useSubmitProductForm(
    uploadProduct,
    navigate,
    productData,
    validationChecks,
  );

  return (
    <>
      <Container>
        <Header>
          <Gobackbtn />
        </Header>
        <h1 className='a11y-hidden'>상품 등록 페이지</h1>
        <ProductForm
          product={{ imgSrc, productName, productType, startDate, endDate, location, description }}
          setImgSrc={setImgSrc}
          setProductType={setProductType}
          setProductName={setProductName}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          dateSelectionErrorMsg={dateSelectionErrorMsg}
          setLocation={setLocation}
          setDescription={setDescription}
          onSubmit={submitProductForm}
          missingInputMessage={missingInputMessage}
        />
      </Container>
    </>
  );
};

export default ProductAdd;
