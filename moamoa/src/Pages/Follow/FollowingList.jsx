import React, { useState } from 'react';
import { Container } from '../../Components/Common/Container';
import HeaderFollowingList from '../../Components/Common/HeaderFollowingList';
import FollowingUser from '../../Components/Common/FollowingUser';
import followImgExample1 from '../../Assets/images/followImg/woman2.jpg';
import followImgExample2 from '../../Assets/images/followImg/human.jpg';
import followImgExample3 from '../../Assets/images/followImg/dog.jpg';
import Footer from '../../Components/Common/Footer';
export default function FollowingList() {
  const [isFollowed, setIsFollowed] = useState(false);
  const handleButtonClick = () => {
    setIsFollowed(!isFollowed);
    console.log(isFollowed);
  };
  return (
    <div>
      <Container>
        <HeaderFollowingList />
        <FollowingUser
          image={followImgExample1}
          userId='애월읍 한라봉 최고 맛집'
          userText='정성을 다해 농사짓는 한라봉'
          onClickHandler={handleButtonClick}
        ></FollowingUser>
        <FollowingUser
          image={followImgExample2}
          userId='애월읍 한라봉 최고 맛집'
          userText='옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여, 뿐이다. 이상의 청춘의 뼈 따뜻한 그들의 그와 약동하다. 대고, 못할 넣는 풍부하게 뛰노는 인생의 힘있다.'
        ></FollowingUser>
        <FollowingUser
          image={followImgExample3}
          userId='애월읍 한라봉 최고 맛집'
          userText='정성을 다해 농사짓는 한라봉'
        ></FollowingUser>
        <Footer></Footer>
      </Container>
    </div>
  );
}
