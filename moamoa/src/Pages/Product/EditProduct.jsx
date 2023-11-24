import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userToken from '../../Recoil/userTokenAtom';
import { uploadImage } from '../../API/Img/UploadImageAPI';
import ProductDetailAPI from '../../API/Product/ProductDetailAPI';
import ProductEditAPI from '../../API/Product/ProductEditAPI';
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

const EditProduct = () => {
  const [eventType, setEventType] = useState('');
  const [productInputs, setProductInputs] = useState({
    product: {
      itemName: '',
      price: '',
      link: '',
      itemImage: '',
    },
  });

  const navigate = useNavigate();
  const token = useRecoilValue(userToken);
  const params = useParams();
  const productId = params.product_id;
  const [isModified, setIsModified] = useState(false);
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventPeriod, setEventPeriod] = useState(1);
  const [periodInfoMsg, setPeriodInfoMsg] = useState('');
  const { handleProductEdit } = ProductEditAPI(
    productId,
    productInputs,
    eventType,
    eventPeriod,
    token,
  );

  const handleItemName = (item) => {
    item.includes('[f]') ? setEventType('festival') : setEventType('experience');
    return item.slice(3);
  };

  const getProductData = (data) => {
    setProductInputs((prev) => ({
      product: {
        ...prev.productInput,
        itemName: handleItemName(data.product.itemName),
        price: data.product.price,
        link: data.product.link,
        itemImage: data.product.itemImage,
      },
    }));

    const date = data.product.price.toString();
    setEventStartDate(`${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`);
    setEventEndDate(`${date.slice(8, 12)}-${date.slice(12, 14)}-${date.slice(14, 16)}`);
  };

  const getProductInfo = () => ProductDetailAPI(token, productId, getProductData);

  useEffect(() => {
    const getData = async () => {
      await getProductInfo();
    };
    getData();
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductInputs((prevState) => ({
      product: {
        ...prevState.product,
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    if (eventStartDate && eventEndDate && eventStartDate > eventEndDate) {
      setPeriodInfoMsg('행사 시작 날짜와 행사 종료 날짜를 다시 확인해주세요.');
    } else {
      setPeriodInfoMsg('');
    }
    const datesArr = [];
    if (eventStartDate) {
      datesArr.push(eventStartDate);
    }
    if (eventEndDate) {
      datesArr.push(eventEndDate);
    }

    const putDatesIntoArray = datesArr.map((date) => parseInt(date.replaceAll('-', '')));
    setEventPeriod(parseInt(putDatesIntoArray.join('')));
  }, [eventStartDate, eventEndDate]);

  const editProduct = async (e) => {
    e.preventDefault();
    await handleProductEdit();
    setIsModified(true);
  };

  useEffect(() => {
    if (isModified) navigate(`/product/list`, { state: { isModified } });
  }, [isModified, navigate]); //상품 리스트 페이지로 이동

  return (
    <Container>
      <Header>
        <Gobackbtn />
        <HeaderButton
          onClick={editProduct}
          disabled={
            !productInputs.product.itemImage ||
            productInputs.product.itemName.length < 2 ||
            !eventStartDate ||
            !eventEndDate ||
            !productInputs.product.link ||
            !eventType ||
            eventStartDate > eventEndDate
          }
        >
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
          <label htmlFor='category'>카테고리</label>
          <div>
            <SelectedButton
              id='category'
              type='button'
              onClick={() => setEventType('festival')}
              selected={eventType === 'festival'}
            >
              축제
            </SelectedButton>
            <SelectedButton
              id='category'
              type='button'
              onClick={() => setEventType('experience')}
              selected={eventType === 'experience'}
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
            pattern='.{2,22}'
            title='2~22자 이내여야 합니다.'
            onChange={handleInputChange}
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
              onChange={(e) => setEventStartDate(e.target.value)}
              value={eventStartDate}
              pattern='yyyy-MM-dd'
              max='9999-12-31'
            ></PeriodInput>
            <PeriodInput
              type='date'
              id='event-period'
              onChange={(e) => setEventEndDate(e.target.value)}
              value={eventEndDate}
              pattern='yyyy-MM-dd'
              max='9999-12-31'
            ></PeriodInput>
          </PeriodInputContainer>
          <StyledErrorMsg>{periodInfoMsg}</StyledErrorMsg>
        </LayoutContainer>
        <LayoutContainer>
          <label htmlFor='event-detail'>상세 설명</label>
          <Textarea
            id='event-detail'
            name='link'
            placeholder='행사 관련 정보를 자유롭게 기재해주세요.'
            onChange={handleInputChange}
            value={productInputs.product.link}
          ></Textarea>
        </LayoutContainer>
      </Form>
    </Container>
  );
};

export default EditProduct;
