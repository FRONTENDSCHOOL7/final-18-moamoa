/*
  설명: 게시글 수정 페이지
  작성자: 이해지
  최초 작성 날짜: 2023.10.30
  마지막 수정 날까: 2023.10.31
*/

import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import userToken from '../../Recoil/userTokenAtom';

export default function EditPost() {
  const token = useRecoilValue(userToken);
  const navigate = useNavigate();
  const postId = '6538602fb2cb205663861cdc';

  const [userImage, setUserImage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const getInitInfo = async () => {
    const reqUrl = `https://api.mandarin.weniv.co.kr/post/${postId}`;
    const res = await fetch(reqUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const json = await res.json();
    console.log(json);
    if (json && json.post) {
      setUserImage(json.post.author['image'] || '');

      const postContent = json.post['content'] || '';
      setContent(postContent);
      console.log(postContent);

      const postImage = json.post['image'] || '';
      setImage(postImage);
      console.log(postImage);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 getInitInfo 함수를 실행합니다.
    getInitInfo();
  }, []);

  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  // 게시글 수정 API
  const edit = async (editData) => {
    try {
      const reqUrl = `https://api.mandarin.weniv.co.kr/post/${postId}`;
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
      navigate('/profile/myInfo');
    } catch (error) {
      alert('아이템 수정에 실패했습니다!');
    }
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
    setImage(imageUrl);
  };

  const handleChangeImage = (e) => {
    // 파일 가져오기
    const imageFile = e.target.files[0];
    uploadImage(imageFile);
  };

  const inputContent = (e) => {
    setContent(e.target.value);
  };

  const submitEdit = (e) => {
    e.preventDefault();

    const editData = {
      post: {
        content: content,
        image: image,
      },
    };
    edit(editData);
  };

  const closeImg = () => {
    setImage('');
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
    submitEdit(e);
  };

  return (
    <section>
      <h1>게시글 등록</h1>
      {/* 사용자 프로필 */}
      <form onSubmit={handleFormSubmit}>
        <img src={userImage} alt='post' id='imagePre' />

        {/* 게시글 이미지 */}
        <button type='button' onClick={closeImg}>
          닫기
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
        <button type='button' onClick={submitEdit} disabled={isButtonDisabled}>
          게시글 등록
        </button>
      </form>
    </section>
  );
}
