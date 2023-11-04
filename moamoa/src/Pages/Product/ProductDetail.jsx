import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import userToken from '../../Recoil/userTokenAtom';
import styled from 'styled-components';
import Header from '../../Components/Common/HeaderBasic';
import AskBtn from './AskBtn';
import PostCardUser from '../../Components/Post/PostCardUser';

export default function ProductDetail() {
  const productState = atom({
    key: 'productData',
    default: null,
  });
  const token = useRecoilValue(userToken);

  const [productData, setProductData] = useRecoilState(productState);
  const [productId, setProductId] = useState([]);
  const [pageIndex, setPageIndex] = useState(null);

  useEffect(() => {
    const getProductData = async () => {
      const reqUrl = `https://api.mandarin.weniv.co.kr/product`;

      try {
        const res = await fetch(reqUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
          },
        });

        if (res.status === 200) {
          const product = await res.json();
          setProductData(product);
          const idList = product.product.map((item) => item._id);
          setProductId(idList);
        } else {
          console.error('상세페이지를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('서버와 통신을 실패했습니다.', error);
      }
    };

    getProductData();
  }, []);

  const params = useParams();
  const pageIdx = params.product_id ? productId.indexOf(params.product_id) : -1;

  useEffect(() => {
    if (pageIdx !== -1) {
      setPageIndex(pageIdx);
    }
  }, [pageIdx]);

  const resdate = (pageIndex) => {
    const date = productData.product[pageIndex].price.toString();
    const start = date.slice(0, 8);
    const end = date.slice(8);
    const result = `${start.slice(0, 4)}.${start.slice(4, 6)}.${start.slice(6)} ~ ${end.slice(
      0,
      4,
    )}.${end.slice(4, 6)}.${end.slice(6)}`;
    return result;
  };

  return (
    <>
      {productData && pageIndex !== null && pageIndex !== -1 && (
        <>
          <Container>
            <FestivalContainer>
              <Header />
              <FestivalWrap>
                <Frofile>
                  <PostCardUser
                    url={productData.product[pageIndex].author.image}
                    username={productData.product[pageIndex].author.username.slice(3)}
                    accountname={productData.product[pageIndex].author.accountname}
                  />
                  <AskBtn username={productData.product[pageIndex].author.username} />
                </Frofile>
                <FestivalImg src={productData.product[pageIndex]?.itemImage || ''} alt='행사' />
                <InfoContainer>
                  <FestivalTitle>
                    {productData.product[pageIndex]?.itemName.slice(3) ||
                      '행사명을 조회할 수 없습니다.'}
                  </FestivalTitle>
                  <FestivalInfo>행사 소개</FestivalInfo>
                  <FestivalDesc>
                    {productData.product[pageIndex]?.link || '행사 상세 설명을 조회할 수 없습니다.'}
                  </FestivalDesc>
                  <FestivalInfo>행사 기간</FestivalInfo>
                  <FestivalDesc>
                    {productData.product[pageIndex]
                      ? resdate(pageIndex)
                      : '행사 기간을 조회할 수 없습니다.'}
                  </FestivalDesc>
                </InfoContainer>
              </FestivalWrap>
            </FestivalContainer>
          </Container>
        </>
      )}
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
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
const FestivalWrap = styled.div`
  margin-top: 48px;
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
const FestivalTitle = styled.p`
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
  padding-left: 1.8rem;
  margin-bottom: 1.6rem;
  line-height: 2rem;
  color: #767676;
`;
