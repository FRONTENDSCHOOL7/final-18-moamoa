import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import joinStateAtom from '../../Recoil/JoinState.jsx';

const Join = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountname, setAccountname] = useState('');
  const [imgSrc, setImgSrc] = useState('https://api.mandarin.weniv.co.kr/Ellipse.png');
  const [info, setInfo] = useState('');
  const [userType, setUserType] = useState('');

  const setJoin = useSetRecoilState(joinStateAtom);

  const join = async (joinData) => {
    const reqUrl = 'https://api.mandarin.weniv.co.kr/user';

    try {
      await axios({
        method: 'post',
        url: reqUrl,
        data: joinData,
      }).then((res) => {
        console.log('회원가입에 성공했습니다');
        console.log(res);
      });
    } catch (error) {
      console.error();
      alert('회원가입에 실패했습니다.');
    }
  };

  const inputUsername = (e) => {
    setUsername(e.target.value);
  };
  const inputEmail = (e) => {
    setEmail(e.target.value);
  };
  const inputPassword = (e) => {
    setPassword(e.target.value);
  };
  const inputAccountname = (e) => {
    setAccountname(e.target.value);
  };
  const inputInfo = (e) => {
    setInfo(e.target.value);
  };

  const uploadImage = async (imageFile) => {
    const baseUrl = 'https://api.mandarin.weniv.co.kr/';
    const reqUrl = baseUrl + 'image/uploadfile';
    //폼데이터 만들기
    const form = new FormData();
    //폼데이터에 값 추가하기
    //폼데이터.append("키","값");
    form.append('image', imageFile);
    //폼바디에 넣어서 요청하기
    const res = await fetch(reqUrl, {
      method: 'POST',
      body: form,
    });
    const json = await res.json();
    const imageUrl = baseUrl + json.filename;
    setImgSrc(imageUrl);
  };

  const handleChangeImage = (e) => {
    //파일 가져오기
    const imageFile = e.target.files[0];
    uploadImage(imageFile);
  };

  const submitJoin = (e) => {
    e.preventDefault();
    const joinData = {
      user: {
        username: username,
        email: email,
        password: password,
        accountname: accountname,
        intro: info,
        image: imgSrc,
      },
    };
    join(joinData);
    // 유효성 검사까지 통과했다는 가정하에 if 문 추가 예정....
    setJoin({ email, password, accountname, userType });
    // 프로필 페이지로 이동
    navigate('/product');
    // 실패했을 때 else문
  };

  const handleUserTypeBtn = (id) => {
    id === 'individaul' ? setUserType('individual') : setUserType('organization');
  };

  return (
    <>
      <button
        type='button'
        onClick={() => {
          navigate('/user/login');
        }}
      >
        로그인 페이지로 돌아가기
      </button>
      <form>
        <section>
          <h2>이메일로 회원가입</h2>
          <div>
            <button type='button' onClick={handleUserTypeBtn} id='individual'>
              일반 회원
            </button>
            <button type='button' onClick={handleUserTypeBtn} id='organization'>
              기업 및 기관
            </button>
          </div>
          {/* 시맨틱 태그로 변경 예정 */}
          <div>
            <label htmlFor='emailInput'>이메일</label>
            <input
              value={email}
              onChange={inputEmail}
              type='email'
              id='emailInput'
              name='email'
              placeholder='이메일 주소를 알려주세요.'
            />
          </div>
          <div>
            <label htmlFor='passwordInput'>비밀번호</label>
            <input
              value={password}
              onChange={inputPassword}
              type='password'
              name='password'
              id='passwordInput'
              placeholder='비밀번호를 설정해 주세요.'
            />
          </div>
          <button>다음</button>
        </section>

        <section>
          <h2>프로필 설정</h2>
          <p>나중에 언제든지 변경할 수 있습니다.</p>
          <label htmlFor='profileImg'>
            <img src={imgSrc} alt='' srcSet='' id='imagePre' />
          </label>
          <input
            type='file'
            id='profileImg'
            name='image'
            accept='image/*'
            className='ir'
            onChange={handleChangeImage}
          />
          <div>
            <label htmlFor='userNameInput'>사용자 이름</label>
            <input
              value={username}
              onChange={inputUsername}
              type='text'
              id='userNameInput'
              name='username'
              placeholder='2~10자 이내여야 합니다.'
            />
          </div>
          <div>
            <label htmlFor='userIdInput'>계정 ID</label>
            <input
              value={accountname}
              onChange={inputAccountname}
              type='text'
              id='userIdInput'
              name='accountname'
              placeholder='영문, 숫자, 특수문자(,), (_)만 사용 가능합니다.'
            />
          </div>
          <div>
            <label htmlFor='userIntroInput'>소개</label>
            <input
              value={info}
              onChange={inputInfo}
              type='text'
              id='userIntroInput'
              name='intro'
              placeholder='자신과 판매할 상품에 대해 소개해 주세요.'
            />
          </div>
          <button type='button' onClick={submitJoin}>
            감귤마켓 시작하기
          </button>
        </section>
      </form>
    </>
  );
};

export default Join;
