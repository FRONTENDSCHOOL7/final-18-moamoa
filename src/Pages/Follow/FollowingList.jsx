import React, { useEffect, useState } from 'react';
import { Container } from '../../Components/Common/Container';
import Header from '../../Components/Common/Header/Header';
import FollowingUser from '../../Components/Common/FollowingUser';
import userTokenAtom from '../../Recoil/userTokenAtom';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { FollowingPageAPI } from '../../API/Follow/FollowAPI';
import Footer from '../../Components/Common/Footer';
import { FollowingWrap } from './FollowStyle';

export default function FollowingList() {
  const token = useRecoilValue(userTokenAtom);
  const { accountname } = useParams();
  const [following, setfollowing] = useState([]);
  const [setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const followerList = await FollowingPageAPI(token, accountname);
        setfollowing(followerList);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [token, setfollowing]);

  return (
    <div>
      <Container>
        <Header type='follow' />
        <FollowingWrap>
          {following.map((item, index) => {
            const cleanedUserId = item.username.replace(/\[i\]|\[o\]/g, '');
            return (
              <FollowingUser
                key={index}
                src={item.image}
                userId={cleanedUserId}
                userText={item.intro}
                accountname={item.accountname}
              />
            );
          })}
        </FollowingWrap>
        <Footer></Footer>
      </Container>
    </div>
  );
}