import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../../API/Img/UploadImageAPI';
import ProductUploadAPI from '../../API/Product/ProductUploadAPI';
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

const AddProduct = () => {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventPeriod, setEventPeriod] = useState(1);
  const [periodInfoMsg, setPeriodInfoMsg] = useState('');
  const [imgSrc, setImgSrc] = useState(DefaultImg);
  const [eventDetail, setEventDetail] = useState('');
  const [eventType, setEventType] = useState('');

  const uploadEvent = ProductUploadAPI({ eventName, eventPeriod, eventDetail, imgSrc, eventType });

  const submitProduct = async (e) => {
    e.preventDefault();
    await uploadEvent();
    navigate('/product/list');
  };

  const handleChangeImage = async (e) => {
    const imageFile = e.target.files[0];
    const response = await uploadImage(imageFile);
    setImgSrc(`https://api.mandarin.weniv.co.kr/${response.data.filename}`);
  };

  const checkTwoDates = () => {
    if (eventStartDate && eventEndDate && eventStartDate > eventEndDate) {
      setPeriodInfoMsg('행사 시작 날짜와 행사 종료 날짜를 다시 확인해주세요.');
    } else {
      setPeriodInfoMsg('');
    }
  };

  const twoDatesIntoOneString = () => {
    const datesArr = [];
    if (eventStartDate) {
      datesArr.push(eventStartDate);
    }
    if (eventEndDate) {
      datesArr.push(eventEndDate);
    }

    const putDatesIntoArray = datesArr.map((date) => parseInt(date.replaceAll('-', '')));
    // .sort((firstDate, lastDate) => firstDate - lastDate);
    setEventPeriod(parseInt(putDatesIntoArray.join('')));
  };

  useEffect(() => {
    checkTwoDates();
    twoDatesIntoOneString();
  }, [eventStartDate, eventEndDate]);

  return (
    <>
      <Container>
        <Header>
          <Gobackbtn />
          <HeaderButton
            onClick={submitProduct}
            disabled={
              !imgSrc ||
              eventName.length < 2 ||
              !eventStartDate ||
              !eventEndDate ||
              !eventDetail ||
              !eventType ||
              eventStartDate > eventEndDate
            }
          >
            저장
          </HeaderButton>
        </Header>
        <h1 className='a11y-hidden'>상품 등록 페이지</h1>
        <Form>
          <ImgLayoutContainer>
            <h2>이미지 등록</h2>
            <ImageLabel htmlFor='upload-file'>
              <Image src={imgSrc ? imgSrc : DefaultImg} alt={eventName} />
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
              onChange={(e) => setEventName(e.target.value)}
              value={eventName}
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
              placeholder='행사 관련 정보를 자유롭게 기재해주세요.'
              onChange={(e) => setEventDetail(e.target.value)}
              value={eventDetail}
            ></Textarea>
          </LayoutContainer>
        </Form>
      </Container>
    </>
  );
};

export default AddProduct;
