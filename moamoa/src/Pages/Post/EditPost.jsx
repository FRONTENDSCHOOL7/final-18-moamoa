/*
  설명: 게시글 수정 페이지
  작성자: 이해지
  최초 작성 날짜: 2023.10.30
  마지막 수정 날까: 2023.11.03
*/

import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import userToken from '../../Recoil/userTokenAtom';

import { Container } from '../../Components/Common/Container';
import Gobackbtn from '../../Components/Common/GoBackbtn';
import ButtonSubmit from '../../Components/Common/Button';

import uploadFile from '../../Assets/images/upload-file.png';
import xButton from '../../Assets/icons/x.svg';

import {
  HeaderContainer,
  HiddenH1,
  UploadPostBox,
  ProfileImg,
  TextArea,
  ImgPre,
  XButton,
  InputImgIcon,
} from './UploadEditPostStyle';

export default function EditPost() {
  const location = useLocation();
  const token = useRecoilValue(userToken);
  const navigate = useNavigate();

  const postId = location.pathname.replace('/post/edit/', ''); // 경로에서 사용자 accountname을 추출

  // const postId = '6538602fb2cb205663861cdc';

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

      const textarea = document.getElementById('contentTextarea');
      if (textarea) {
        adjustTextareaHeight({ target: textarea });
      }

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

  //textarea 높이 설정
  const adjustTextareaHeight = (event) => {
    const textarea = event.target;
    // 높이 초기화
    textarea.style.height = 'auto';
    // 스크롤 높이만큼 textarea 높이 설정
    textarea.style.height = `${textarea.scrollHeight}px`;
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
    document.getElementById('profileImg').value = ''; // 파일 인풋 초기화
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
    <Container>
      <HeaderContainer>
        <Gobackbtn />
        <ButtonSubmit buttonText='저장' onClickHandler={submitEdit} disabled={isButtonDisabled} />
      </HeaderContainer>
      <UploadPostBox>
        <section>
          <HiddenH1>
            <h1>게시글 수정</h1>
          </HiddenH1>
          <form onSubmit={handleFormSubmit}>
            <ProfileImg>
              {/* 사용자 프로필 */}
              <img src={userImage} alt='post' id='imagePre' />
            </ProfileImg>
            <TextArea>
              <div>
                {/* 내용 입력 창 */}
                <textarea
                  value={content}
                  onChange={(e) => {
                    inputContent(e);
                    adjustTextareaHeight(e);
                  }}
                  id='contentTextarea'
                  name='content'
                  rows='1'
                  cols='50'
                  placeholder='내용을 입력해주세요'
                ></textarea>
              </div>
            </TextArea>

            <div>
              {/* 이미지 미리보기 */}
              {image ? (
                <ImgPre>
                  <img src={image} alt='' id='imagePre' />
                  <XButton>
                    <button type='button' onClick={closeImg}>
                      <img src={xButton} alt='' />
                    </button>
                  </XButton>
                </ImgPre>
              ) : null}
              {/* 이미지 등록 버튼 */}
              <InputImgIcon>
                <label htmlFor='profileImg'>
                  <img src={uploadFile} alt='' />
                </label>
                <input
                  type='file'
                  onChange={handleChangeImage}
                  id='profileImg'
                  name='image'
                  accept='image/*'
                  style={{ display: 'none' }}
                />
              </InputImgIcon>
            </div>
          </form>
        </section>
      </UploadPostBox>
    </Container>
  );
}
