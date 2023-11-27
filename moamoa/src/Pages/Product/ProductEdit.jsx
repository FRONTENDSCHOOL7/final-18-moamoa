import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userTokenAtom from '../../Recoil/userTokenAtom';
import { uploadImage } from '../../API/Img/UploadImageAPI';
import ProductDetailAPI from '../../API/Product/ProductDetailAPI';
import ProductEditAPI from '../../API/Product/ProductEditAPI';
import useProgressPeriodEffect from '../../Hooks/Product/useProgressPeriodEffect';
// Styled-Component 수정 예정
import { Container } from '../../Components/Common/Container';
import Gobackbtn from '../../Components/Common/GoBackbtn';
import DefaultImg from '../../Assets/images/img-product-default.png';
import {
  Form,
  Header,
  HeaderButton,
  ImgLayoutContainer,
  ImageLabel,
  Image,
  LayoutContainer,
  SelectedButton,
  EventNameInput,
  PeriodInputContainer,
  PeriodInput,
  Textarea,
  StyledErrorMsg,
} from '../../Components/Common/ProductSharedStyle';

const ProductEdit = () => {
  const navigate = useNavigate();
  const token = useRecoilValue(userTokenAtom);
  const params = useParams();
  const productId = params.product_id;

  const [productInputs, setProductInputs] = useState({
    product: {
      itemName: '',
      price: '',
      link: '',
      itemImage: '',
    },
  });
  const [productType, setProductType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { progressPeriod, dateSelectionErrorMsg } = useProgressPeriodEffect(startDate, endDate);

  const handleProductName = (product) => {
    product.includes('[f]') ? setProductType('festival') : setProductType('experience');
    return product.slice(3);
  };

  const getProductData = (data) => {
    setProductInputs((prev) => ({
      product: {
        ...prev.productInput,
        itemName: handleProductName(data.product.itemName),
        price: data.product.price,
        link: data.product.link,
        itemImage: data.product.itemImage,
      },
    }));

    const period = data.product.price.toString();
    setStartDate(`${period.slice(0, 4)}-${period.slice(4, 6)}-${period.slice(6, 8)}`);
    setEndDate(`${period.slice(8, 12)}-${period.slice(12, 14)}-${period.slice(14, 16)}`);
  };

  const fetchProductInfo = async () => {
    await ProductDetailAPI(token, productId, getProductData);
  };

  useEffect(() => {
    fetchProductInfo();
  }, []);

  const handleChangeImage = async (e) => {
    const imageFile = e.target.files[0];
    const response = await uploadImage(imageFile);
    setProductInputs({
      ...productInputs,
      product: {
        ...productInputs.product,
        itemImage: `https://api.mandarin.weniv.co.kr/${response.data.filename}`,
      },
    });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProductInputs((prevState) => ({
      product: {
        ...prevState.product,
        [name]: value,
      },
    }));
  };

  const { handleProductEdit } = ProductEditAPI(
    token,
    productId,
    productInputs,
    productType,
    progressPeriod,
  );

  const editProduct = async (e) => {
    e.preventDefault();
    await handleProductEdit();
    navigate('/product/list');
  };

  const isDisabled =
    !productInputs.product.itemImage ||
    productInputs.product.itemName.length < 2 ||
    !startDate ||
    !endDate ||
    !productInputs.product.link ||
    !productType ||
    startDate > endDate;

  return (
    <Container>
      <Header>
        <Gobackbtn />
        <HeaderButton onClick={editProduct} disabled={isDisabled}>
          수정
        </HeaderButton>
      </Header>
      <h1 className='a11y-hidden'>상품 수정 페이지</h1>
      <Form>
        <ImgLayoutContainer>
          <h2>이미지 등록</h2>
          <ImageLabel htmlFor='upload-file'>
            <Image
              src={productInputs.product.itemImage || DefaultImg}
              alt={productInputs.product.itemName}
            />
          </ImageLabel>
          <input
            className='a11y-hidden'
            id='upload-file'
            type='file'
            accept='image/*'
            onChange={handleChangeImage}
          ></input>
          <p>* 행사 관련 이미지를 등록해주세요.</p>
        </ImgLayoutContainer>
        <LayoutContainer>
          <h2>카테고리</h2>
          <div>
            <SelectedButton
              type='button'
              onClick={() => setProductType('festival')}
              selected={productType === 'festival'}
            >
              축제
            </SelectedButton>
            <SelectedButton
              type='button'
              onClick={() => setProductType('experience')}
              selected={productType === 'experience'}
            >
              체험
            </SelectedButton>
          </div>
        </LayoutContainer>
        <LayoutContainer>
          <label htmlFor='event-name'>행사명</label>
          <EventNameInput
            id='event-name'
            type='text'
            placeholder='2~22자 이내여야 합니다.'
            onChange={handleChangeInput}
            name='itemName'
            value={productInputs.product.itemName}
            minLength={2}
            maxLength={22}
          ></EventNameInput>
        </LayoutContainer>
        <LayoutContainer>
          <label htmlFor='event-period'>행사 기간 </label>
          <PeriodInputContainer>
            <PeriodInput
              type='date'
              id='event-period'
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
              pattern='yyyy-MM-dd'
              max='9999-12-31'
            ></PeriodInput>
            <PeriodInput
              type='date'
              id='event-period'
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}
              pattern='yyyy-MM-dd'
              max='9999-12-31'
            ></PeriodInput>
          </PeriodInputContainer>
          <StyledErrorMsg>{dateSelectionErrorMsg}</StyledErrorMsg>
        </LayoutContainer>
        <LayoutContainer>
          <label htmlFor='event-detail'>상세 설명</label>
          <Textarea
            id='event-detail'
            name='link'
            placeholder='행사 관련 정보를 자유롭게 기재해주세요.'
            onChange={handleChangeInput}
            value={productInputs.product.link}
          ></Textarea>
        </LayoutContainer>
      </Form>
    </Container>
  );
};

export default ProductEdit;
