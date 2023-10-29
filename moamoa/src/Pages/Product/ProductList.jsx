/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ProductImgBox from '../../Components/Common/ProductImgBox';
import Header from '../../Components/Common/HeaderProductList';
import { Container } from '../../Components/Common/Container';
import Footer from '../../Components/Common/Footer';
import userTokenAtom from '../../Recoil/userTokenAtom';
import { ProductListAPI } from '../../API/Product/ProductListAPI';
import backgroundMoamoa from '../../Assets/images/backgroundMoamoa.png';
export const ProductAtom = atom({
  key: 'ProductState',
  default: [],
});
// ProductList
export default function ProductList() {
  const [product, setProduct] = useRecoilState(ProductAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFestivalActive, setFestivalActive] = useState(true);
  const [isExperienceActive, setExperienceActive] = useState(false);
  const token = useRecoilValue(userTokenAtom);

  const toggleExperience = () => {
    setFestivalActive(false);
    setExperienceActive(true);
  };
  const toggleFestival = () => {
    setFestivalActive(true);
    setExperienceActive(false);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const productList = await ProductListAPI(token);
        setProduct(productList);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, [token, setProduct]);
  // 행시기간 함수
  function formatDateString(dateString) {
    const year = toString.slice(2, 4);
    const month = toString.slice(4, 6);
    const day = toString.slice(6, 8);
    return `${year}.${month}.${day}`;
  }
  //   리턴
  return (
    <BackColor className='body'>
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
                  .filter((item) => {
                    if (item.price.toString().length >= 16) {
                      return true;
                    }
                    return false;
                  })
                  .map((item, index) => (
                    <Link to={`/product/detail/${item._id}`} key={index}>
                      <ProductBox key={index}>
                        <ProductImgBox src={item.itemImage} />
                        <p className='itemName'>{item.itemName}</p>
                        <p className='itemDate'>
                          {'행사기간: ' +
                            `${item.price.toString().slice(2, 4)}.${item.price
                              .toString()
                              .slice(4, 6)}.${item.price.toString().slice(6, 8)}~${item.price
                              .toString()
                              .slice(10, 12)}.${item.price.toString().slice(12, 14)}.${item.price
                              .toString()
                              .slice(14, 16)}`}
                        </p>
                      </ProductBox>
                    </Link>
                  ))
              : null}
            {/* {console.log('콘솔로그는 뭘까:', product)} */}
            {/* {console.log('아이디찾기:', product[0]._id)} */}
            {isExperienceActive
              ? product
                  .filter((item) => {
                    if (item.price.toString().length >= 16) {
                      return true;
                    }
                    return false;
                  })
                  .map((item, index) => (
                    <ProductBox key={index}>
                      <ProductImgBox src={item.itemImage} />
                      <Link to={`/product/detail/${item._id}`} key={index}></Link>
                      <p className='itemName'>{item.itemName}</p>
                      <p className='itemDate'>
                        {'행사기간: ' +
                          `${item.price.toString().slice(2, 4)}.${item.price
                            .toString()
                            .slice(4, 6)}.${item.price.toString().slice(6, 8)}~${item.price
                            .toString()
                            .slice(10, 12)}.${item.price.toString().slice(12, 14)}.${item.price
                            .toString()
                            .slice(14, 16)}`}
                      </p>
                    </ProductBox>
                  ))
              : null}
          </ProductContainer>
        )}
        <Footer></Footer>
      </Container>
    </BackColor>
  );
}

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
  flex: 1;
  padding-bottom: 150px;
  background-image: url(${backgroundMoamoa});
  background-repeat: no-repeat;
  background-position: 110% 88%;
`;
const ProductBox = styled.div`
  max-width: 172px;
  margin: 0 auto;

  .itemName {
    font-size: 14px;
    margin: 12px 0 6px 4px;
    font-weight: 500;
    cursor: default;
  }
  .itemDate {
    margin-left: 4px;
    color: #797979;
    font-size: 11px;
    font-weight: 400;
    cursor: default;
  }
`;
const BackColor = styled.div`
  background-color: #fff9e4;
`;
