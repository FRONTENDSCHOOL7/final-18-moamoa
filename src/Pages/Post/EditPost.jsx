/*
  설명: 게시글 수정 페이지
  작성자: 이해지
  최초 작성 날짜: 2023.10.30
  마지막 수정 날까: 2024.02.13
  
  추가 작성자: 유의진 
  추가 내용: 이미지 크롭 기능
  작성 날짜: 2023.12.26
*/

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { Container } from '../../Components/Common/Container';
import Gobackbtn from '../../Components/Button/GoBackbtn';
import ButtonSubmit from '../../Components/Button/Button';

import uploadFile from '../../Assets/icons/post-image.svg';
import uploadFileHover from '../../Assets/icons/post-image-hover.svg';
import xButton from '../../Assets/icons/x.svg';

import { getPostDetail, editPost } from '../../API/Post/PostAPI';
import { useImage } from '../../Hooks/Common/useImage';
import ImageCropModal from '../../Components/Modal/ImageCropModal';
import NavBar from '../../Components/Common/NavBar';

import {
  HeaderContainer,
  UploadPostBox,
  ProfileImg,
  TextArea,
  ImgPre,
  XButton,
  ImgIconBtn,
  ProfileTop,
} from './UploadEditPostStyle';

export default function EditPost() {
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.replace('/post/edit/', ''); // 경로에서 사용자 accountname을 추출

  const [userImage, setUserImage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [content, setContent] = useState('');

  const { imgData, setImgData, showImgModal, onSelectFile, onCancel, setCroppedImageFor } =
    useImage(null);

  const getInitPostInfo = async () => {
    const postInfo = await getPostDetail(postId);

    if (postInfo && postInfo.post) {
      setUserImage(postInfo.post.author['image'] || '');

      const postContent = postInfo.post['content'] || '';
      setContent(postContent);

      const textarea = document.getElementById('contentTextarea');
      if (textarea) {
        adjustTextareaHeight({ target: textarea });
      }

      const postImage = postInfo.post['image'] || '';
      // setImage(postImage);
      setImgData((prevImage) => ({
        ...prevImage,
        imageUrl: postImage,
      }));
    }
  };

  useEffect(() => {
    getInitPostInfo();
  }, []);

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

  const submitEdit = async (e) => {
    e.preventDefault();

    const postData = {
      post: {
        content: content,
        // image: image,
        image: imgData.croppedImageUrl ? imgData.croppedImageUrl : imgData.imageUrl,
      },
    };
    await editPost(postId, postData);
    navigate('/profile/myInfo');
  };

  const closeImg = () => {
    // setImage('');
    setImgData({
      imageUrl: '',
      croppedImageUrl: null,
    });
    document.getElementById('profileImg').value = ''; // 파일 인풋 초기화
  };

  useEffect(() => {
    if (content.trim() === '' && !imgData.croppedImageUrl && !imgData.imageUrl) {
      setIsButtonDisabled(true);
      console.log('버튼비활성화');
    } else {
      setIsButtonDisabled(false);
      console.log('버튼활성화');
    }
  }, [content, imgData]);

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
      {showImgModal && (
        <ImageCropModal
          imageUrl={imgData.imageUrl}
          cropInit={imgData.crop}
          zoomInit={imgData.zoom}
          onCancel={onCancel}
          setCroppedImageFor={setCroppedImageFor}
          cropShape='rect'
          aspect={358 / 228}
        />
      )}
      <UploadPostBox>
        <section>
          <h1 className='a11y-hidden'>게시글 수정</h1>
          <form onSubmit={handleFormSubmit}>
            <ProfileTop>
              <ProfileImg>
                {/* 사용자 프로필 */}
                <img src={userImage} alt='post' id='imagePre' />
              </ProfileImg>
              <div className='large-scree'>
                <ButtonSubmit
                  buttonText='저장'
                  onClickHandler={submitEdit}
                  disabled={isButtonDisabled}
                />
              </div>
            </ProfileTop>
            {/* 이미지 등록 버튼 */}
            <ImgIconBtn>
              <label htmlFor='profileImg'>
                <img className='default' src={uploadFile} alt='' />
                <img className='btnHover' src={uploadFileHover} alt='' />
                <p>게시글 사진 추가하기</p>
              </label>
              <input
                type='file'
                // onChange={handleChangeImage}
                onChange={onSelectFile}
                id='profileImg'
                name='image'
                accept='image/*'
                style={{ display: 'none' }}
              />
            </ImgIconBtn>
            <TextArea>
              <section>
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
                  placeholder='게시글 내용을 입력해주세요.'
                ></textarea>
              </section>
            </TextArea>

            <section>
              {/* 이미지 미리보기 */}
              {(imgData.imageUrl || imgData.croppedImageUrl) && (
                <ImgPre>
                  <img
                    src={imgData.croppedImageUrl ? imgData.croppedImageUrl : imgData.imageUrl}
                    alt=''
                    id='imagePre'
                  />
                  <XButton>
                    <button type='button' onClick={closeImg}>
                      <img src={xButton} alt='' />
                    </button>
                  </XButton>
                </ImgPre>
              )}
            </section>
          </form>
        </section>
        <div className='large-scree'>
          <NavBar />
        </div>
      </UploadPostBox>
    </Container>
  );
}
