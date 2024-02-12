import React, { useEffect, useState } from 'react';
import { Container } from '../../Components/Common/Container';
import FollowUser from '../../Components/Follow/FollowUser';
import Header from '../../Components/Header/Header';
import NavBar from '../../Components/Common/NavBar';
import { FollowerPageAPI } from '../../API/Follow/FollowAPI';
import { useParams } from 'react-router-dom';
import { FollowingWrap } from './FollowStyle';

export default function FollowerList() {
  const { accountname } = useParams();

  const [follower, setfollower] = useState([]);
  const [setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const followerList = await FollowerPageAPI(accountname);
        setfollower(followerList);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [accountname, setfollower]);

  return (
    <div>
      <Container>
        <Header type='follow' />
        <FollowingWrap>
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
        </FollowingWrap>

        <NavBar></NavBar>
      </Container>
    </div>
  );
}