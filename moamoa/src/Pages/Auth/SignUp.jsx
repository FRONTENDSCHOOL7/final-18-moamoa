import React from 'react';
import InputErrorMessagesReducer from '../../Hooks/Auth/InputErrorMessagesReducer.jsx';
import useSignUp from '../../Hooks/Auth/useSignUp.jsx';
import UploadFile from '../../Assets/images/upload-file.png';
import styled, { css } from 'styled-components';
import {
  LoginAndJoinContainer,
  Form,
  CommonInput,
  StyledErrorMsg,
  CommonBtn,
} from '../../Components/Common/AuthFormStyle.jsx';

const SignUp = () => {
  const {
    userData,
    userType,
    pageTransition,
    userTypeErrorMessage,
    signUpFailMessage,
    imgSrc,
    handleChangeImage,
    updateUserData,
    updateUserType,
    clickNextButton,
    submitSignUpForm,
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
        <LoginAndJoinContainer>
          <h2 aria-live='polite'>프로필 설정</h2>
          <ProfileInfo>나중에 언제든지 변경할 수 있습니다.</ProfileInfo>
          <ProfileForm onSubmit={submitSignUpForm}>
            <ImgContainer>
              <ImgLabel htmlFor='profileImg'>
                <ProfileImg src={imgSrc.profile.url} alt={imgSrc.profile.alt} id='imagePre' />
              </ImgLabel>
              <input
                type='file'
                id='profileImg'
                name='image'
                accept='image/*'
                className='a11y-hidden'
                onChange={handleChangeImage}
              />
            </ImgContainer>
            <TextContainer>
              <TextLabel htmlFor='userNameInput'>사용자 이름</TextLabel>
              <TextInput
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
              <StyledErrorMsg role='alert'>{errorMessages.userNameError}</StyledErrorMsg>
              <TextLabel htmlFor='userIdInput'>계정 ID</TextLabel>
              <TextInput
                value={userData.user.accountname}
                onChange={updateUserData}
                type='text'
                id='userIdInput'
                name='accountname'
                placeholder='영문, 숫자, 특수문자(,), (_)만 사용 가능합니다.'
                minLength={2}
                maxLength={15}
                onBlur={validateAccountNameWithAPI}
                required
                aria-required='true'
              />
              <StyledErrorMsg role='alert'>{errorMessages.accountNameError}</StyledErrorMsg>
              <TextLabel htmlFor='userIntroInput'>소개</TextLabel>
              <TextInput
                value={userData.user.intro}
                onChange={updateUserData}
                type='text'
                id='userIntroInput'
                name='intro'
                placeholder={
                  userType === 'organization'
                    ? '자신과 홍보할 행사에 대해 소개해 주세요!'
                    : '자신에 대해 소개해 주세요!'
                }
                minLength={2}
                maxLength={50}
                onBlur={checkIntroductionLength}
                required
                aria-required='true'
              />
              <StyledErrorMsg role='alert'>{errorMessages.introductionError}</StyledErrorMsg>
              <StyledErrorMsg role='alert'>{signUpFailMessage}</StyledErrorMsg>
            </TextContainer>
            <ProfileButton $isfilled={isFilledSubmit} type='submit'>
              모아모아 시작하기
            </ProfileButton>
          </ProfileForm>
        </LoginAndJoinContainer>
      ) : (
        <LoginAndJoinContainer>
          <h2 aria-live='polite'>이메일로 회원가입</h2>
          <Form onSubmit={clickNextButton}>
            <SelectUserType>
              <h3 id='userTypeTitle'>회원분류선택</h3>
              <SelectUserBtnContainer>
                <SelectUserBtn
                  type='button'
                  name='individual'
                  onClick={updateUserType}
                  aria-pressed={userType === 'individual'}
                  aria-describedby='userTypeTitle'
                >
                  일반 회원
                </SelectUserBtn>
                <SelectUserBtn
                  type='button'
                  name='organization'
                  onClick={updateUserType}
                  aria-pressed={userType === 'organization'}
                  aria-describedby='userTypeTitle'
                >
                  기업 및 기관
                </SelectUserBtn>
              </SelectUserBtnContainer>
              <StyledErrorMsg role='alert'>{userTypeErrorMessage}</StyledErrorMsg>
            </SelectUserType>
            <label htmlFor='email' className='a11y-hidden'>
              이메일
            </label>
            <CommonInput
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
            <StyledErrorMsg role='alert'>{errorMessages.emailError}</StyledErrorMsg>
            <label htmlFor='password' className='a11y-hidden'>
              비밀번호
            </label>
            <CommonInput
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
            <StyledErrorMsg role='alert'>{errorMessages.passwordError}</StyledErrorMsg>
            <JoinBtn $isfilled={isFilledNext}>다음</JoinBtn>
          </Form>
        </LoginAndJoinContainer>
      )}
    </>
  );
};

const COLORS = {
  primary: '#87b7e4',
  darkgray: '#767676',
  // lightgray: '#dbdbdb', //명암비: 1.38 // https://sitero.co.kr/contrast
};

const BtnHoverStyle = css`
  &:hover {
    background-color: ${COLORS.primary};
    color: white;
    border-color: ${COLORS.primary};
  }
`;

const SelectUserType = styled.div`
  text-align: left;
  margin-bottom: 25px;

  h3 {
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 12px;
  }
`;

const SelectUserBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SelectUserBtn = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => (props['aria-pressed'] ? 'white' : `${COLORS.darkgray}`)};
  background-color: ${(props) => (props['aria-pressed'] ? `${COLORS.primary}` : 'transparent')};
  border: ${(props) =>
    props['aria-pressed'] ? `1.5px solid ${COLORS.primary}` : `1.5px solid ${COLORS.darkgray}`};
  transition: all 0.2s ease-in-out;
  border-radius: 32px;
  padding: 11px 43px;

  ${BtnHoverStyle}
`;

const JoinBtn = styled(CommonBtn)`
  margin: 26px 0 80px 0;
`;

// 프로필 설정
const ProfileInfo = styled.p`
  text-align: center;
  color: ${COLORS.darkgray};
  font-size: 13px;
  font-weight: 400;
  margin: 12px 0 30px 0;
`;

const ProfileForm = styled.form`
  padding: 0 34px;
  background-color: #fff;
  margin-bottom: 60px;
`;

const ImgContainer = styled.div`
  width: 110px;
  height: 110px;
  margin: 0 auto 35px;
  position: relative;
`;

const ImgLabel = styled.label`
  display: block;
  width: 110px;
  height: 110px;
  position: relative;
  border-radius: 50%;
  cursor: pointer;

  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    right: -10px;
    bottom: 0;
    background: url(${UploadFile}) 0 0 / cover;
  }
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextInput = styled(CommonInput)`
  background-image: none;
  padding: 5px 0;
`;

const TextLabel = styled.label`
  color: ${COLORS.darkgray};
  margin-bottom: 4px;
  font-size: 14px;

  &:nth-of-type(2),
  &:nth-of-type(3) {
    margin-top: 23px;
  }
`;

const ProfileButton = styled(CommonBtn)`
  margin: 35px 0 80px 0;
  width: 100%;
`;

export default SignUp;
