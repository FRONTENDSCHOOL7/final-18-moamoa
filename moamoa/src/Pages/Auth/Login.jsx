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
  const {
    userData,
    updateUserData,
    submitLoginForm,
    loginFailMessage,
    loginWithTestAccount,
    // isTestAccount,
  } = useLogin();

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
        <LoginBtn type='submit'>로그인하기</LoginBtn>
        <CheckBoxContainer onClick={loginWithTestAccount}>
          <CheckBox
            type='checkbox'
            id='testAccount'
            name='testAccount'
            onClick={loginWithTestAccount}
          />
          <label htmlFor='testAccount'>체험하기</label>
        </CheckBoxContainer>
        <LinkContainer>
          <Link to='/user/signUp'>이메일로 회원가입하기</Link>
        </LinkContainer>
      </Form>
    </LoginAndJoinContainer>
  );
};

const CheckBoxContainer = styled.div`
  margin: 9px 0 21px 0;
  background-color: #cccccc;
  border-radius: 44px;
  font-weight: 700;
  padding: 11px;
  color: white;
  letter-spacing: -1px;
  cursor: pointer;

  label,
  input {
    cursor: pointer;
  }

  &:hover {
    background-color: #87b7e4;
  }
`;

const CheckBox = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: transparent;
`;

const LoginBtn = styled(CommonBtn)`
  margin-top: 21px;
  background-color: #cccccc;

  &:hover {
    background-color: #87b7e4;
  }
`;

const LinkContainer = styled.div`
  margin-bottom: 80px;
`;

export default Login;
