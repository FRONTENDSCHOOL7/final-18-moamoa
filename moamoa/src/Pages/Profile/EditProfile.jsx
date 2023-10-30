/*
  설명: 내 프로필 수정 페이지
  작성자: 이해지
  최초 작성 날짜: 2023.10.24
  마지막 수정 날까: 2023.10.30
*/

import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import userToken from '../../Recoil/userTokenAtom'; //파일경로 변경완료

function EditProfile() {
  //기존 사용자의 정보를 가져오기
  const token = useRecoilValue(userToken);
  const navigate = useNavigate();

  const [initUsername, setInitUsername] = useState('');
  const [initAccountname, setInitAccountname] = useState('');
  const [initIntron, setInitIntron] = useState('');
  const [initImgSrc, setInitImgSrc] = useState(''); // 이미 있는 이미지 주소

  // 내 정보 API
  const getInitInfo = async () => {
    console.log(token);
    const res = await fetch('https://api.mandarin.weniv.co.kr/user/myinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    console.log(json);

    if (json && json.user) {
      setInitImgSrc(json.user['image'] || '');
      setImgSrc(json.user['image'] || '');

      setInitAccountname(json.user['accountname'] || '');
      setAccountname(json.user['accountname'] || '');

      setInitUsername(json.user['username'] || '');
      setUsername(json.user['username'] || '');

      setInitIntron(json.user['intro'] || '');
      setIntro(json.user['intro'] || '');
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 getInitInfo 함수를 실행합니다.
    getInitInfo();
  }, []);

  const [username, setUsername] = useState(initUsername);
  const [accountname, setAccountname] = useState(initAccountname);
  const [imgSrc, setImgSrc] = useState(initImgSrc);
  const [intro, setIntro] = useState(initIntron);
  const [errorMessage, setErrorMessage] = useState('');
  const [accountError, setAccountError] = useState('');
  const [duplicateIdError, setDuplicateIdError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // 프로필 수정 API
  const edit = async (editData) => {
    // const token = localStorage.getItem('token');

    const reqUrl = 'https://api.mandarin.weniv.co.kr/user';
    const res = await fetch(reqUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(editData),
    });
    const json = await res.json();

    if (json && json.message) {
      setDuplicateIdError(json.message); // "이미 사용중인 계정 ID입니다."
    } else {
      setDuplicateIdError('');
      navigate('/profile/myInfo');
    }
  };

  const validateAccountname = (value) => {
    const pattern = /^[a-zA-Z0-9._]+$/; // 영문, 숫자, ., _ 만 허용
    if (!pattern.test(value)) {
      setAccountError('영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.');
    } else {
      setAccountError('');
    }
  };

  const validateUserNameLength = (value) => {
    if (value.length < 2 || value.length > 10) {
      setUserNameError('사용자 이름은 2~10자 이내여야 합니다.');
    } else {
      setUserNameError('');
    }
  };

  const inputUsername = (e) => {
    setUsername(e.target.value);
    validateUserNameLength(e.target.value);
  };

  const inputAccountname = (e) => {
    setAccountname(e.target.value);
    validateAccountname(e.target.value); // 입력값 검증 실행

    setDuplicateIdError('');
  };
  const inputInfo = (e) => {
    setIntro(e.target.value);
  };

  const uploadImage = async (imageFile) => {
    const baseUrl = 'https://api.mandarin.weniv.co.kr/';
    const reqUrl = baseUrl + 'image/uploadfile';
    // 폼데이터 만들기
    const form = new FormData();
    // 폼데이터에 값 추가하기
    // 폼데이터.append("키","값")
    form.append('image', imageFile);
    // 폼바디에 넣어서 요청하기
    const res = await fetch(reqUrl, {
      method: 'POST',
      body: form,
    });
    const json = await res.json();
    console.log(baseUrl + json.filename);
    const imageUrl = baseUrl + json.filename;
    setImgSrc(imageUrl);
  };

  const handleChangeImage = (e) => {
    // 파일 가져오기
    const imageFile = e.target.files[0];

    // 파일이 선택되지 않았을 경우 오류 메시지 설정
    if (!imageFile) {
      setErrorMessage('파일을 선택해주세요.');
      return;
    }

    // 오류 메시지 초기화
    setErrorMessage('');

    uploadImage(imageFile);
  };

  const submitEdit = (e) => {
    e.preventDefault();

    const editData = {
      user: {
        username: username,
        accountname: accountname,
        intro: intro,
        image: imgSrc,
      },
    };
    edit(editData);
  };

  useEffect(() => {
    // 모든 입력 값이 유효한지와 값이 있는지 확인
    const isAllValid =
      !userNameError &&
      !accountError &&
      !duplicateIdError &&
      username &&
      accountname &&
      imgSrc &&
      intro;

    // 상태 변수 업데이트
    setIsButtonDisabled(!isAllValid);
  }, [userNameError, accountError, duplicateIdError, username, accountname, imgSrc, intro]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    submitEdit(e);
  };

  return (
    <>
      <section>
        <h1>내 프로필 수정</h1>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor='profileImg'>
            <img src={imgSrc || initImgSrc} alt='Profile' id='imagePre' />
          </label>
          <input
            type='file'
            onChange={handleChangeImage}
            id='profileImg'
            name='image'
            accept='image/*'
            required
          />
          <p style={{ color: 'red' }}>{errorMessage}</p>
          <div>
            <label htmlFor='userNameInput'>사용자 이름</label>
            <input
              value={username}
              onChange={inputUsername}
              type='text'
              id='userNameInput'
              name='username'
              placeholder='2~10자 이내여야 합니다.'
              required
            />
            {userNameError && <p style={{ color: 'red' }}>{userNameError}</p>}
          </div>
          <div>
            <label htmlFor='userIdInput'>계정 ID</label>
            <input
              value={accountname}
              onChange={inputAccountname}
              type='text'
              id='userIdInput'
              name='accountname'
              placeholder='영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.'
              required
            />
            {duplicateIdError && <p style={{ color: 'red' }}>{duplicateIdError}</p>}
            {accountError && <p style={{ color: 'red' }}>{accountError}</p>}
          </div>
          <div>
            <label htmlFor='userIntroInput'>소개</label>
            <input
              value={intro}
              onChange={inputInfo}
              type='text'
              id='userIntroInput'
              name='intro'
              placeholder='자신과 판매할 상품에 대해 소개해 주세요!'
              required
            />
          </div>
          <button type='button' onClick={submitEdit} disabled={isButtonDisabled}>
            수정하기
          </button>
        </form>
      </section>
    </>
  );
}
export default EditProfile;
