import React from 'react';
import useLogin from '../../Hooks/Auth/useLogin';
import { useRecoilValue } from 'recoil';
import { modalActiveState } from '../../Recoil/modalActiveState ';import Logo from '../../Assets/images/Logo.png';
import fireworks from '../../Assets/images/fireworks.svg';
import Festival from '../../Assets/images/Festival.svg';

import {
  Container,
  SplashBg,
  ProfileSetBg,
  ProfileSetContainer,
  SVGgroup,
  Copyright,
  AnimationFireworks,
  TitleH1,
  Form,
  Input,
  LongBtn,
  AlertParagraph,
  LoginBtnsContainer,
  LinkToSignUp
} from '../Auth/AuthStyle';

const Login = () => {
  const { userData, updateUserData, submitLoginForm, loginFailMessage, loginWithTestAccount } =
    useLogin();
  const isFilled = userData.user.email !== '' && userData.user.password !== '';
  const modalActive = useRecoilValue(modalActiveState);

  return (
    <Container>
      <ProfileSetBg>
        <ProfileSetContainer>
          <TitleH1 id='loginTitle'>로그인</TitleH1>
          <Form onSubmit={submitLoginForm}>
            <label htmlFor='emailInput' className='a11y-hidden'>
              이메일
            </label>
            <Input
              id='emailInput'
              type='email'
              placeholder='이메일을 입력해 주세요.'
              name='email'
              onChange={updateUserData}
              value={userData.user.email}
            />
            <label htmlFor='passwordInput' className='a11y-hidden'>
              비밀번호
            </label>
            <Input
              id='passwordInput'
              type='password'
              placeholder='비밀번호를 입력해 주세요.'
              name='password'
              onChange={updateUserData}
              value={userData.user.password}
            />
            <AlertParagraph role='alert'>{loginFailMessage}</AlertParagraph>
            <LoginBtnsContainer>
              <LongBtn type='submit' $isfilled={isFilled}>
                로그인
              </LongBtn>
              <LongBtn type='button' onClick={loginWithTestAccount}>
                체험 계정으로 로그인
              </LongBtn>
            </LoginBtnsContainer>
            <LinkToSignUp to='/user/signUp'>계정이 없으신가요? 계정을 만들어보세요!</LinkToSignUp>
          </Form>
        </ProfileSetContainer>
      </ProfileSetBg>
      <SplashBg>
            <SVGgroup visible={modalActive}>
              <div>
                <img src={Festival} className='blinkFestival' alt='' />
                <img src={fireworks} className='blinkfireworks' alt='' />
              </div>
              <img src={Logo} alt='모아모아 로고' />
              <p className='logotext'>내 손 안의 모든 축제! 모아모아</p>
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

      <Copyright visible={modalActive}>@copyright moamoa corp</Copyright>
      </SplashBg>
    </Container>
  );
};

export default Login;
