import React, { useEffect, useState } from 'react';
import { Container } from '../../Components/Common/Container';
import FollowUser from '../../Components/Common/FollowUser';
import Header from '../../Components/Common/Header';
import Footer from '../../Components/Common/Footer';
import userTokenAtom from '../../Recoil/userTokenAtom';
import { FollowerPageAPI } from '../../API/Follow/FollowAPI';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

export default function FollowerList() {
  const token = useRecoilValue(userTokenAtom);
  const { accountname } = useParams();

  const [follower, setfollower] = useState([]);
  const [setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const followerList = await FollowerPageAPI(token, accountname);
        setfollower(followerList);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [token, setfollower]);

  return (
    <div>
      <Container>
        <Header type='follow' />
        <FollowerWrap>
          {follower.map((item, index) => {
            const cleanedUserId = item.username.replace(/\[i\]|\[o\]/g, '');
            return (
              <FollowUser
                key={index}
                src={item.image}
                userId={cleanedUserId}
                userText={item.intro}
                accountname={item.accountname}
              />
            );
          })}
        </FollowerWrap>

        <Footer></Footer>
      </Container>
    </div>
  );
}

const FollowerWrap = styled.div`
  margin-top: 48px;
`;
