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
    animation: left 3s;
    margin-top: 150px;
    width: 109px;
    height: 13px;
    transform: translateX(-38%);
  }
  .blinkfireworks {
    transform: translate(57%, 20%);
    animation: up 3s;
    width: 57px;
    height: 57px;
  }
  img {
    width: 202px;
  }
  @keyframes left {
    0% {
      transform: translateX(100px);
      opacity: 0;
    }
    10% {
      opacity: 0.1;
    }
    20% {
      opacity: 0.2;
    }
    30% {
      opacity: 0.3;
    }
    40% {
      opacity: 0.4;
    }
    50% {
      opacity: 0.5;
    }
    60% {
      opacity: 0.6;
    }
    70% {
      opacity: 0.7;
    }
    80% {
      opacity: 0.8;
    }
    90% {
      opacity: 0.9;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes up {
    0% {
      opacity: 0;
      width: 1px;
      transform: translateY(300px);
    }

    0% {
      opacity: 0;
    }
    10% {
      opacity: 0.1;
    }
    20% {
      opacity: 0.2;
    }
    30% {
      opacity: 0.3;
    }
    40% {
      opacity: 0.4;
    }
    50% {
      opacity: 0.5;
    }
    60% {
      opacity: 0.6;
    }
    70% {
      opacity: 0.7;
    }
    80% {
      opacity: 0.8;
    }
    90% {
      opacity: 0.9;
    }
    100% {
      opacity: 1;
    }
  }
`;
