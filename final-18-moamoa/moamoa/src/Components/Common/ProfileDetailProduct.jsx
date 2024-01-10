/*
  설명: 프로필 상세 페이지 진행중인 행사목록
  작성자: 이해지
  최초 작성 날짜: 2023.10.29
  마지막 수정 날까: 2023.12.15
*/

import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import ProductImgBox from '../Common/ProductImgBox';

import leftBtn from '../../Assets/images/left-vector.png';
import rightBtn from '../../Assets/images/right-vector.png';

import { productList } from '../../API/Product/ProductAPI';

import MyProductClick from './MyProductClick';

export default function ProfileDetailProduct({ userInfoData, reFetchInfo }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [eventList, setEventList] = useState([]);

  const userAccountname = location.pathname.replace('/profile/', ''); // myInfo인지 확인
  const [showMyProductOptions, setShowMyProductOptions] = useState(false);
  const [productId, setProductId] = useState('');

  const fetchProduct = async () => {
    const response = await productList(userInfoData.profileAccountname);
    setEventList(response.product);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleProductClick = async (productId) => {
    if (userAccountname === 'myInfo') {
      setProductId(productId);
      setShowMyProductOptions(true);
    } else {
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

  //모달 창 닫기
  const closeModal = () => {
    setShowMyProductOptions(false);
  };

  // 판매자일 경우에만 진행중인 행사를 출력 - 수정필요
  return (
    <ProductItro>
      <article>
        <h2>진행중인 행사</h2>
        <ProfileProductWrapper>
          {eventList.length > 0 && (
            <>
              <MoveBtn>
                <button className='left-btn' onClick={scrollLeft}>
                  <img src={leftBtn} alt='' />
                </button>
              </MoveBtn>

              <ProfileProduct ref={profileProductRef}>
                {showMyProductOptions && (
                  <MyProductClick
                    userInfoData={userInfoData}
                    reFetchInfo={reFetchInfo}
                    productId={productId}
                    closeModal={closeModal}
                    fetchProduct={fetchProduct}
                  />
                )}

                <ProductListBox>
                  {eventList.map((event) => (
                    //
                    <ProductBox key={event.id}>
                      <li key={event.id} onClick={() => handleProductClick(event.id)}>
                        <ProductImgBox src={event.itemImage} />
                        <p className='itemName'>
                          {event.itemName.slice(0, 3) === '[f]'
                            ? event.itemName.replace('[f]', '')
                            : event.itemName.replace('[e]', '')}
                        </p>
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
            </>
          )}
        </ProfileProductWrapper>
      </article>
    </ProductItro>
  );
}

ProfileDetailProduct.propTypes = {
  userInfoData: PropTypes.object.isRequired,
  reFetchInfo: PropTypes.func.isRequired,
};

const ProductItro = styled.div`
  padding: 16px;
  position: relative;
  background-color: #fff;
  border-bottom: 1px solid #dbdbdb;
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
  top: 30%; // 버튼을 부모 컨테이너의 수직 중앙에 위치시킵니다.

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

  p:last-child {
    color: #87b7e4;
  }
`;

const ProductBox = styled.ul`
  max-width: 172px;
  margin: 0 auto;
  cursor: pointer;
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