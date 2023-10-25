/*
  설명: 내 프로필 수정 페이지
  작성자: 이해지
  최초 작성 날짜: 2023.10.24
  마지막 수정 날까: 2023.10.24
*/

import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import userToken from '../../Recoil/UserToken';

function EditProfile() {
  //기존 사용자의 정보를 가져오기
  const token = useRecoilValue(userToken);

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
    console.log(json);
  };

  const inputUsername = (e) => {
    setUsername(e.target.value);
  };
  const inputAccountname = (e) => {
    setAccountname(e.target.value);
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

  return (
    <>
      <section>
        <h1>내 프로필 수정</h1>
        <label htmlFor='profileImg'>
          <img src={imgSrc || initImgSrc} alt='Profile' id='imagePre' />
        </label>
        <input
          type='file'
          onChange={handleChangeImage}
          id='profileImg'
          name='image'
          accept='image/*'
        />
        <div>
          <label htmlFor='userNameInput'>사용자 이름</label>
          <input
            value={username}
            onChange={inputUsername}
            type='text'
            id='userNameInput'
            name='username'
            placeholder={initUsername ? `${initUsername}` : '2~10자 이내여야 합니다.'}
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
            placeholder={
              initAccountname
                ? `${initAccountname}`
                : '영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.'
            }
          />
        </div>
        <div>
          <label htmlFor='userIntroInput'>소개</label>
          <input
            value={intro}
            onChange={inputInfo}
            type='text'
            id='userIntroInput'
            name='intro'
            placeholder={initIntron ? `${initIntron}` : '자신과 판매할 상품에 대해 소개해 주세요!'}
          />
        </div>
        <button type='button' onClick={submitEdit}>
          수정하기
        </button>
      </section>
    </>
  );
}
export default EditProfile;
