import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';
import userTokenAtom from '../../Recoil/userTokenAtom';
import eventTypeAtom from '../../Recoil/eventTypeAtom';
import GoBack from '../../Assets/icons/icon-arrow-left.svg';

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
  const [requiredInfoMsg, setRequiredInfoMsg] = useState('');

  const setEventTypeAtom = useSetRecoilState(eventTypeAtom);
  const saveEventType = () => {
    setEventTypeAtom({ eventType, eventName });
  };

  const token = useRecoilValue(userTokenAtom);

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
        saveEventType();
        console.log(res.data);
        // navigate('/product/:accountname');
      });
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        if (status === 422) {
          // 필수 입력 사항이 모두 입력되지 않았을 경우 메세지 출력
          setRequiredInfoMsg(data.message);
        }
        if (status === 404) {
          //404 이미지 출력
        }
        if (status === 500) {
          console.log('Server error');
        }
      } else if (err.request) {
        // 요청이 이루어졌으나 서버에서 응답이 없었을 경우
        console.log('Error', err.message);
      } else {
        // 그 외 다른 에러
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
    //폼데이터 만들기
    const form = new FormData();
    //폼데이터에 값 추가하기
    //폼데이터.append("키","값");
    form.append('image', imageFile);
    //폼바디에 넣어서 요청하기
    const res = await fetch(reqUrl, {
      method: 'POST',
      body: form,
    });
    const json = await res.json();
    const imageUrl = baseUrl + json.filename;
    setImgSrc(imageUrl);
  };

  const handleChangeImage = (e) => {
    //파일 가져오기
    const imageFile = e.target.files[0];
    uploadImage(imageFile);
  };

  // 뒤로 가기 클릭 시 이동
  const clickLeftArrow = () => {
    navigate(-1);
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

  const submitProduct = (e) => {
    e.preventDefault();
    addEvent(imgSrc, eventName, eventPeriod, eventDetail);
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
              onChange={inputEventName}
              value={eventName}
            ></input>
          </div>
          <div>
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
              {periodInfoMsg}
            </label>
          </div>
          <div>
            <label htmlFor='event-detail'>상세 설명</label>
            <textarea
              id='event-detail'
              placeholder='행사 관련 정보를 자유롭게 기재해주세요.'
              onChange={inputEventDetail}
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
        {requiredInfoMsg}
      </main>
    </>
  );
};

export default AddProduct;
