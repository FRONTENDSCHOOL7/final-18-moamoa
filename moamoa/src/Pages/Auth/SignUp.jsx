import React from 'react';
import InputErrorMessagesReducer from '../../Hooks/Auth/InputErrorMessagesReducer.jsx';
import useSignUp from '../../Hooks/Auth/useSignUp.jsx';
import { Container } from '../../Components/Common/Container.jsx';
import {
  TitleH2,
  Form,
  Input,
  AlertParagraph,
  UserTypeContainer,
  UserTypeBtnsContainer,
  UserTypeBtn,
  NextBtn,
  Paragraph,
  ProfileForm,
  ProfileFormSubContainer,
  ImgLabel,
  TitleLabel,
  SignUpBtn,
} from '../Auth/AuthStyle.jsx';
import ImageCropModal from '../../Components/Modal/ImageCropModal.jsx';

const SignUp = () => {
  const {
    userData,
    userType,
    pageTransition,
    userTypeErrorMessage,
    signUpFailMessage,
    isOpen,
    updateUserData,
    updateUserType,
    clickNextButton,
    submitSignUpForm,
    imgData,
    onCancel,
    onSelectFile,
    setCroppedImageFor,
  } = useSignUp();

  const {
    errorMessages,
    checkPasswordLength,
    checkUserNameLength,
    checkIntroductionLength,
    validateEmailWithAPI,
    validateAccountNameWithAPI,
  } = InputErrorMessagesReducer();

  const isFilledNext =
    userType !== '' &&
    userData.user.email !== '' &&
    userData.user.password !== '' &&
    errorMessages.emailError === '' &&
    errorMessages.passwordError === '';

  const isFilledSubmit =
    userData.user.username !== '' &&
    userData.user.accountname !== '' &&
    userData.user.intro !== '' &&
    errorMessages.userNameError === '' &&
    errorMessages.accountNameError === '' &&
    errorMessages.introductionError === '';

  return (
    <>
      <h1 className='a11y-hidden'>이메일로 회원가입 및 프로필 설정</h1>
      {pageTransition ? (
        <Container>
          {isOpen && (
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
          <TitleH2 aria-live='polite'>프로필 설정</TitleH2>
          <Paragraph>나중에 언제든지 변경할 수 있습니다.</Paragraph>
          <ProfileForm onSubmit={submitSignUpForm}>
            <ProfileFormSubContainer>
              <ImgLabel htmlFor='profileImg'>
                <img
                  src={imgData.croppedImageUrl ? imgData.croppedImageUrl : imgData.imageUrl}
                  alt={'프로필 이미지'}
                  id='imagePre'
                />
              </ImgLabel>
              <input
                type='file'
                id='profileImg'
                name='image'
                accept='image/*'
                className='a11y-hidden'
                onChange={onSelectFile}
              />
            </ProfileFormSubContainer>
            <ProfileFormSubContainer>
              <TitleLabel htmlFor='userNameInput'>사용자 이름</TitleLabel>
              <Input
                value={userData.user.username}
                onChange={updateUserData}
                type='text'
                id='userNameInput'
                name='username'
                placeholder='2~10자 이내여야 합니다.'
                minLength={2}
                maxLength={10}
                onBlur={checkUserNameLength}
                required
                aria-required='true'
              />
              <AlertParagraph role='alert'>{errorMessages.userNameError}</AlertParagraph>
            </ProfileFormSubContainer>
            <ProfileFormSubContainer>
              <TitleLabel htmlFor='userIdInput'>계정 ID</TitleLabel>
              <Input
                value={userData.user.accountname}
                onChange={updateUserData}
                type='text'
                id='userIdInput'
                name='accountname'
                placeholder='영문, 숫자, (_), (,)만 사용 가능합니다.'
                minLength={2}
                maxLength={15}
                onBlur={validateAccountNameWithAPI}
                required
                aria-required='true'
              />
              <AlertParagraph role='alert'>{errorMessages.accountNameError}</AlertParagraph>
            </ProfileFormSubContainer>
            <ProfileFormSubContainer>
              <TitleLabel htmlFor='userIntroInput'>소개</TitleLabel>
              <Input
                value={userData.user.intro}
                onChange={updateUserData}
                type='text'
                id='userIntroInput'
                name='intro'
                placeholder={
                  userType === 'organization'
                    ? '홍보할 행사에 대해 소개해 주세요!'
                    : '자신에 대해 소개해 주세요!'
                }
                minLength={2}
                maxLength={50}
                onBlur={checkIntroductionLength}
                required
                aria-required='true'
              />
              <AlertParagraph role='alert'>{errorMessages.introductionError}</AlertParagraph>
              <AlertParagraph role='alert'>{signUpFailMessage}</AlertParagraph>
            </ProfileFormSubContainer>
            <SignUpBtn $isfilled={isFilledSubmit} type='submit'>
              모아모아 시작하기
            </SignUpBtn>
          </ProfileForm>
        </Container>
      ) : (
        <Container>
          <TitleH2 aria-live='polite'>이메일로 회원가입</TitleH2>
          <Form onSubmit={clickNextButton}>
            <UserTypeContainer>
              <h3 id='userTypeTitle'>회원분류선택</h3>
              <UserTypeBtnsContainer>
                <UserTypeBtn
                  type='button'
                  name='individual'
                  onClick={updateUserType}
                  aria-pressed={userType === 'individual'}
                  aria-describedby='userTypeTitle'
                >
                  일반 회원
                </UserTypeBtn>
                <UserTypeBtn
                  type='button'
                  name='organization'
                  onClick={updateUserType}
                  aria-pressed={userType === 'organization'}
                  aria-describedby='userTypeTitle'
                >
                  기업 및 기관
                </UserTypeBtn>
              </UserTypeBtnsContainer>
              <AlertParagraph role='alert'>{userTypeErrorMessage}</AlertParagraph>
            </UserTypeContainer>
            <label htmlFor='email' className='a11y-hidden'>
              이메일
            </label>
            <Input
              value={userData.user.email}
              onChange={updateUserData}
              onBlur={validateEmailWithAPI}
              type='email'
              id='email'
              name='email'
              placeholder='이메일을 설정해 주세요.'
              required
              aria-required='true'
            />
            <AlertParagraph role='alert'>{errorMessages.emailError}</AlertParagraph>
            <label htmlFor='password' className='a11y-hidden'>
              비밀번호
            </label>
            <Input
              value={userData.user.password}
              onChange={updateUserData}
              onBlur={checkPasswordLength}
              type='password'
              id='password'
              name='password'
              placeholder='비밀번호를 설정해 주세요.'
              required
              aria-required='true'
            />
            <AlertParagraph role='alert'>{errorMessages.passwordError}</AlertParagraph>
            <NextBtn $isfilled={isFilledNext}>다음</NextBtn>
          </Form>
        </Container>
      )}
    </>
  );
};

export default SignUp;
