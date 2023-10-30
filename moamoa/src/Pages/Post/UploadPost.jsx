/*
  설명: 게시글 등록 페이지
  작성자: 이해지
  최초 작성 날짜: 2023.10.24
  마지막 수정 날까: 2023.10.30
*/

import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import userToken from '../../Recoil/userTokenAtom'; ////파일 경로 변경 완료

export default function AddPost() {
  const token = useRecoilValue(userToken);
  const navigate = useNavigate();

  const [content, setContent] = useState('');
  const [image, setPostImage] = useState('');

  const [userImage, setUserImage] = useState('');

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const getUserImg = async () => {
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
      setUserImage(json.user['image'] || '');
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 getInitInfo 함수를 실행합니다.
    getUserImg();
  }, []);

  const addPost = async (addPostData) => {
    try {
      const res = await fetch('https://api.mandarin.weniv.co.kr/post', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(addPostData),
      });
      const json = await res.json();
      console.log(json);
      navigate('/profile/myInfo');
    } catch (error) {
      alert('아이템 등록에 실패했습니다!');
    }
  };

  const inputContent = (e) => {
    setContent(e.target.value);
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
    const imageUrl = baseUrl + json.filename;
    setPostImage(imageUrl);
  };

  const handleChangeImage = (e) => {
    // 파일 가져오기
    const imageFile = e.target.files[0];
    uploadImage(imageFile);
  };

  const submitAddPost = (e) => {
    e.preventDefault();

    const addPostData = {
      post: {
        content,
        image,
      },
    };
    addPost(addPostData);
  };

  const closeImg = () => {
    setPostImage('');
  };

  useEffect(() => {
    if (content.trim() === '' && !image) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [content, image]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    submitAddPost(e);
  };

  return (
    <section>
      <h1>게시글 등록</h1>
      <form onSubmit={handleFormSubmit}>
        {/* 사용자 프로필 */}
        <img src={userImage} alt='' />

        {/* 게시글 이미지 */}
        <button type='button' onClick={closeImg}>
          {' '}
          닫기{' '}
        </button>
        <div>
          <label htmlFor='profileImg'>
            <img src={image} alt='' id='imagePre' />
          </label>
          <input
            type='file'
            onChange={handleChangeImage}
            id='profileImg'
            name='image'
            accept='image/*'
          />
        </div>
        <div>
          {/* 내용 입력 창 */}
          <textarea
            value={content}
            onChange={inputContent}
            id='contentTextarea'
            name='content'
            rows='10'
            cols='50'
            placeholder='내용을 입력해주세요'
          ></textarea>
        </div>
        <button type='button' onClick={submitAddPost} disabled={isButtonDisabled}>
          업로드
        </button>
      </form>
    </section>
  );
}
