import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { productList } from '../../API/Product/ProductAPI'
import { productPeriod } from '../../Pages/Product/period'
import { Link } from 'react-router-dom';

export default function RecommendPlace() {
  const accountName = 'moa_festa';
  const [place, setPlace] = useState([]);
  const [randomPlaceList, setRandomPlaceList] = useState([]);
  const [recommendPlaceList, setRecommendPlaceList] = useState([]);
  
  useEffect(()=> {
    const fetchProductList = async () => {
      const data = await productList(accountName);
      setPlace(data.product);
    }
    fetchProductList();
  },[accountName])

  useEffect(() => {
    const randomPlace = Math.floor(Math.random() * place.length);
    if (randomPlaceList.indexOf(randomPlace) === -1) {
      setRandomPlaceList((prevList) => [...prevList, randomPlace]);
    }
  }, [place, randomPlaceList]);

  useEffect(() => {
    if (randomPlaceList.length >= 3) {
      const index = randomPlaceList.slice(1, 4);
      const places = index.map((i) => place[i]);
      setRecommendPlaceList(places);
    }
  }, [randomPlaceList, place]);

  return (
    <>
      {recommendPlaceList.length === 3 ? 
      <PlaceCont>
        <Link to={`/product/list`}>
          <PlaceBtn>
            요즘 🔥HOT🔥한 장소는?
          </PlaceBtn>
        </Link>
        <Place>
          {recommendPlaceList.map((item)=>{
            const date = productPeriod(item);
            return <ul key={item.id}>
              <li>
                <Link to={`/product/detail/${item.id}`}>
                  <PlaceItem>
                    <PlaceImg src={item.itemImage} alt={item.itemName.slice(3)} />
                    <PlaceInfo>
                      <PlaceName>{item.itemName.slice(3)}</PlaceName>
                      <PlacePeriod>운영 기간</PlacePeriod>
                      <PlacePeriod>{date}</PlacePeriod>
                    </PlaceInfo>
                  </PlaceItem>
                </Link>
              </li>
            </ul>
          })}
        </Place> 
      </PlaceCont>
      : null}
    </>
  )
}

const PlaceCont = styled.div`
  display: none;
  @media (min-width: 1200px) {
    max-width: 480px;
    height: 340px;
    display: block;
    overflow: hidden;
    margin-bottom: 100px;
  }
`

const PlaceBtn = styled.button`
  width: 308px;
  height: 45px;
  margin: 0 0 20px 0 ;
  background-color: var(--buttonActive);
  border-radius: 45px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
`

const Place = styled.div`
  max-width: 480px;
`

const PlaceItem = styled.div`
  display: flex;
  margin-bottom: 20px;
`
const PlaceImg = styled.img`
  width: 114px;
  height: 74px;
  aspect-ratio: 358/228;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 10px;
`

const PlaceInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const PlaceName = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const PlacePeriod = styled.p`
  font-size: 13px;
  line-height: 16px;
`