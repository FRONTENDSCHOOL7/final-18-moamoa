/*
  설명: 프로필 상세 페이지 진행중인 행사목록
  작성자: 이해지
  최초 작성 날짜: 2023.10.29
  마지막 수정 날까: 2023.02.03
*/

import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import {
  ProductItro,
  ProfileProductWrapper,
  ProfileProduct,
  MoveBtn,
  ProductListBox,
  ProductBox,
} from './ProfileStyle';

import ProductImgBox from '../Common/ProductImgBox';

import leftBtn from '../../Assets/images/left-vector.png';
import rightBtn from '../../Assets/images/right-vector.png';

import { productList } from '../../API/Product/ProductAPI';

import MyProductModal from './MyProductModal';

export default function ProfileDetailProduct({ userInfoData, reFetchInfo }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [eventList, setEventList] = useState([]);

  const userAccountname = location.pathname.replace('/profile/', ''); // myInfo인지 확인
  const [showMyProductOptions, setShowMyProductOptions] = useState(false);
  const [productId, setProductId] = useState('');
  const [showScrollButtons, setShowScrollButtons] = useState(false);

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

  const animateScroll = (element, target, duration) => {
    const startTime = performance.now();
    const startPosition = element.scrollLeft;
    const distance = target - startPosition;

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const fraction = Math.min(elapsedTime / duration, 1);
      element.scrollLeft = startPosition + distance * fraction;

      if (elapsedTime < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  // 왼쪽으로 스크롤하는 함수
  const scrollLeft = () => {
    if (profileProductRef.current) {
      animateScroll(profileProductRef.current, profileProductRef.current.scrollLeft - 190, 200);
    }
  };

  // 오른쪽으로 스크롤하는 함수
  const scrollRight = () => {
    if (profileProductRef.current) {
      animateScroll(profileProductRef.current, profileProductRef.current.scrollLeft + 190, 200);
    }
  };

  useEffect(() => {
    // 스크롤바 체크 함수
    const checkForScrollbar = () => {
      if (profileProductRef.current) {
        const hasScrollbar =
          profileProductRef.current.scrollWidth > profileProductRef.current.clientWidth;
        setShowScrollButtons(hasScrollbar);
      }
    };

    checkForScrollbar();
    // 윈도우 리사이즈 이벤트에도 스크롤바 체크
    window.addEventListener('resize', checkForScrollbar);

    return () => {
      window.removeEventListener('resize', checkForScrollbar);
    };
  }, [eventList]);

  //모달 창 닫기
  const closeModal = () => {
    setShowMyProductOptions(false);
  };

  // 판매자일 경우에만 진행중인 행사를 출력
  return (
    <ProductItro>
      <article>
        <h2>진행중인 행사</h2>
        <ProfileProductWrapper>
          {eventList.length > 0 ? (
            <>
              {showScrollButtons && (
                <MoveBtn>
                  <button className='left-btn' onClick={scrollLeft}>
                    <img src={leftBtn} alt='' />
                  </button>
                </MoveBtn>
              )}

              <ProfileProduct ref={profileProductRef}>
                {showMyProductOptions && (
                  <MyProductModal
                    userInfoData={userInfoData}
                    reFetchInfo={reFetchInfo}
                    productId={productId}
                    closeModal={closeModal}
                    fetchProduct={fetchProduct}
                  />
                )}

                <ProductListBox>
                  {eventList.map((event) => (
                    <ProductBox key={event.id}>
                      <li key={event.id} onClick={() => handleProductClick(event.id)}>
                        <ProductImgBox className='itemImg' src={event.itemImage} />
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
              {showScrollButtons && (
                <MoveBtn>
                  <button className='right-btn' onClick={scrollRight}>
                    <img src={rightBtn} alt='' />
                  </button>
                </MoveBtn>
              )}
            </>
          ) : (
            <p className='emptyItem'>등록된 행사가 없습니다!</p>
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
