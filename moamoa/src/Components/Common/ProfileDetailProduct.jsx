/*
  설명: 프로필 상세 페이지 진행중인 행사목록
  작성자: 이해지
  최초 작성 날짜: 2023.10.29
  마지막 수정 날까: 2023.10.31
*/

import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProductImgBox from '../../Components/Common/ProductImgBox';
import userToken from '../../Recoil/userTokenAtom'; //파일경로 변경 완료
import leftBtn from '../../Assets/images/left-vector.png';
import rightBtn from '../../Assets/images/right-vector.png';

// 상품 수정 페이지 이동 테스트 필요
function MyProductClick({ productId }) {
  const navigate = useNavigate();
  const token = useRecoilValue(userToken);

  const delProduct = async () => {
    const res = await fetch(`https://api.mandarin.weniv.co.kr/product/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();
    console.log(json);
  };

  return (
    <section>
      <button type='button' onClick={delProduct}>
        상품삭제
      </button>
      <button
        type='button'
        onClick={() => {
          navigate(`/product/${productId}`);
        }}
      >
        수정
      </button>
      <button
        type='button'
        onClick={() => {
          navigate(`/product/detail/${productId}`);
        }}
      >
        상품 상세 보기
      </button>
    </section>
  );
}

MyProductClick.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default function ProfileDetailProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const [eventList, setEventList] = useState([]);
  const token = useRecoilValue(userToken);
  const userAccountname = location.pathname.replace('/profile/', ''); // 경로에서 사용자 accountname을 추출
  const [showMyProductOptions, setShowMyProductOptions] = useState(false);
  const [productId, setProductId] = useState('');

  const getMyAcnt = async () => {
    const res = await fetch(`https://api.mandarin.weniv.co.kr/user/myinfo`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();
    return json.user['accountname'];
  };

  const getEventList = async (accountName) => {
    const acnt = userAccountname === 'myInfo' ? accountName : userAccountname;
    const res = await fetch(`https://api.mandarin.weniv.co.kr/product/${acnt}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();
    setEventList(json.product);
  };

  useEffect(() => {
    const fetchData = async () => {
      const accountName = await getMyAcnt();
      getEventList(accountName);
    };

    fetchData();
  }, []);

  const handleProductClick = async (productId) => {
    if (userAccountname === 'myInfo') {
      setProductId(productId);
      setShowMyProductOptions(true);
    } else {
      // 상품 상세 페이지 이동 테스트 필요
      navigate(`/product/detail/${productId}`);
    }
  };

  // 상품리스트에서 스크롤이 생겼을 경우
  const profileProductRef = useRef(null);

  // 왼쪽으로 스크롤하는 함수
  const scrollLeft = () => {
    if (profileProductRef.current) {
      profileProductRef.current.scrollBy({ left: -100, behavior: 'smooth' }); // 150px 만큼 왼쪽으로 스크롤
    }
  };

  // 오른쪽으로 스크롤하는 함수
  const scrollRight = () => {
    if (profileProductRef.current) {
      profileProductRef.current.scrollBy({ left: 100, behavior: 'smooth' }); // 150px 만큼 오른쪽으로 스크롤
    }
  };

  // 판매자일 경우에만 진행중인 행사를 출력 - 수정필요
  return (
    <ProductItro>
      <article>
        <h2>진행중인 행사</h2>
        <ProfileProductWrapper>
          <MoveBtn>
            <button className='left-btn' onClick={scrollLeft}>
              <img src={leftBtn} alt='' />
            </button>
          </MoveBtn>
          <ProfileProduct ref={profileProductRef}>
            {showMyProductOptions && <MyProductClick productId={productId} />}
            <ProductListBox>
              {eventList.map((event) => (
                //
                <ProductBox key={event.id}>
                  <li key={event.id} onClick={() => handleProductClick(event.id)}>
                    <ProductImgBox src={event.itemImage} />
                    <p className='itemName'>{event.itemName.replace('[f]', '')}</p>
                    <p className='itemDate'>
                      {'행사기간: ' +
                        `${event.price.toString().slice(2, 4)}.${event.price
                          .toString()
                          .slice(4, 6)}.${event.price.toString().slice(6, 8)}~${event.price
                          .toString()
                          .slice(10, 12)}.${event.price.toString().slice(12, 14)}.${event.price
                          .toString()
                          .slice(14, 16)}`}
                    </p>
                  </li>
                </ProductBox>
              ))}
            </ProductListBox>
          </ProfileProduct>
          <MoveBtn>
            <button className='right-btn' onClick={scrollRight}>
              <img src={rightBtn} alt='' />
            </button>
          </MoveBtn>
        </ProfileProductWrapper>
      </article>
    </ProductItro>
  );
}

const ProductItro = styled.div`
  padding: 16px;
  position: relative;

  h2 {
    color: #000;
    font-size: 16px;
    margin-bottom: 16px;
  }
`;

const ProfileProductWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ProfileProduct = styled.div`
  display: flex;
  overflow-x: auto; // 가로 스크롤바를 추가
  overflow-y: hidden; // 세로 스크롤바는 숨김

  position: relative;
  padding-bottom: 10px;

  /* 스크롤바 스타일 적용 */
  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #dde7f0; /* 스크롤바의 색상 */

    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #87b7e4;
  }

  &::-webkit-scrollbar-track {
    background: none; /*스크롤바 뒷 배경 색상*/
  }
`;

const MoveBtn = styled.div`
  position: absolute;
  top: 40%; // 버튼을 부모 컨테이너의 수직 중앙에 위치시킵니다.

  z-index: 10; // 다른 요소들 위에 오도록 z-index 설정

  display: flex;
  justify-content: space-between;
  width: 100%;

  pointer-events: none;
  cursor: pointer;

  button.left-btn {
    left: 0;
  }

  button.right-btn {
    right: 0;
  }

  button {
    position: absolute;
    pointer-events: auto; // 버튼만 클릭 가능하도록 설정
  }

  img {
    width: 21px;
    height: 30px;
  }
`;

const ProductListBox = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: nowrap;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const ProductBox = styled.li`
  max-width: 172px;
  margin: 0 auto;
  .itemName {
    font-size: 14px;
    margin: 12px 0 6px 4px;
    font-weight: 500;
  }
  .itemDate {
    margin-left: 4px;
    color: #797979;
    font-size: 11px;
    font-weight: 400;
  }
`;
