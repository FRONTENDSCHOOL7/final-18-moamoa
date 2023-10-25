import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from '../Assets/images/Logo.png';
import Bluemoa from '../Assets/images/Bluemoa.png';
import kakao from '../Assets/images/kakao.png';
import google from '../Assets/images/google.png';
import naver from '../Assets/images/naver.png';
import fireworks from '../Assets/images/fireworks.svg';
import Festival from '../Assets/images/Festival.svg';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const MoaMoaBox = styled.div`
  background-color: #2e2c39;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 390px;
  height: 100vh;
  margin: 0 auto;
  p {
    color: #ffffff;
    font-size: 18px;
  }
  overflow: hidden;
  position: relative;
`;

const SVGgroup = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  text-align: center;
  /* background-color: purple; */
  gap: 5px;

  .blinkFestival {
    /* background-color: red; */
    margin-top: 150px;
    width: 109px;
    height: 13px;
    animation: blink 3s;
    transform: translateX(-55%);
  }
  .blinkfireworks {
    transform: translateX(95%);
    justify-content: center;
    /* background-color: blue; */
    width: 57px;
    height: 57px;
  }
  img {
    width: 250px;
    /* margin-top: 150px; */
    /* background-color: yellow; */
  }
  @keyframes blink {
    0% {
      opacity: 0.2; /* 초기에 투명 */
    }
    10% {
      opacity: 0.1; /* 초기에 투명 */
    }
    20% {
      opacity: 0.2; /* 초기에 투명 */
    }
    30% {
      opacity: 0.15; /* 초기에 투명 */
    }
    32% {
      opacity: 0.8; /* 초기에 투명 */
    }
    50% {
      opacity: 0.1; /* 50% 지점에서 불투명 */
    }
    70% {
      opacity: 0.04; /* 50% 지점에서 불투명 */
    }
    85% {
      opacity: 0.1; /* 50% 지점에서 불투명 */
    }
    100% {
      opacity: 1; /* 100% 지점에서 다시 투명 */
    }
  }
`;
const Copyright = styled.p`
  margin-top: 370px;

  color: #ffffff;
  font-size: 14px;
`;
const LoginModal = styled.div`
  position: fixed;
  bottom: ${(props) => (props.visible ? '0' : '-300px')};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  transition: 0.5s ease;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 390px;
  height: 400px;
  padding: 56px 0 20px;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  box-shadow: 2px 4px 14px 6px rgba(0, 0, 0, 0.5);

  p,
  a {
    margin: 0 auto;
    padding-top: 15px;
    color: #767676;
    font-size: 12px;
  }
  p {
    padding-top: 15px;
    margin: 0 auto;
    font-weight: light;
  }
`;

const tempLoginButton = styled.button`
  margin: 0 auto;
  width: 322px;
  height: 44px;
  border-radius: 44px;
  background-color: #fff;
  color: #767676;
  cursor: pointer;
  background-repeat: no-repeat;
`;
const BlueMoa = styled(tempLoginButton)`
  border: 1px solid #017dc2;
  background-image: url(${Bluemoa});
  background-size: 30px;
  background-position: 14px 2px;
`;
const Kakao = styled(tempLoginButton)`
  border: 1px solid #f2c94c;
  background-image: url(${kakao});
  background-size: 24px;
  background-position: 16px 9px;
`;
const Google = styled(tempLoginButton)`
  border: 1px solid #767676;
  background-image: url(${google});
  background-size: 30px;
  background-position: 14px 6px;
`;
const Naver = styled(tempLoginButton)`
  border: 1px solid #25b022;
  background-image: url(${naver});
  background-size: 30px;
  background-position: 14px 6px;
`;
export default function Landing() {
  const [modalActive, setModalActive] = useState(false);
  useEffect(() => {
    // 3초 뒤에 모달을 자동으로 활성화하도록 설정합니다.
    const modalTimeout = setTimeout(() => {
      setModalActive(true);
    }, 2000);

    // 컴포넌트가 언마운트되면 타임아웃을 클리어합니다.
    return () => clearTimeout(modalTimeout);
  }, []);

  return (
    <Container>
      <MoaMoaBox>
        <SVGgroup>
          <div>
            <img src={Festival} className='blinkFestival' alt='' />
            <img src={fireworks} className='blinkfireworks' alt='' />
          </div>
          <img src={Logo} alt='' />
          <p className='logotext'>내 손 안의 안의 모든 축제!</p>
        </SVGgroup>
        <Copyright>@copyright moamoa corp</Copyright>
        <LoginModal visible={modalActive}>
          <Link to='/user/login'>
            <BlueMoa>이메일 계정으로 로그인</BlueMoa>
          </Link>
          <Kakao>카카오톡 계정으로 로그인</Kakao>
          <Google>구글 계정으로 로그인</Google>
          <Naver>네이버 계정으로 로그인</Naver>
          <p>아직 회원이 아니신가요?</p>
          <a href='#'>이메일로 회원가입</a>
        </LoginModal>
      </MoaMoaBox>
    </Container>
  );
}
