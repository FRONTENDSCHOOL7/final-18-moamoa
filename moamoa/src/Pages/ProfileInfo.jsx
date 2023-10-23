import React, { useState } from 'react';

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

      const { token } = json.user;
      // 로컬스토리지에 토큰 저장하기.
      localStorage.setItem('token', token);
      // console.log(json.user["_id"]); // user id 출력
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

export default function ProfileInfo() {
  const [profileImg, setProfileImg] = useState('');
  const [profileUsername, setProfileUsername] = useState('');
  const [profileAccountname, setProfileAccountname] = useState('');
  const [profileIntro, setProfileIntro] = useState('');

  const getMyinfo = async () => {
    const token = localStorage.getItem('token');
    // console.log(token);
    const res = await fetch('https://api.mandarin.weniv.co.kr/profile/account_test', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();
    console.log(json);
    setProfileImg(JSON.stringify(json.profile['image']));
    setProfileAccountname(JSON.stringify(json.profile['accountname']));
    setProfileUsername(JSON.stringify(json.profile['username']));
    setProfileIntro(JSON.stringify(json.profile['username']));
    // setKeyword(JSON.stringify(json))
    // console.log(json.user["_id"]); // user id 출력
    // console.log(json.user["username"]); // username 출력
    // console.log(json.user["follower"]);
  };

  return (
    <div>
      <LoginPage />
      <section>
        <h2>내 프로필</h2>
        <button type='button' onClick={getMyinfo}>
          내 정보 불러오기
        </button>
        {profileImg}
        <p>닉네임: {profileUsername}</p>
        <p>계정 id: {profileAccountname}</p>
      </section>
    </div>
  );
}
