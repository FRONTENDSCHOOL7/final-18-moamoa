import styled from 'styled-components';
import { TempLoginButton } from './SplashLoginBtn';
export const BtnContainter = styled.div`
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  // transform: translateX(-4%);
  // @media (min-width: 1200px) {
  //   transform: translateX(-2%);

  // }
  @media (min-width: 768px) {
    gap: 15px;
  }
`;

export const StyledButton = styled(TempLoginButton)`
  width: 100%;
  height: 44px;
  border-radius: 44px;
  background-color: #fff;
  color: var(--buttonDisable);
  background-repeat: no-repeat;
  font-size: 1.2rem;
  // margin: 0 0 10px 34px;
  border: ${({ borderColor }) => `1px solid ${borderColor}`};
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-size: ${({ backgroundSize }) => backgroundSize};
  background-position: ${({ backgroundPosition }) => backgroundPosition};
  opacity: ${({ opacity }) => opacity};
  @media (min-width: 768px) {
    width: 80%;
    font-size: 14px;
    // margin: 0 0 15px 34px;
  }
`;

export const Modal = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'visible',
})`
  transform: translateX(-50%);
  position: fixed;
  bottom: ${(props) => (props.visible === true ? '0' : '-300px')};
  visibility: ${(props) => (props.visible === true ? 'visible' : 'hidden')};
  transition: 0.5s ease;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 400px;
  padding: 56px 0 20px;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  box-shadow: 2px 4px 14px 6px rgba(0, 0, 0, 0.5);
  a,
  .joinGuide {
    margin: 0 auto;
    padding-top: 15px;
    color: var(--buttonDisable);
    font-size: 12px;
  }
  a:hover {
    font-size: 13px;
  }
  @media (min-width: 768px) {
    width: 50%;
    position: fixed;
    height: 100%;
    top: 0px;
    right: ${(props) => (props.visible === true ? '-25%' : '-50%')};
    padding: 100px 0 20px;
    a {
      padding-top: 0;
    }
    .joinGuide {
      padding-top: 0;
      margin-block: 50px 20px;
      color: var(--buttonDisable);
      font-size: 12px;
    }
  }
`;
export const LoginH1 = styled.h1`
  @media (max-width: 767px) {
    display: none;
  }
  @media (min-width: 768px) {
    font-size: 24px;
    margin: 0 auto;
    padding-bottom: 50px;
    transform: translateX(-1%);
  }
`;

export const SVGgroup = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'visible',
})`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  gap: 5px;
  .blinkFestival {
    margin-top: 150px;
    width: 109px;
    height: 13px;
    transform: translateX(-40%);
  }
  .blinkfireworks {
    transform: translate(57%, 20%);
    width: 57px;
    height: 57px;
  }
  .logotext {
    color: #fff;
    margin-top: 8px;
    font-size: 15px;
    letter-spacing: 1px;
    font-weight: 300;
  }
  img {
    width: 202px;
  }
  @media (min-width: 768px) {
    .blinkFestival {
      margin-top: 0px;
    }
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 29%;
    left: ${(props) => (props.visible === true ? '-25%' : '0%')};
    transition: 0.5s ease;
  }
`;

export const AnimationFireworks = styled.div`
  [class^='firework-'] {
    z-index: 100;
    position: absolute;
    width: 0.15rem;
    height: 0.15rem;
    border-radius: 50%;
  }
  .firework-1 {
    animation: firework-sm 1.2s both infinite;
    animation-delay: 1.1s;
    top: 15%;
    left: 15%;
  }
  .firework-2 {
    animation: firework-lg 1.2s both infinite;
    animation-delay: 0.8s;
    top: 10%;
    left: 19%;
  }
  .firework-3 {
    animation: firework-lg 1.2s both infinite;
    animation-delay: 0.3s;
    top: 5%;
    left: 27%;
  }
  .firework-4 {
    animation: firework-md 1.2s both infinite;
    animation-delay: 1.3s;
    top: 14%;
    left: 31%;
  }
  .firework-5 {
    animation: firework-md 1.2s both infinite;
    animation-delay: 1.4s;
    top: 25%;
    left: 20%;
  }
  .firework-6 {
    animation: firework-md 1.2s both infinite;
    animation-delay: 0.4s;
    top: 16%;
    left: 82%;
  }
  .firework-7 {
    animation: firework-lg 1.2s both infinite;
    animation-delay: 0.2s;
    top: 27%;
    left: 75%;
  }
  .firework-8 {
    animation: firework-sm 1.2s both infinite;
    animation-delay: 0.2s;
    top: 10%;
    left: 79%;
  }
  .firework-9 {
    animation: firework-md 1.4s both infinite;
    animation-delay: 0.6s;
    top: 12%;
    left: 59%;
  }
  .firework-10 {
    animation: firework-lg 1.5s both infinite;
    animation-delay: 0.8s;
    top: 14%;
    left: 49%;
  }
  .firework-11 {
    animation: firework-lg 1.5s both infinite;
    animation-delay: 0.8s;
    top: 4%;
    left: 49%;
  }
  .firework-12 {
    animation: firework-md 1.3s both infinite;
    animation-delay: 0.8s;
    top: 33%;
    left: 40%;
  }
  .firework-13 {
    animation: firework-lg 1.1s both infinite;
    animation-delay: 0.8s;
    top: 30%;
    left: 58%;
  }
  @media (min-width: 768px) {
    .firework-1 {
      top: 100%;
      left: 35%;
    }
    .firework-2 {
      top: 90%;
      left: 60%;
    }
    .firework-3 {
      top: 70%;
      left: 30%;
    }
    .firework-4 {
      top: 65%;
      left: 70%;
    }
    .firework-5 {
      top: 40%;
      left: 50%;
    }
    .firework-6 {
      top: 45%;
      left: 37%;
    }
    .firework-7 {
      top: 120%;
      left: 50%;
    }
    .firework-8 {
      top: 120%;
      left: 56%;
    }
    .firework-9 {
      top: 110%;
      left: 40%;
    }
    .firework-10 {
      top: 10%;
      left: 60%;
    }
    .firework-11 {
      top: 45%;
      left: 70%;
    }
    .firework-12 {
      top: 120%;
      left: 65%;
    }
    .firework-13 {
      top: 40%;
      left: 40%;
    }
  }

  @keyframes firework-sm {
    0%,
    100% {
      opacity: 0;
    }
    10%,
    70% {
      opacity: 1;
    }
    100% {
      box-shadow:
        -2rem 0rem 0 #c683d7,
        2rem 0rem 0 #c683d7,
        0rem -2rem 0 #c683d7,
        0rem 2rem 0 #c683d7,
        1.3rem -1.3rem 0 #c683d7,
        1.3rem 1.3rem 0 #c683d7,
        -1.3rem -1.3rem 0 #c683d7,
        -1.3rem 1.3rem 0 #c683d7;
    }
  }
  @keyframes firework-md {
    0%,
    100% {
      opacity: 0;
    }
    10%,
    70% {
      opacity: 1;
    }
    100% {
      box-shadow:
        -3rem 0rem 0 #ff6969,
        3rem 0rem 0 #ff6969,
        0rem -3rem 0 #ff6969,
        0rem 3rem 0 #ff6969,
        2rem -2rem 0 #ff6969,
        2rem 2rem 0 #ff6969,
        -2rem -2rem 0 #ff6969,
        -2rem 2rem 0 #ff6969;
    }
  }
  @keyframes firework-lg {
    0%,
    100% {
      opacity: 0;
    }
    10%,
    70% {
      opacity: 1;
    }
    100% {
      box-shadow:
        -4rem 0rem 0 #609966,
        4rem 0rem 0 #609966,
        0rem -4rem 0 #609966,
        0rem 4rem 0 #609966,
        3rem -3rem 0 #609966,
        3rem 3rem 0 #609966,
        -3rem -3rem 0 #609966,
        -3rem 3rem 0 #609966;
    }
  }
`;
