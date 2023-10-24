import React, { useEffect, useState } from 'react';
import { atom, useRecoilState } from 'recoil';
import styled from 'styled-components';
import axios from 'axios';
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
const tempBtn = styled.button`
  width: 80px;
  height: 36px;
  background-color: #87b7e4;
  color: #ffffff;
  border: 1px solid #dadada;
  border-radius: 10px;
  font-weight: bold;
  margin-right: 6px;
  margin-bottom: 16px;
`;
const FestivalBtn = styled(tempBtn)`
  border: none;
`;
const ExperienceBtn = styled(tempBtn)`
  background-color: #ffffff;
  color: #dadada;
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
  return (
    <>
      <Header>
        <div className='Container'>
          <h1>모아모아 판매상품</h1>
          <button>돋보기</button>
        </div>
      </Header>
      <Main>
        <Nav>
          <FestivalBtn>축제</FestivalBtn>
          <ExperienceBtn>체험</ExperienceBtn>
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
