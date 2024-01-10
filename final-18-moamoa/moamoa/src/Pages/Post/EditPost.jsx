/*
  설명: 게시글 수정 페이지
  작성자: 이해지
  최초 작성 날짜: 2023.10.30
  마지막 수정 날까: 2023.12.07
  
  추가 작성자: 유의진 
  추가 내용: 이미지 크롭 기능
  작성 날짜: 2023.12.26
*/

import React, { useState, useEffect } from 'react';
// import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// import userToken from '../../Recoil/userTokenAtom';

import { Container } from '../../Components/Common/Container';
import Gobackbtn from '../../Components/Common/GoBackbtn';
import ButtonSubmit from '../../Components/Common/Button';

import uploadFile from '../../Assets/images/upload-file.png';
import xButton from '../../Assets/icons/x.svg';

import { getPostDetail, editPost } from '../../API/Post/PostAPI';
// import { uploadImage } from '../../API/Image/ImageAPI';
import { useImage } from '../../Hooks/Common/useImage';
import ImageCropModal from '../../Components/Modal/ImageCropModal';

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
  const navigate = useNavigate();

  const postId = location.pathname.replace('/post/edit/', ''); // 경로에서 사용자 accountname을 추출

  const [userImage, setUserImage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [content, setContent] = useState('');
  // const [image, setImage] = useState('');

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
    // 컴포넌트가 마운트될 때 getInitInfo 함수를 실행합니다.
    getInitPostInfo();
  }, []);

  // const handleChangeImage = async (e) => {
  //   // 파일 가져오기
  //   const imageFile = e.target.files[0];
  //   const response = await uploadImage(imageFile);
  //   const imageUrl = `https://api.mandarin.weniv.co.kr/${response.data.filename}`;

  //   setImage(imageUrl);
  // };

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
    //   if (content.trim() === '' && !image) {
    //     setIsButtonDisabled(true);
    //   } else {
    //     setIsButtonDisabled(false);
    //   }
    // }, [content, image]

    if (content.trim() === '' && (!imgData.croppedImageUrl || !imgData.imageUrl)) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
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
          <HiddenH1>게시글 수정</HiddenH1>
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
              {/* {image ? (
                <ImgPre>
                  <img src={image} alt='' id='imagePre' />
                  <XButton>
                    <button type='button' onClick={closeImg}>
                      <img src={xButton} alt='' />
                    </button>
                  </XButton>
                </ImgPre>
              ) : null} */}
              {/* 이미지 등록 버튼 */}
              <InputImgIcon>
                <label htmlFor='profileImg'>
                  <img src={uploadFile} alt='' />
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
              </InputImgIcon>
            </div>
          </form>
        </section>
      </UploadPostBox>
    </Container>
  );
}