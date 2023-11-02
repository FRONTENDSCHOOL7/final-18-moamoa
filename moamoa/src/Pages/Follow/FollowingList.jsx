import React, { useEffect, useState } from 'react';
import { Container } from '../../Components/Common/Container';
import HeaderFollowingList from '../../Components/Common/HeaderFollowingList';
import FollowingUser from '../../Components/Common/FollowingUser';
import userTokenAtom from '../../Recoil/userTokenAtom';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { FollowingAPI } from '../../API/Follow/FollowingAPI';
import Footer from '../../Components/Common/Footer';

export default function FollowingList() {
  const token = useRecoilValue(userTokenAtom);
  const { accountname } = useParams();
  const [following, setfollowing] = useState([]);
  const [setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const followerList = await FollowingAPI(token, accountname);
        setfollowing(followerList);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [token, setfollowing]);
  console.log(following);

  return (
    <div>
      <Container>
        <HeaderFollowingList />
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
        <Footer></Footer>
      </Container>
    </div>
  );
}
