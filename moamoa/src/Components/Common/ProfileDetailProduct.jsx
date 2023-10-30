/*
  설명: 프로필 상세 페이지 진행중인 행사목록
  작성자: 이해지
  최초 작성 날짜: 2023.10.29
  마지막 수정 날까: 2023.10.30
*/

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import ProductImgBox from '../../Components/Common/ProductImgBox';
import userToken from '../../Recoil/userTokenAtom'; //파일경로 변경 완료

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
  // const joinData = useRecoilValue(joinStateAtom);
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

  // 판매자일 경우에만 진행중인 행사를 출력 - 수정필요
  return (
    <article>
      <h2>진행중인 행사</h2>
      {showMyProductOptions && <MyProductClick productId={productId} />}
      <ul>
        {eventList.map((event) => (
          //
          <li key={event.id} onClick={() => handleProductClick(event.id)}>
            <button>
              <ProductImgBox src={event.itemImage} />
              <p>{event.itemName}</p>
              <p>{event.price}</p>
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
}
