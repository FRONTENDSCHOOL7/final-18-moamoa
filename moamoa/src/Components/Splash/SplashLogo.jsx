import React from 'react';
import styled from 'styled-components';
import Logo from '../../Assets/images/Logo.png';
import fireworks from '../../Assets/images/fireworks.svg';
import Festival from '../../Assets/images/Festival.svg';
export default function SplashLogo() {
  return (
    <div>
      <SVGgroup>
        <div>
          <img src={Festival} className='blinkFestival' alt='' />
          <img src={fireworks} className='blinkfireworks' alt='' />
        </div>
        <img src={Logo} />
        <p className='logotext'>내 손 안의 안의 모든 축제!</p>
      </SVGgroup>
      <AnimationFireworks>
        <div className='firework-1'></div>
        <div className='firework-2'></div>
        <div className='firework-3'></div>
        <div className='firework-4'></div>
        <div className='firework-5'></div>
        <div className='firework-6'></div>
        <div className='firework-7'></div>
        <div className='firework-8'></div>
        <div className='firework-9'></div>
        <div className='firework-10'></div>
        <div className='firework-11'></div>
        <div className='firework-12'></div>
        <div className='firework-13'></div>
        <div className='firework-14'></div>
        <div className='firework-15'></div>
      </AnimationFireworks>
    </div>
  );
}
const SVGgroup = styled.div`
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
`;
const AnimationFireworks = styled.div`
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
    top: 19%;
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
