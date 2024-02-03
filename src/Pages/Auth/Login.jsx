import React from 'react';
import useLogin from '../../Hooks/Auth/useLogin';

import {
  TitleH1,
  Form,
  Input,
  LongBtn,
  AlertParagraph,
  LoginBtnsContainer,
  LinkToSignUp,
  ProfileSetBg,
  Container,
  ProfileSetContainer,
} from '../Auth/AuthStyle';

import { TabletSplash } from './TabletSplash';

const Login = () => {
  const { userData, updateUserData, submitLoginForm, loginFailMessage, loginWithTestAccount } =
    useLogin();

  const isFilled = userData.user.email !== '' && userData.user.password !== '';

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
      <TabletSplash />
    </Container>
  );
};

export default Login;
