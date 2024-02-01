import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import accountNameAtom from '../../Recoil/accountNameAtom'
import { FollowingPageAPI } from '../../API/Follow/FollowAPI'
import monomoa from '../../Assets/images/mono_moa.png'

export default function Myfollowings() {

  const accountName = useRecoilValue(accountNameAtom);
  const [followingData, setFollowingData] = useState();

  useEffect(()=>{

    const getFollowingData = async () => {
      try {
        const data = await FollowingPageAPI(accountName);
        await setFollowingData(data);
      } catch (error) {
        console.error(error);
      }
    };

    getFollowingData()
    
  },[accountName]);


  console.log(followingData);

  return (
    <>
      <Link to={`/profile/${accountName}/following`}>
        <MyFollowingBtn>
          My Followings
        </MyFollowingBtn>
      </Link>
      {followingData && followingData.length !== 0 ?
      <MyFollowingCont>

        {followingData.map((item)=>{
          return (
          <ul key={item._id}>
              <li>
                <Link to={`/profile/${item.accountname}`}>
                  <UserCont>
                    <FrofileImg src={item.image} alt='팔로잉유저'/>
                    <Info>
                      <UserName>{item.username.slice(3)}</UserName>
                      <Intro>{item.intro}</Intro>
                    </Info>
                  </UserCont>
                </Link>
              </li>
            </ul>
          )
        })}
      </MyFollowingCont> 
      : <Nonfollowigns>
          <Imgcont>
            <MonoImg src={monomoa} alt="모아모아 캐릭터" />
            <Desc>아직 following 중인 사용자가 없어요🥲</Desc>
          </Imgcont>
        </Nonfollowigns> }
    </>
  )
}

const MyFollowingCont = styled.div`
  display: none;
  @media (min-width: 1200px) {
    max-width: 480px;
    height: 100%;
    display: block;
    overflow: hidden;
    margin-bottom: 100px;
  }
`

const MyFollowingBtn = styled.button`
  width: 308px;
  height: 45px;
  margin: 0 0 20px 0 ;
  background-color: var(--buttonActive);
  border-radius: 45px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
`
const UserCont = styled.div`
  display: flex;
  margin-bottom: 14px;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const FrofileImg = styled.img`
  width: 4.2rem;
  height: 4.2rem;
  object-fit: cover;
  border-radius: 100%;
  margin-right: 10px;
`

const UserName = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`

const Intro = styled.p`
  width: 220px;
  font-size: 13px;
  line-height: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Nonfollowigns = styled.div`
  font-size: 16px;
  color: #767676;
  text-align: center;
`

const Imgcont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const MonoImg =styled.img`
  width: 8rem;
  margin: auto;
  padding-right: 2.5rem;
`;

const Desc = styled.p`
  font-size: 1..2rem;
  padding: 0 1.8rem;
  margin-top: 3rem;
  line-height: 2rem;
  color: #767676;
`;