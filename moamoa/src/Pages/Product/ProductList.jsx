import React, { useEffect, useState } from 'react';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import axios from 'axios';
import eventStateAtom from '../../Recoil/EventState';
import { Link } from 'react-router-dom';
import ProductImgBox from '../../Components/Common/ProductImgBox';
// import Header from '../../Components/Common/HeaderSearch';
// import Header from '../../Components/Common/HeaderBasic';
// import Header from '../../Components/Common/HeaderHome';
import Header from '../../Components/Common/HeaderProductList';
import { Container } from '../../Components/Common/Container';
const Nav = styled.div`
  display: flex;
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

  const toggleExperience = () => {
    setFestivalActive(false);
    setExperienceActive(true);
  };
  const toggleFestival = () => {
    setFestivalActive(true);
    setExperienceActive(false);
  };
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
        console.log('데이터를 가져왔습니다:', response);
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
  const setCategory = useSetRecoilState(eventStateAtom);
  const Category = useRecoilValue(eventStateAtom);
  console.log('setCategory : ', setCategory);
  console.log('Category.eventType : ', Category);
  // console.log('isFestivalActive: ', isFestivalActive);
  // console.log('isExperienceActive: ', isExperienceActive);
  return (
    <>
      <Container>
        <Header />
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
            {isFestivalActive
              ? product
                  .filter(() => Category.eventType === 'festival')
                  .map((item, index) => (
                    <Link to={`/product/detail/${item.id}`} key={index}>
                      <ProductBox key={index}>
                        <ProductImgBox src={item.itemImage} />
                        <p className='itemName'>{item.itemName}</p>
                        <p className='itemDate'>{item.createdAt}</p>
                      </ProductBox>
                    </Link>
                  ))
              : null}
            {console.log('콘솔로그는 뭘까:', product)}
            {isExperienceActive
              ? product
                  .filter(() => Category.eventType === 'experience')
                  .map((item, index) => (
                    <Link to={`/product/detail/${item.id}`} key={index}>
                      <ProductBox key={index}>
                        <p className='itemName'>{item.itemName}</p>
                        <p className='itemDate'>{item.createdAt}</p>
                      </ProductBox>
                    </Link>
                  ))
              : null}
          </ProductContainer>
        )}
      </Container>
    </>
  );
}
