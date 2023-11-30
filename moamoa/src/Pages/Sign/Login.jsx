import React from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../Hooks/Sign/useLogin';
import styled from 'styled-components';
import {
  LoginAndJoinContainer,
  Form,
  CommonInput,
  StyledErrorMsg,
  CommonBtn,
} from '../../Components/Common/FormLoginAndJoin';

const LoginPage = () => {
  const { userData, handleError, handleInputChange, handleFormSubmit, errorMsg, userErrorMessage } =
    useLogin();

  return (
    <LoginAndJoinContainer>
      <h1>로그인</h1>
      <Form onSubmit={handleFormSubmit}>
        <CommonInput
          type='email'
          placeholder='이메일'
          name='email'
          onChange={handleInputChange}
          value={userData.user.email}
          required
        />
        {!userData.user.email && !userData.user.password && (
          <StyledErrorMsg>{errorMsg}</StyledErrorMsg>
        )}
        <CommonInput
          type='password'
          placeholder='비밀번호'
          name='password'
          onChange={handleInputChange}
          value={userData.user.password}
          required
        />
        {userData.user.email && !userData.user.password && (
          <StyledErrorMsg>{errorMsg}</StyledErrorMsg>
        )}
        {userData.user.email && userData.user.password && (
          <StyledErrorMsg>{userErrorMessage}</StyledErrorMsg>
        )}
        <LoginBtn
          type='submit'
          onClick={handleError}
          disabled={!userData.user.email || !userData.user.password}
        >
          로그인
        </LoginBtn>
        <LinkContainer>
          <Link to='/user/join'>이메일로 회원가입</Link>
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

export default LoginPage;
