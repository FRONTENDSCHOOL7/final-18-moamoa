import React from 'react';
import Logo from '../../Assets/images/Logo.png';
import fireworks from '../../Assets/images/fireworks.svg';
import Festival from '../../Assets/images/Festival.svg';
import { SVGgroup, AnimationFireworks } from './SplashStyle';
import { useRecoilValue } from 'recoil';
import { modalActiveState } from '../../Recoil/modalActiveState ';
export default function SplashLogo() {
  const modalActive = useRecoilValue(modalActiveState);
  return (
    <div>
      <SVGgroup visible={modalActive}>
        <div>
          <img src={Festival} className='blinkFestival' alt='' />
          <img src={fireworks} className='blinkfireworks' alt='' />
        </div>
        <img src={Logo} alt='모아모아 로고' />
        <p className='logotext'>내 손 안의 안의 모든 축제!</p>
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
      </SVGgroup>
    </div>
  );
}
