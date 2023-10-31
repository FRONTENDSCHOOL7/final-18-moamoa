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
import styled from 'styled-components';
import { Container } from '../../Components/Common/Container';
import Gobackbtn from '../../Components/Common/GoBackbtn';
import ButtonSubmit from '../../Components/Common/Button';

import uploadFile from '../../Assets/images/upload-file.png';
import xButton from '../../Assets/icons/x.svg';

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

  //textarea 높이 설정
  const adjustTextareaHeight = (event) => {
    const textarea = event.target;
    // 높이 초기화
    textarea.style.height = 'auto';
    // 스크롤 높이만큼 textarea 높이 설정
    textarea.style.height = `${textarea.scrollHeight}px`;
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
    submitAddPost(e);
  };

  return (
    <Container>
      <HeaderContainer>
        <Gobackbtn />
        <ButtonSubmit
          buttonText='업로드'
          onClickHandler={submitAddPost}
          disabled={isButtonDisabled}
        />
      </HeaderContainer>
      <UploadPostBox>
        <section>
          <HiddenH1>
            <h1>게시글 등록</h1>
          </HiddenH1>
          <form onSubmit={handleFormSubmit}>
            <ProfileImg>
              {/* 사용자 프로필 */}
              <img src={userImage} alt='' />
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
const HeaderContainer = styled.header`
  display: flex;
  height: 55px;
  width: 390px;
  justify-content: space-between;
  border-bottom: 2px solid #dbdbdb;
  background-color: #fff;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;

  img {
    cursor: pointer;
  }
`;

const a11yHidden = `
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  width: 1px
	height: 1px;
	margin: -1px;
  overflow: hidden;
	padding: 0;
	position: absolute;
`;

const HiddenH1 = styled.h1`
  ${a11yHidden}
`;

const UploadPostBox = styled.div`
  flex: 1;
  padding: 16px;
  position: relative;
`;

const ProfileImg = styled.div`
  width: 42px;
  height: 42px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%; // 원형으로 보이게 하려면 추가
  }
`;

const TextArea = styled.div`
  padding: 10px 0;

  textarea {
    resize: none; // 이 부분을 추가합니다.
    box-sizing: border-box;
    width: 100%;
    border-radius: 2px;
    padding-top: 5px; // 위쪽 padding 추가
    padding-left: 5px; // 왼쪽 padding 추가
    overflow-y: hidden;

    border: none;

    &:focus {
      border: 1px solid #ffc700; // textarea가 포커스될 때 빨간색 테두리가 생깁니다.
      outline: none; // 기본 브라우저 포커스 스타일을 제거합니다.
    }
  }
`;

const ImgPre = styled.div`
  height: 228px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const XButton = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
`;

const InputImgIcon = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;

  width: 50px;
  height: 50px;

  img {
    width: 100%;
    height: 100%;

    cursor: pointer;
  }
`;
