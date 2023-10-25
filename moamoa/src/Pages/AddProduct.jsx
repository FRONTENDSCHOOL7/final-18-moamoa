import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userToken from '../Recoil/UserToken';
import axios from 'axios';
import eventStateAtom from '../Recoil/EventState';
import GoBack from '../Assets/icons/icon-arrow-left.svg';
// const initialDate = new Date();

const AddProduct = () => {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');

  const [eventPeriod, setEventPeriod] = useState(1);
  const [imgSrc, setImgSrc] = useState(
    'https://cdn.visitkorea.or.kr/kfes/upload/contents/db/400_03e7c925-a8a5-4923-905c-e12586ec0a44_3.png',
  );
  const [eventDetail, setEventDetail] = useState('');
  const [eventType, setEventType] = useState('');

  const setCategory = useSetRecoilState(eventStateAtom);
  const token = useRecoilValue(userToken);

  // API 요청-------------------------------------------
  const addEvent = async (imgSrc, eventName, eventPeriod, eventDetail) => {
    const baseUrl = 'https://api.mandarin.weniv.co.kr';
    const reqPath = '/product';
    const reqUrl = baseUrl + reqPath;

    try {
      await axios({
        method: 'post',
        url: reqUrl,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          product: {
            itemName: eventName,
            price: eventPeriod,
            link: eventDetail,
            itemImage: imgSrc,
          },
        },
      }).then((res) => {
        //status 200//
        setCategory({ eventType, eventName, eventStartDate, eventEndDate });
        console.log(res.data);
      });
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        if (status === 422) {
          console.log(data);
        }
        if (status === 404) {
          //404 이미지 출력
        }
        if (status === 500) {
          console.log('Server error');
        }
      } else if (err.request) {
        console.log('Error', err.message);
      } else {
        console.log('Error', err.message);
      }
    }
  };

  const inputEventName = (e) => {
    setEventName(e.target.value);
  };

  const inputEventStartDate = (e) => {
    setEventStartDate(e.target.value);
  };

  const inputEventEndDate = (e) => {
    setEventEndDate(e.target.value);
  };

  const inputEventDetail = (e) => {
    setEventDetail(e.target.value);
  };

  const uploadImage = async (imageFile) => {
    const baseUrl = 'https://api.mandarin.weniv.co.kr/';
    const reqUrl = baseUrl + 'image/uploadfile';
    const form = new FormData();
    form.append('image', imageFile);
    const res = await fetch(reqUrl, {
      method: 'POST',
      body: form,
    });
    const json = await res.json();
    const imageUrl = baseUrl + json.filename;
    setImgSrc(imageUrl);
  };

  const handleChangeImage = (e) => {
    const imageFile = e.target.files[0];
    uploadImage(imageFile);
  };

  // 저장 버튼 클릭 시 이동
  const clickSaveBtn = () => {
    // navigate('/product/:accountname');
  };

  // 뒤로 가기 클릭 시 이동
  const clickLeftArrow = () => {
    navigate(-1);
  };

  const handlePeriod = (startDate, endDate) => {
    // startDate와 endDate를 날짜 객체로 변환
    const start = new Date(startDate);
    const end = new Date(endDate);

    // 날짜 범위 계산
    const timeDiff = Math.abs(end - start);
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    // dayDiff를 가격 필드에 저장
    setEventPeriod(dayDiff);
    console.log(typeof timeDiff);
  };

  const submitProduct = (e) => {
    e.preventDefault();

    handlePeriod(eventStartDate, eventEndDate);

    addEvent(imgSrc, eventName, eventPeriod, eventDetail);
  };

  const handleEventTypeBtn = (id) => {
    id === 'festival' ? setEventType('festival') : setEventType('experience');
  };

  return (
    <>
      <header>
        <a onClick={clickLeftArrow}>
          <img src={GoBack} />
        </a>
      </header>
      <main>
        <h1>상품 등록 페이지</h1>
        <form onSubmit={submitProduct}>
          <section>
            <label htmlFor='upload-file'>
              <img src={imgSrc} alt='' srcSet='' id='imagePre' />
            </label>
            <input
              id='upload-file'
              type='file'
              accept='image/*'
              onChange={handleChangeImage}
            ></input>
          </section>
          <section>
            <h2>카테고리</h2>
            <button type='button' onClick={handleEventTypeBtn} id='festival'>
              축제
            </button>
            <button type='button' onClick={handleEventTypeBtn} id='experience'>
              체험
            </button>
          </section>
          <section>
            <label>행사명</label>
            <input
              type='text'
              placeholder='2~15자 이내여야 합니다.'
              onChange={inputEventName}
              value={eventName}
            ></input>
            <label htmlFor='event-period'>
              행사 기간
              <input
                type='date'
                id='event-period'
                onChange={inputEventStartDate}
                value={eventStartDate}
                pattern='yyyy-MM-dd'
                max='9999-12-31'
              ></input>
              <input
                type='date'
                id='event-period'
                onChange={inputEventEndDate}
                value={eventEndDate}
                pattern='yyyy-MM-dd'
                max='9999-12-31'
              ></input>
            </label>
            {/* 확인 필요 */}
            <label>상세 설명</label>
            <textarea
              placeholder='행사 관련 정보를 자유롭게 기재해주세요.'
              onChange={inputEventDetail}
              value={eventDetail}
            ></textarea>
          </section>
          <button
            onClick={clickSaveBtn}
            disabled={!imgSrc || !eventName || !eventStartDate || !eventEndDate || !eventDetail}
          >
            저장
          </button>
        </form>
      </main>
    </>
  );
};

export default AddProduct;
