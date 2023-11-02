/*
  설명: 프로필 상세 페이지 진행중인 행사목록
  작성자: 이해지
  최초 작성 날짜: 2023.10.29
  마지막 수정 날까: 2023.11.01
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
import CloseIcon from '../../Assets/icons/x.png';

// 상품 수정 페이지 이동 테스트 필요
const ConfirmDelModal = ({ delProduct, closeModal }) => {
  return (
    <Modal>
      <ConfirmWrap>
        <p>정말 삭제하시겠습니까?</p>
        <DelBtn>
          <button onClick={delProduct}>삭제</button>
          <button onClick={closeModal}>취소</button>
        </DelBtn>
      </ConfirmWrap>
    </Modal>
  );
};
ConfirmDelModal.propTypes = {
  delProduct: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

function MyProductClick({ productId, closeModal }) {
  const navigate = useNavigate();
  const token = useRecoilValue(userToken);

  const [showConfirmDelModal, setShowConfirmDelModal] = useState(false);

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
    closeModal();
  };

  const openConfirmDelModal = () => {
    setShowConfirmDelModal(true); // 삭제 확인 모달을 열기
  };

  const closeConfirmDelModal = () => {
    setShowConfirmDelModal(false); // 삭제 확인 모달을 닫기
  };

  const productID = { product_id: productId };

  return (
    <ModalCont>
      <Modal>
        <section>
          <Btn onClick={closeModal}>
            <img src={CloseIcon} alt='닫기' />
          </Btn>
          <BtnDel type='button' onClick={openConfirmDelModal}>
            상품삭제
          </BtnDel>
          <BtnModify
            type='button'
            onClick={() => {
              navigate('/product/edit', { state: productID });
            }}
          >
            수정
          </BtnModify>
          <BtnModify
            type='button'
            onClick={() => {
              navigate(`/product/detail/${productId}`);
            }}
          >
            상품 상세 보기
          </BtnModify>
        </section>
      </Modal>
      {showConfirmDelModal && (
        <ConfirmDelModal delProduct={delProduct} closeModal={closeConfirmDelModal} />
      )}
    </ModalCont>
  );
}

MyProductClick.propTypes = {
  productId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
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
                  <MyProductClick productId={productId} closeModal={closeModal} />
                )}

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
                      {showMyProductOptions && (
                        <MyProductClick productId={productId} closeModal={closeModal} />
                      )}
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

//모달 디자인
const ModalCont = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

const Modal = styled.div`
  width: 39rem;
  height: 20.7rem;
  margin: auto;
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translate(-50%);
  background-color: white;
  z-index: 10;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  display: flex;
  flex-direction: column;
`;

const Btn = styled.button`
  width: 5rem;
  height: 5rem;
  position: absolute;
  right: 0;
`;

const BtnModify = styled.button`
  width: 39rem;
  padding: 2rem;
  margin-top: 1rem;
  color: #000;
  border-top: 1px solid #dbdbdb;
  &:hover {
    font-weight: bold;
  }
`;

const BtnDel = styled.button`
  width: 39rem;
  padding: 2rem;
  margin-top: 1rem;
  color: #000;
  &:hover {
    font-weight: bold;
  }
`;

const ConfirmWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  flex: 1;
  font-size: 1.4rem;
`;

const DelBtn = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%; // 전체 너비를 차지하도록 설정

  button {
    height: 100%;
    transition: font-weight 0.3s ease; // 부드러운 전환 효과를 위해 추가
    padding: 10px;
    &:hover {
      font-weight: bold;
      color: #ffc700;
    }
  }
`;
