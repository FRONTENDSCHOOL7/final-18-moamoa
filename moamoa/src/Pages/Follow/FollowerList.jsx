/* eslint-disabled */
import React from 'react';

import { Container } from '../../Components/Common/Container';
import FollowUser from '../../Components/Common/FollowUser';
import followImgExample1 from '../../Assets/images/followImg/fog.jpg';
import followImgExample2 from '../../Assets/images/followImg/child.jpg';
import followImgExample3 from '../../Assets/images/followImg/happy.jpg';
import followImgExample4 from '../../Assets/images/followImg/concept.jpg';
import followImgExample5 from '../../Assets/images/followImg/water.jpg';
import followImgExample6 from '../../Assets/images/followImg/woman.jpg';
import HeaderFollwerList from '../../Components/Common/HeaderFollwerList';
import Footer from '../../Components/Common/Footer';

export default function FollowerList() {
  return (
    <div>
      <Container>
        <HeaderFollwerList />
        <FollowUser
          image={followImgExample1}
          userId='정성을 다해 농사짓는 한라봉'
          userText='애월읍 한라봉 최고 맛집'
        ></FollowUser>
        <FollowUser
          image={followImgExample2}
          userId='정성을 다해 농사짓는 한라봉'
          userText='애월읍 한라봉 최고 맛집'
        ></FollowUser>
        <FollowUser
          image={followImgExample3}
          userId='정성을 다해 농사짓는 한라봉'
          userText='30년 노하우로 정성스럽게 농사지은 노지...'
        ></FollowUser>
        <FollowUser
          image={followImgExample4}
          userId='정성을 다해 농사짓는 한라봉'
          userText='애월읍 한라봉 최고 맛집'
        ></FollowUser>
        <FollowUser
          image={followImgExample5}
          userId='정성을 다해 농사짓는 한라봉'
          userText='애월읍 한라봉 최고 맛집'
        ></FollowUser>
        <FollowUser
          image={followImgExample6}
          userId='정성을 다해 농사짓는 한라봉'
          userText='애월읍 한라봉 최고 맛집'
        ></FollowUser>
        <FollowUser
          image={followImgExample1}
          userId='정성을 다해 농사짓는 한라봉'
          userText='애월읍 한라봉 최고 맛집'
        ></FollowUser>
        <Footer></Footer>
      </Container>
    </div>
  );
}
