/*
  설명: 내 프로필 수정 페이지
  작성자: 이해지
  최초 작성 날짜: 2023.10.24
  마지막 수정 날까: 
*/

import React, { useState } from 'react';

function EditProfile({ handlePage }) {
  const [username, setUsername] = useState('');
  const [accountname, setAccountname] = useState('');
  const [imgSrc, setImgSrc] = useState('https://api.mandarin.weniv.co.kr/Ellipse.png');
  const [intro, setIntro] = useState('');

  const edit = async (editData) => {
    const reqUrl = 'https://api.mandarin.weniv.co.kr/user/';
    const res = await fetch(reqUrl, {
      method: 'POST',
      headers: {
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

  const submitEdit = () => {
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
      <button type='button' onClick={handlePage}>
        로그인페이지로 돌아가기
      </button>
      <section>
        <h2>프로필 설정</h2>
        <p>나중에 언제든지 변경할 수 있습니다.</p>
        <label htmlFor='profileImg'>
          <img src={imgSrc} alt='' id='imagePre' />
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
            onChange={inputInfo}
            type='text'
            id='userIntroInput'
            name='intro'
            placeholder='자신과 판매할 상품에 대해 소개해 주세요.'
          />
        </div>
        <button type='button' onClick={submitEdit}>
          감귤마켓 시작하기
        </button>
      </section>
    </>
  );
}
export default EditProfile;
