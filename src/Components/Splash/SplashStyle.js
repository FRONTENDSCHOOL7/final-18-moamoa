import styled from 'styled-components';
import { TempLoginButton } from './SplashLoginBtn';

export const StyledButton = styled(TempLoginButton)`
  width: 322px;
  height: 44px;
  border-radius: 44px;
  background-color: #fff;
  color: var(--buttonDisable);
  background-repeat: no-repeat;
  font-size: 10px;
  margin: 0 0 10px 34px;
  border: ${({ borderColor }) => `1px solid ${borderColor}`};
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-size: ${({ backgroundSize }) => backgroundSize};
  background-position: ${({ backgroundPosition }) => backgroundPosition};
  opacity: ${({ opacity }) => opacity};
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
  width: 390px;
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
    position: fixed;
    height: 740px;
    top: 0px;

    right: ${(props) => (props.visible === true ? '-195px' : '-600px')};
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
  }
`;

export const SVGgroup = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'visible',
})`
  display: flex;
  justify-content: space-between;
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
  img {
    width: 202px;
  }
  @media (min-width: 768px) {
    position: absolute;
    top: 20%;
    transition: 0.5s ease;
    left: ${(props) => (props.visible === true ? '25%' : '50%')};
    display: flex;
    transform: translate(-50%, -50%);
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
      top: 45%;
      left: -19%;
    }
    .firework-2 {
      top: 40%;
      left: 9%;
    }
    .firework-3 {
      top: 75%;
    }
    .firework-4 {
      top: 194%;
    }
    .firework-5 {
      top: 95%;
      left: 85%;
    }
    .firework-6 {
      top: 120%;
      left: 130%;
    }
    .firework-7 {
      top: 57%;
      left: 130%;
    }
    .firework-8 {
      top: 10%;
      left: 130%;
    }
    .firework-9 {
      top: 42%;
      left: 110%;
    }
    .firework-10 {
      top: 24%;
      left: 100%;
    }
    .firework-11 {
      top: 126%;
      left: 30%;
    }
    .firework-12 {
      top: 166%;
      left: 110%;
    }
    .firework-13 {
      top: 160%;
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
