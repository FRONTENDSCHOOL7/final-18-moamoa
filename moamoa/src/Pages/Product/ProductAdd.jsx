import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleUploadImage } from '../../Utils/handleUploadImage';
import { uploadProduct } from '../../API/Product/ProductAPI';
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

const ProductAdd = () => {
  const navigate = useNavigate();

  const [imgSrc, setImgSrc] = useState({
    product: {
      url: DefaultImg,
      alt: '',
    },
  });
  const [productType, setProductType] = useState('');
  const [productName, setProductName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { progressPeriod, dateSelectionErrorMsg } = useProgressPeriodEffect(startDate, endDate);
  const [description, setDescription] = useState('');

  const handleChangeImage = async (e) => {
    handleUploadImage(e, setImgSrc, 'product.url');
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    const productData = {
      product: {
        itemName: productType === 'festival' ? `[f]${productName}` : `[e]${productName}`,
        price: progressPeriod,
        link: description,
        itemImage: imgSrc.product.url,
      },
    };
    await uploadProduct(productData);
    navigate('/product/list');
  };

  const isDisabled =
    !imgSrc.product.url ||
    productName.length < 2 ||
    !startDate ||
    !endDate ||
    !description ||
    !productType ||
    startDate > endDate;

  return (
    <>
      <Container>
        <Header>
          <Gobackbtn />
          <HeaderButton onClick={submitProduct} disabled={isDisabled}>
            저장
          </HeaderButton>
        </Header>
        <h1 className='a11y-hidden'>상품 등록 페이지</h1>
        <Form>
          <ImgLayoutContainer>
            <h2>이미지 등록</h2>
            <ImageLabel htmlFor='upload-file'>
              <Image src={imgSrc.product.url || DefaultImg} alt={imgSrc.product.alt} />
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
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
              minLength={2}
              maxLength={22}
            ></EventNameInput>
          </LayoutContainer>
          <LayoutContainer>
            <label htmlFor='event-period'>행사 기간</label>
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
              placeholder='행사 관련 정보를 자유롭게 기재해주세요.'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></Textarea>
          </LayoutContainer>
        </Form>
      </Container>
    </>
  );
};

export default ProductAdd;
