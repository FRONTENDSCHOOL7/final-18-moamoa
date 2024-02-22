/*
  설명: 내 프로필 수정 페이지
  작성자: 이해지
  최초 작성 날짜: 2023.10.24
  마지막 수정 날까: 2023.02.06

  추가 작성자: 유의진 
  추가 내용: 이미지 크롭 기능
  작성 날짜: 2023.12.26
*/

import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { Container } from '../../Components/Common/Container';
import Gobackbtn from '../../Components/Button/GoBackbtn';
import ButtonSubmit from '../../Components/Button/Button';
import uploadFile from '../../Assets/images/upload-file.png';

import { HeaderContainer } from '../Post/UploadEditPostStyle';

import { getMyProfileData, editProfileData } from '../../API/Profile/ProfileAPI';
import userTokenAtom from '../../Recoil/userTokenAtom';

import { useImage } from '../../Hooks/Common/useImage';
import ImageCropModal from '../../Components/Modal/ImageCropModal';
import NavBar from '../../Components/Common/NavBar';

import { ProfileWrap } from './ProfileStyle';
import { ProfileImg, EditProfileBox, TextInput, TextLabel, EorrorMsg } from './EditProfileStyle';
import { useRecoilValue } from 'recoil';

function EditProfile() {
  //기존 사용자의 정보를 가져오기
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [accountname, setAccountname] = useState('');
  const [intro, setIntro] = useState('');
  const token = useRecoilValue(userTokenAtom);

  const { imgData, setImgData, showImgModal, onSelectFile, onCancel, setCroppedImageFor } =
    useImage(null);

  const [accountError, setAccountError] = useState('');
  const [accountLengthError, setAccountLengthError] = useState('');
  const [introError, setIntroError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [duplicateIdError, setDuplicateIdError] = useState('');
  const [userType, setUserType] = useState('');

  // 내 정보 API
  const getInitInfo = async () => {
    try {
      const res = await getMyProfileData(token);

      if (res && res.user) {
        setImgData((prevImage) => ({
          ...prevImage,
          imageUrl: res.user['image'],
        }));

        setAccountname(res.user['accountname']);

        setUserType(res.user['username'].slice(0, 3));

        setUsername(res.user['username'].slice(3, res.user['username'].length) || '');

        setIntro(res.user['intro'] || '');
      }
    } catch (error) {
      console.log('기존 프로필 정보를 가져올 수 없습니다.');
    }
  };

  useEffect(() => {
    getInitInfo();
  }, []);

  // 프로필 수정 API
  const edit = async (editData) => {
    const error = await editProfileData(editData);
    if (error) {
      setDuplicateIdError(error);
    } else {
      navigate('/profile/myInfo');
    }
  };

  const validateAccountname = (value) => {
    const pattern = /^[a-zA-Z0-9._]+$/; // 영문, 숫자, ., _ 만 허용
    if (!pattern.test(value)) {
      setAccountError('*영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.');
    } else if (value.length < 2 || value.length > 15) {
      setAccountLengthError('*2~15자 이내여야 합니다.');
    } else {
      setAccountError('');
      setAccountLengthError('');
    }
  };

  const validateUserNameLength = (value) => {
    if (value.length < 2 || value.length > 10) {
      setUserNameError('*사용자 이름은 2~10자 이내여야 합니다.');
    } else {
      setUserNameError('');
    }
  };

  const validateIntroLength = (value) => {
    if (value.length < 2 || value.length > 50) {
      setIntroError('*2~50자 이내여야 합니다.');
    } else {
      setIntroError('');
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
    validateIntroLength(e.target.value);
  };

  const submitEdit = async (e) => {
    e.preventDefault();

    const fullUsername = userType + username;

    const editData = {
      user: {
        username: fullUsername,
        accountname: accountname,
        intro: intro,
        image: imgData.croppedImageUrl ? imgData.croppedImageUrl : imgData.imageUrl,
      },
    };
    edit(editData);
  };

  useEffect(() => {
    // 모든 입력 값이 유효한지와 값이 있는지 확인
    const isAllValid =
      !userNameError &&
      !accountError &&
      !introError &&
      !accountLengthError &&
      !duplicateIdError &&
      username &&
      accountname &&
      intro;

    // 상태 변수 업데이트
    setIsButtonDisabled(!isAllValid);
  }, [
    userNameError,
    accountError,
    accountLengthError,
    introError,
    duplicateIdError,
    username,
    accountname,
    intro,
  ]);

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
          cropShape='round'
          aspect={1 / 1}
        />
      )}
      <ProfileWrap>
        <section>
          <h1 className='a11y-hidden'>내 프로필 수정</h1>
          <form onSubmit={handleFormSubmit}>
            {/* 프로필 이미지 */}
            <ProfileImg>
              <label htmlFor='profileImg'>
                <img
                  src={imgData.croppedImageUrl ? imgData.croppedImageUrl : imgData.imageUrl}
                  alt={'프로필 이미지'}
                  id='imagePre'
                />
                <img src={uploadFile} alt='' />
              </label>
              <input
                type='file'
                onChange={onSelectFile}
                id='profileImg'
                name='image'
                accept='image/*'
                style={{ display: 'none' }}
                required
              />
            </ProfileImg>
            <EditProfileBox>
              <div>
                <TextLabel>
                  <label htmlFor='userNameInput'>사용자 이름</label>
                </TextLabel>
                <TextInput>
                  <input
                    value={username}
                    onChange={inputUsername}
                    type='text'
                    id='userNameInput'
                    name='username'
                    placeholder='2~10자 이내여야 합니다.'
                    required
                  />
                </TextInput>
                {userNameError && <EorrorMsg>{userNameError}</EorrorMsg>}
              </div>
              <div>
                <TextLabel>
                  <label htmlFor='userIdInput'>계정 ID</label>
                </TextLabel>
                <TextInput>
                  <input
                    value={accountname}
                    onChange={inputAccountname}
                    type='text'
                    id='userIdInput'
                    name='accountname'
                    placeholder='영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.'
                    required
                  />
                </TextInput>
                {duplicateIdError && <EorrorMsg>{duplicateIdError}</EorrorMsg>}
                {accountError && <EorrorMsg>{accountError}</EorrorMsg>}
                {accountLengthError && <EorrorMsg>{accountLengthError}</EorrorMsg>}
              </div>
              <div>
                <TextLabel>
                  <label htmlFor='userIntroInput'>소개</label>
                </TextLabel>
                <TextInput>
                  <input
                    value={intro}
                    onChange={inputInfo}
                    type='text'
                    id='userIntroInput'
                    name='intro'
                    placeholder='자신과 판매할 상품에 대해 소개해 주세요!'
                    required
                  />
                </TextInput>
                {introError && <EorrorMsg>{introError}</EorrorMsg>}
              </div>
              <div className='large-scree'>
                <ButtonSubmit
                  buttonText='저장'
                  onClickHandler={submitEdit}
                  disabled={isButtonDisabled}
                />
              </div>
            </EditProfileBox>
          </form>
        </section>
      </ProfileWrap>
      <div className='large-scree'>
        <NavBar />
      </div>
    </Container>
  );
}
export default EditProfile;
