import React, { useState } from 'react';

// 토큰을 받기위한 로그인 기능 구현
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (email, password) => {
    const baseUrl = 'https://api.mandarin.weniv.co.kr';
    const reqPath = '/user/login';
    const reqUrl = baseUrl + reqPath;

    const loginData = {
      user: {
        email,
        password,
      },
    };
    try {
      // 로그인해서 token꺼내기~!
      const res = await fetch(reqUrl, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const json = await res.json();
      // console.log(json);
      if (res.ok) {
        // or another success condition check
        // ... 토큰 저장 등의 작업 ...
        const { token, accountname } = json.user;
        console.log(token);
        // 로컬스토리지에 토큰 저장하기.
        localStorage.setItem('token', token);
        localStorage.setItem('accountname', accountname);
      } else {
        alert('로그인에 실패했습니다!');
      }
    } catch (error) {
      alert('로그인에 실패했습니다!');
    }
  };

  const inputEmail = (e) => {
    setEmail(e.target.value);
  };
  const inputPassword = (e) => {
    setPassword(e.target.value);
  };
  const submitLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      <h1>로그인</h1>
      <section>
        <h2>이메일, 비밀번호 입력하는곳</h2>
        <form onSubmit={submitLogin}>
          <input type='text' placeholder='이메일입력' onChange={inputEmail} value={email} />
          <input type='text' placeholder='비밀번호입력' onChange={inputPassword} value={password} />
          <button type='submit'>로그인</button>
        </form>
      </section>
    </>
  );
}

export default LoginPage;
