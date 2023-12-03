import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../Components/Common/HeaderBasic';
import AskBtn from './AskBtn';
import ArticleUserProfile from '../../Components/Common/ArticleUserProfile';
import Footer from '../../Components/Common/Footer';
import { getProductDetail } from '../../API/Product/ProductAPI'
import { productPeriod } from './period';

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
                <FestivalImg src={productData.itemImage || ''} alt='행사' />
                <InfoContainer>
                  <FestivalTitle>
                    {productData.itemName.slice(3) || '행사명을 조회할 수 없습니다.'}
                  </FestivalTitle>
                  <FestivalInfo>행사 소개</FestivalInfo>
                  <FestivalDesc>
                    {productData?.link || '행사 상세 설명을 조회할 수 없습니다.'}
                  </FestivalDesc>
                  <FestivalInfo>행사 기간</FestivalInfo>
                  <FestivalDesc>
                    {productData ? productPeriod(productData): '행사 기간을 조회할 수 없습니다.'}
                  </FestivalDesc>
                </InfoContainer>
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
const FestivalImg = styled.img`
  width: 39rem;
  height: 27rem;
  aspect-ratio: 39/27;
  object-fit: cover;
`;
const InfoContainer = styled.div`
  padding: 0 1.6rem;
`;
const FestivalTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
  padding: 1.6rem 1.8rem;
`;

const FestivalInfo = styled.h4`
  font-size: 1.4rem;
  font-weight: bold;
  padding: 1.6rem 1.8rem 0.6rem;
  border-top: 1px solid #dbdbdb;
`;

const FestivalDesc = styled.p`
  font-size: 1.4rem;
  padding: 0 1.8rem;
  margin-bottom: 1.6rem;
  line-height: 2rem;
  color: #767676;
`;
