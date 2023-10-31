import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../../API/Img/UploadImageAPI';
import ProductUploadAPI from '../../API/Product/ProductUploadAPI';

const AddProduct = () => {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventPeriod, setEventPeriod] = useState(1);
  const [periodInfoMsg, setPeriodInfoMsg] = useState('');
  const [imgSrc, setImgSrc] = useState(
    'https://cdn.visitkorea.or.kr/kfes/upload/contents/db/400_03e7c925-a8a5-4923-905c-e12586ec0a44_3.png',
  );
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
    setImgSrc(response);
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

    const putDatesIntoArray = datesArr
      .map((date) => parseInt(date.replaceAll('-', '')))
      .sort((firstDate, lastDate) => firstDate - lastDate);
    setEventPeriod(parseInt(putDatesIntoArray.join('')));
  };

  useEffect(() => {
    checkTwoDates();
    twoDatesIntoOneString();
  }, [eventStartDate, eventEndDate]);

  return (
    <>
      <main>
        <h1>상품 등록 페이지</h1>
        <form onSubmit={submitProduct}>
          <section>
            <h2>이미지 등록</h2>
            <label htmlFor='upload-file'>
              <img src={imgSrc} alt='' srcSet='' id='imagePre' />
            </label>
            <input
              id='upload-file'
              type='file'
              accept='image/*'
              onChange={handleChangeImage}
            ></input>
            <p>* 행사 관련 이미지를 등록해주세요.</p>
          </section>
          <div>
            <h2>카테고리</h2>
            <button type='button' onClick={() => setEventType('festival')}>
              축제
            </button>
            <button type='button' onClick={() => setEventType('experience')}>
              체험
            </button>
          </div>
          <div>
            <label htmlFor='event-name'>행사명</label>
            <input
              id='event-name'
              type='text'
              placeholder='2~22자 이내여야 합니다.'
              pattern='.{2,22}'
              title='2~22자 이내여야 합니다.'
              onChange={(e) => setEventName(e.target.value)}
              value={eventName}
            ></input>
          </div>
          <div>
            <label htmlFor='event-period'>
              행사 기간
              <input
                type='date'
                id='event-period'
                onChange={(e) => setEventStartDate(e.target.value)}
                value={eventStartDate}
                pattern='yyyy-MM-dd'
                max='9999-12-31'
              ></input>
              <input
                type='date'
                id='event-period'
                onChange={(e) => setEventEndDate(e.target.value)}
                value={eventEndDate}
                pattern='yyyy-MM-dd'
                max='9999-12-31'
              ></input>
              {periodInfoMsg}
            </label>
          </div>
          <div>
            <label htmlFor='event-detail'>상세 설명</label>
            <textarea
              id='event-detail'
              placeholder='행사 관련 정보를 자유롭게 기재해주세요.'
              onChange={(e) => setEventDetail(e.target.value)}
              value={eventDetail}
            ></textarea>
          </div>
          <button
            disabled={
              !imgSrc ||
              !eventName ||
              !eventStartDate ||
              !eventEndDate ||
              !eventDetail ||
              !eventType
            }
          >
            저장
          </button>
        </form>
      </main>
    </>
  );
};

export default AddProduct;
