import React, { useEffect, useState } from 'react';
import { Container } from '../../Components/Common/Container';
import FollowUser from '../../Components/Common/FollowUser';
import HeaderFollwerList from '../../Components/Common/HeaderFollwerList';
import Footer from '../../Components/Common/Footer';
import userTokenAtom from '../../Recoil/userTokenAtom';
import { FollowerAPI } from '../../API/Follow/FollowerAPI';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';

export default function FollowerList() {
  const token = useRecoilValue(userTokenAtom);
  const { accountname } = useParams();

  const [follower, setfollower] = useState([]);
  const [setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const followerList = await FollowerAPI(token, accountname);
        setfollower(followerList);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [token, setfollower]);
  console.log(follower);

  return (
    <div>
      <Container>
        <HeaderFollwerList />
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

        <Footer></Footer>
      </Container>
    </div>
  );
}
