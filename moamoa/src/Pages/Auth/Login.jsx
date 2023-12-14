import React from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../Hooks/Auth/useLogin';
import styled from 'styled-components';
import {
  LoginAndJoinContainer,
  Form,
  CommonInput,
  StyledErrorMsg,
  CommonBtn,
} from '../../Components/Common/AuthFormStyle';

const Login = () => {
  const { userData, updateUserData, submitLoginForm, loginFailMessage, loginWithTestAccount } =
    useLogin();

  const isFilled = userData.user.email !== '' && userData.user.password !== '';

  return (
    <LoginAndJoinContainer>
      <h1 id='loginTitle'>로그인</h1>
      <Form onSubmit={submitLoginForm}>
        <label htmlFor='emailInput' className='a11y-hidden'>
          이메일
        </label>
        <CommonInput
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
        <CommonInput
          id='passwordInput'
          type='password'
          placeholder='비밀번호를 입력해 주세요.'
          name='password'
          onChange={updateUserData}
          value={userData.user.password}
        />
        <StyledErrorMsg role='alert'>{loginFailMessage}</StyledErrorMsg>

        <LoginBtn type='submit' $isfilled={isFilled}>
          로그인
        </LoginBtn>
        <LoginTestAccountBtn type='button' onClick={loginWithTestAccount}>
          체험 계정으로 로그인
        </LoginTestAccountBtn>
        <LinkContainer>
          계정이 없으신가요?
          <Link to='/user/signUp' className='click-link'>
            계정을 만들어보세요!
          </Link>
        </LinkContainer>
      </Form>
    </LoginAndJoinContainer>
  );
};

const COLORS = {
  primary: '#87b7e4',
  darkgray: '#767676',
  // lightgray: '#dbdbdb', //명암비: 1.38 // https://sitero.co.kr/contrast
};

const LoginBtn = styled(CommonBtn)`
  margin-top: 160px;
`;

const LoginTestAccountBtn = styled(CommonBtn)`
  margin-top: 10px;
  word-spacing: 2px;
`;

const LinkContainer = styled.div`
  margin: 40px 0;
  font-size: 16px;
  word-spacing: 1.7px;

  .click-link {
    margin-left: 7px;

    &:hover {
      color: ${COLORS.primary};
    }
  }
`;

export default Login;
