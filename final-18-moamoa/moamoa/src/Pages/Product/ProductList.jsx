import React, { useEffect, useState } from 'react';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ProductImgBox from '../../Components/Common/ProductImgBox';
import Header from '../../Components/Common/HeaderProductList';
import { ContainerPercent } from '../../Components/Common/Container';
import Footer from '../../Components/Common/Footer';
import userTokenAtom from '../../Recoil/userTokenAtom';
import { ProductListAPI } from '../../API/Product/ProductListAPI';
import backgroundMoamoa from '../../Assets/images/backgroundMoamoa.png';
import LoaderProductList from './LoaderProductList';
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

  //   리턴
  return (
    <ContainerPercent>
      <Header />
      <ProductListWrap>
        <Nav>
          <FestivalBtn isActive={isFestivalActive} onClick={toggleFestival}>
            축제
          </FestivalBtn>
          <ExperienceBtn isActive={isExperienceActive} onClick={toggleExperience}>
            체험
          </ExperienceBtn>
        </Nav>
        {loading ? (
          <LoaderProductList />
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
                  .filter((item) => {
                    return item.itemName.includes('[f]');
                  })
                  .map((item, index) => (
                    <ProductBox key={index}>
                      <Link to={`/product/detail/${item._id}`} key={index}>
                        <ProductImgBox src={item.itemImage} />
                      </Link>
                      <p className='itemName'>{item.itemName.replace('[f]', '')}</p>
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
                  .filter((item) => {
                    return item.itemName.includes('[e]');
                  })
                  .map((item, index) => (
                    <ProductBox key={index}>
                      <Link to={`/product/detail/${item._id}`} key={index}>
                        <ProductImgBox src={item.itemImage} />
                      </Link>
                      <p className='itemName'>{item.itemName.replace('[e]', '')}</p>
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
      </ProductListWrap>
      <Footer></Footer>
    </ContainerPercent>
  );
}

const Nav = styled.div`
  /* display: flex; */
  padding: 12px;
  /* height: 100vh; */
`;

const ProductListWrap = styled.div`
  margin-top: 48px;
`;
const Button = styled.button`
  width: 80px;
  height: 36px;
  border: 1px solid #dadada;
  border-radius: 10px;
  font-weight: bold;
  font-size: 14px;
  margin-right: 6px;
`;
const FestivalBtn = styled(Button).withConfig({
  shouldForwardProp: (prop) => !['isActive', 'active'].includes(prop),
})`
  background-color: ${({ isActive }) => (isActive ? '#87b7e4' : '#ffffff')};
  color: ${({ isActive }) => (isActive ? '#ffffff' : '#dadada')};
`;

const ExperienceBtn = styled(Button).withConfig({
  shouldForwardProp: (prop) => !['isActive', 'active'].includes(prop),
})`
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
  background-position: 110% 91%;
  background-position: bottom 8rem right 0px;
  /* height: 100%; */
  grid-template-rows: 160px;
`;
const ProductBox = styled.div`
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
