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
} from '../../Components/Common/FormLoginAndJoin';

const Login = () => {
  const { userData, updateUserData, submitLoginForm, loginFailMessage } = useLogin();

  return (
    <LoginAndJoinContainer>
      <h1>로그인</h1>
      <Form onSubmit={submitLoginForm}>
        <CommonInput
          type='email'
          placeholder='이메일'
          name='email'
          onChange={updateUserData}
          value={userData.user.email}
        />
        <CommonInput
          type='password'
          placeholder='비밀번호'
          name='password'
          onChange={updateUserData}
          value={userData.user.password}
        />
        <StyledErrorMsg>{loginFailMessage}</StyledErrorMsg>
        <LoginBtn type='submit'>로그인</LoginBtn>
        <LinkContainer>
          <Link to='/user/signUp'>이메일로 회원가입</Link>
        </LinkContainer>
      </Form>
    </LoginAndJoinContainer>
  );
};

const LoginBtn = styled(CommonBtn)`
  margin: 26px 0 21px 0;
`;

const LinkContainer = styled.div`
  margin-bottom: 80px;
`;

export default Login;
