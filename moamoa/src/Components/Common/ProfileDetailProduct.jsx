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
import DeleteAlert from '../Modal/DeleteAlert';

// 상품 수정 페이지 이동 테스트 필요
const ConfirmDelModal = ({ delProduct, closeModal, showNoticeModal }) => {
  return (
    <ConfirmModal>
      <Deltext>정말 삭제하시겠습니까?</Deltext>
      <BtnWrap>
        <DelBtn onClick={delProduct}>삭제</DelBtn>
        <CancelBtn onClick={closeModal}>취소</CancelBtn>
      </BtnWrap>
      {!showNoticeModal && <DeleteAlert />}
    </ConfirmModal>
  );
};
ConfirmDelModal.propTypes = {
  delProduct: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  showNoticeModal: PropTypes.bool.isRequired,
};

function MyProductClick({ productId, closeModal, fetchData }) {
  const navigate = useNavigate();
  const token = useRecoilValue(userToken);

  const [showConfirmDelModal, setShowConfirmDelModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(true);

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
    // window.location.reload();
    // 추후 삭제 알림 모달 활성화 되도록 수정할 것
    setShowNoticeModal(false);
    // await setTimeout(() => {
    // }, 1000);
    fetchData();
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
            삭제
          </BtnDel>
          <BtnModify
            type='button'
            onClick={() => {
              navigate('/product/edit', { state: productID });
            }}
          >
            수정
          </BtnModify>
          <BtnProductDesc
            type='button'
            onClick={() => {
              navigate(`/product/detail/${productId}`);
            }}
          >
            상세 보기
          </BtnProductDesc>
        </section>
      </Modal>
      {showConfirmDelModal && (
        <ConfirmDelModal
          delProduct={delProduct}
          closeModal={closeConfirmDelModal}
          showNoticeModal={showNoticeModal}
        />
      )}
    </ModalCont>
  );
}

MyProductClick.propTypes = {
  productId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
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
  const fetchData = async () => {
    const accountName = await getMyAcnt();
    getEventList(accountName);
  };

  useEffect(() => {
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
                  <MyProductClick
                    productId={productId}
                    closeModal={closeModal}
                    fetchData={fetchData}
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
  z-index: 100;
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

const BtnDel = styled.button`
  width: 39rem;
  padding: 2rem;
  margin-top: 1rem;
  font-size: 1.4rem;
  color: #eb5757;
  &:hover {
    font-weight: bold;
  }
`;

const BtnModify = styled(BtnDel)`
  color: #4f9ee9;
  border-top: 1px solid #dbdbdb;
  padding-top: 2.5rem;
`;

const BtnProductDesc = styled(BtnModify)`
  color: #000;
`;

const ConfirmModal = styled.div`
  width: 26rem;
  height: 14rem;
  background-color: #fff;
  border-radius: 1rem;
  position: fixed;
  left: 50%;
  top: 30%;
  transform: translate(-50%);
  padding: 3rem 0 0;
  box-sizing: border-box;
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Deltext = styled.p`
  text-align: center;
  font-size: 1.4rem;
  font-weight: 500;
  padding-bottom: 3rem;
  border-bottom: 1px solid #dbdbdb;
`;

const CancelBtn = styled.button`
  width: 12.5rem;
  height: 6.5rem;
  font-size: 1.4rem;
  color: #000;
  &:hover {
    font-weight: bold;
  }
`;

const DelBtn = styled(CancelBtn)`
  color: #eb5757;
  border-right: 1px solid #dbdbdb;
`;
