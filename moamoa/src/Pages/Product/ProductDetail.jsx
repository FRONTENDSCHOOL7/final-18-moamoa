import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../Components/Common/HeaderBasic';
import AskBtn from './AskBtn';
import ArticleUserProfile from '../../Components/Common/ArticleUserProfile';
import Footer from '../../Components/Common/Footer';
import { getProductDetail } from '../../API/Product/ProductAPI'
import ProductContents from '../../Components/ProductList/ProductContents';

export default function ProductDetail() {
  const params = useParams();
  const productId = params.product_id
  const [productData, setProductData] = useState();
  const [productAuthorInfo, setProductAuthorInfo] = useState();

  const profileImg = productAuthorInfo?.image;
  const userName = productAuthorInfo?.username?.slice(3);
  const accountName = productAuthorInfo?.accountname;

  const userProfileData = { profileImg, userName, accountName}
  const btnData = {userName, accountName}

  const getProductData = (data) => {
    setProductData(data.product);
    setProductAuthorInfo(data.product.author);
  }

  const getProductInfo = () => getProductDetail(productId, getProductData);

  useEffect(()=>{
    const getData = async () => {
      await getProductInfo();
    }
  getData();
  },[])

  return (
    <>
      { productData && productAuthorInfo && (
          <Container>
            <FestivalContainer>
              <Header />
              <FestivalArticle>
                <Frofile>
                  <ArticleUserProfile userProfileData={userProfileData} />
                  <AskBtn btnData={btnData} />
                </Frofile>
                <ProductContents productData={productData}/>
              </FestivalArticle>
              <Footer />
            </FestivalContainer>
          </Container>
      )}
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff9e4;
`;
const FestivalContainer = styled.div`
  max-width: 39rem;
  width: 100%;
  height: 100%;
  margin: auto;

  background-color: #ffffff;
  overflow: hidden;
`;
const FestivalArticle = styled.article`
  margin-top: 4.8rem;
  margin-bottom: 7rem;
`;
const Frofile = styled.div`
  height: 4.2rem;
  padding: 0.7rem 1.2rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;