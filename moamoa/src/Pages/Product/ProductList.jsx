/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { atom, useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import axios from 'axios';
import eventStateAtom from '../../Recoil/EventState';
//

import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userToken from '../../Recoil/UserToken';
// import axios from 'axios';
import GoBack from '../../Assets/icons/icon-arrow-left.svg';
// import eventStateAtom from '../../Recoil/EventState';
const initialDate = new Date();
//
// style
const Header = styled.div`
  background-color: var(--white);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transition: var(--transition-1);
  z-index: 4;
  box-shadow: 0 2px 10px hsla(0, 0%, 0%, 0.1);
  .Container {
    display: flex;
    width: 390px;
    align-items: center;
    padding: 13px 16px;
    margin: 0 auto;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 400;
    background-color: #fff;
  }
`;
const Main = styled.div`
  margin: 0 auto;
  width: 390px;
`;
const Nav = styled.div`
  display: flex;
  /* justify-content: center; */
  padding-top: 70px;
  padding-left: 10px;
`;
const Button = styled.button`
  width: 80px;
  height: 36px;
  border: 1px solid #dadada;
  border-radius: 10px;
  font-weight: bold;
  margin-right: 6px;
  margin-bottom: 16px;
  cursor: pointer;
`;
const FestivalBtn = styled(Button)`
  background-color: ${({ isActive }) => (isActive ? '#87b7e4' : '#ffffff')};
  color: ${({ isActive }) => (isActive ? '#ffffff' : '#dadada')};
`;

const ExperienceBtn = styled(Button)`
  background-color: ${({ isActive }) => (isActive ? '#87b7e4' : '#ffffff')};
  color: ${({ isActive }) => (isActive ? '#ffffff' : '#dadada')};
`;

const ProductContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;
const ProductBox = styled.div`
  max-width: 172px;
  margin: 0 auto;
  img {
    border-radius: 10px;
    border: 1px solid #dbdbdb;
    width: 172px;
    height: 110px;
  }
  .itemName {
    font-size: 12px;
    margin-block: 16px 4px;
  }
  .itemDate {
    color: #797979;
    font-size: 10px;
    font-weight: 400;
  }
`;
export const ProductAtom = atom({
  key: 'ProductState',
  default: [],
});

// ProductList
export default function ProductList() {
  const token = localStorage.getItem('token');
  const [product, setProduct] = useRecoilState(ProductAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isFestivalActive, setFestivalActive] = useState(true);
  const [isExperienceActive, setExperienceActive] = useState(false);
  console.log(isFestivalActive);
  console.log(isExperienceActive);
  const toggleFestival = () => {
    setFestivalActive(true);
    setExperienceActive(false);
  };

  const toggleExperience = () => {
    setFestivalActive(false);
    setExperienceActive(true);
  };
  // const filteredProducts = product.filter((item) => {
  //   if (isFestivalActive) {
  //     return item.category === '축제'; // 축제 카테고리 필터링
  //   } else if (isExperienceActive) {
  //     return item.category === '체험'; // 체험 카테고리 필터링
  //   }
  //   return true; // 다른 카테고리 필터링하지 않음
  // });
  useEffect(() => {
    // 데이터를 비동기적으로 가져오는 함수
    async function axiosData() {
      try {
        const response = await axios.get('https://api.mandarin.weniv.co.kr/product', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 요청이 성공했을 때 실행되는 코드
        console.log('데이터를 가져왔습니다:', response.data);

        // "product" 배열을 Recoil 상태에 저장
        setProduct(response.data.product);
        setLoading(false);
      } catch (error) {
        // 요청이 실패했을 때 실행되는 코드
        console.error('데이터를 가져오지 못했습니다:', error);
        setError(error);
      }
    }

    axiosData(); // 데이터를 가져오는 함수 호출
  }, [token, setProduct]);
  //   리턴
  console.log(eventStateAtom);

  //
  const navigate = useNavigate();
  const [eventName, setEventName] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventPeriod, setEventPeriod] = useState(initialDate);
  const [imgSrc, setImgSrc] = useState(
    'https://cdn.visitkorea.or.kr/kfes/upload/contents/db/400_03e7c925-a8a5-4923-905c-e12586ec0a44_3.png',
  );
  const [eventDetail, setEventDetail] = useState('');
  const [eventType, setEventType] = useState('');

  const setCategory = useSetRecoilState(eventStateAtom);
  // const token = useRecoilValue(userToken);
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
      //status 422
      //에러 처리
      if (err.response) {
        console.log(err);
        // 요청이 이루어졌고 서버가 응답했을 경우
        const { status, config, data } = err.response;

        if (status === 422) {
          console.log(data);
        }

        if (status === 404) {
          //404 이미지 출력
          console.log(`${config.url} not found`);
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
  // API 요청--------------------------------------------

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

  //

  return (
    <>
      {/*  */}
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
            {/* 확인 필요 */}
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
      {/*  */}

      <Header>
        <div className='Container'>
          <h1>모아모아 판매상품</h1>
          <button>돋보기</button>
        </div>
      </Header>
      <Main>
        <Nav>
          <FestivalBtn isActive={isFestivalActive} onClick={toggleFestival}>
            축제
          </FestivalBtn>
          <ExperienceBtn isActive={isExperienceActive} onClick={toggleExperience}>
            체험
          </ExperienceBtn>
        </Nav>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error:{error.message}</p>
        ) : (
          <ProductContainer>
            {product.map((item, index) => (
              <ProductBox key={index}>
                <img src={item.itemImage} />
                <p className='itemName'>{item.itemName}</p>
                <p className='itemDate'>{item.createdAt}</p>
              </ProductBox>
            ))}
          </ProductContainer>
        )}
      </Main>
    </>
  );
}
