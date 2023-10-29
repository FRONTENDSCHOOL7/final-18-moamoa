import React from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../Hooks/Sign/useLogin';

const LoginPage = () => {
  const {
    userInput,
    handleError,
    handleInputChange,
    handleFormSubmit,
    errorMsg,
    userErrorMessage,
  } = useLogin();

  return (
    <>
      <h1>로그인</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type='email'
          placeholder='이메일'
          name='email'
          onChange={handleInputChange}
          value={userInput.user.email}
          required
        />
        {!userInput.user.email && !userInput.user.password && errorMsg}
        <input
          type='password'
          placeholder='비밀번호'
          name='password'
          onChange={handleInputChange}
          value={userInput.user.password}
          required
        />
        {userInput.user.email && !userInput.user.password && errorMsg}
        {userInput.user.email && userInput.user.password && userErrorMessage}
        <button
          type='submit'
          disabled={!userInput.user.email || !userInput.user.password}
          onClick={handleError}
        >
          로그인
        </button>
        <Link to='/user/join'>이메일로 회원가입</Link>
      </form>
    </>
  );
};

export default LoginPage;
