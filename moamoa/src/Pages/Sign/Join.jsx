import React from 'react';
import useJoin from '../../Hooks/Sign/useJoin.jsx';
import { uploadImage } from '../../API/Image/ImageAPI.jsx';
import UploadFile from '../../Assets/images/upload-file.png';
import DefaultProfile from '../../Assets/images/profile-img.svg';
import styled from 'styled-components';
import {
  LoginAndJoinContainer,
  Form,
  CommonInput,
  StyledErrorMsg,
  CommonBtn,
} from '../../Components/Common/FormLoginAndJoin';

const Join = () => {
  const {
    pageTransition,
    imgSrc,
    setImgSrc,
    userType,
    userInfo,
    setUserInfo,
    accountInfoMsg,
    introInfoMsg,
    emailError,
    passwordError,
    errorMessage,
    goNext,
    handleInputChange,
    handleUserType,
    handlePasswordValid,
    handleEmailOnBlur,
    handleAccountNameValid,
    handleIntroValid,
    handleSubmit,
  } = useJoin();

  const handleChangeImage = async (e) => {
    const imageFile = e.target.files[0];
    const response = await uploadImage(imageFile);
    setUserInfo({
      ...userInfo,
      user: {
        ...userInfo.user,
        image: `https://api.mandarin.weniv.co.kr/${response.data.filename}`,
      },
    });
    setImgSrc(`https://api.mandarin.weniv.co.kr/${response.data.filename}`);
  };

  return (
    <>
      <h1 className='a11y-hidden'>이메일로 회원가입 및 프로필 설정</h1>
      {pageTransition ? (
        <LoginAndJoinContainer>
          <h2>프로필 설정</h2>
          <ProfileInfo>나중에 언제든지 변경할 수 있습니다.</ProfileInfo>
          <ProfileForm onSubmit={handleSubmit}>
            <ImgContainer>
              <ImgLabel htmlFor='profileImg'>
                <ProfileImg src={imgSrc ? imgSrc : DefaultProfile} alt='' srcSet='' id='imagePre' />
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
                value={userInfo.user.username}
                onChange={handleInputChange}
                type='text'
                id='userNameInput'
                name='username'
                placeholder='2~10자 이내여야 합니다.'
                minLength={2}
                maxLength={10}
              />
              <TextLabel htmlFor='userIdInput'>계정 ID</TextLabel>
              <TextInput
                value={userInfo.user.accountname}
                onChange={handleInputChange}
                type='text'
                id='userIdInput'
                name='accountname'
                placeholder='영문, 숫자, 특수문자(,), (_)만 사용 가능합니다.'
                minLength={2}
                maxLength={15}
                onBlur={handleAccountNameValid}
              />
              <StyledErrorMsg>{accountInfoMsg}</StyledErrorMsg>
              {(errorMessage === '*영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.' ||
                errorMessage === '*이미 사용중인 계정 ID입니다.') && (
                <StyledErrorMsg>{errorMessage}</StyledErrorMsg>
              )}
              <TextLabel htmlFor='userIntroInput'>소개</TextLabel>
              <TextInput
                value={userInfo.user.intro}
                onChange={handleInputChange}
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
                onBlur={handleIntroValid}
              />
              <StyledErrorMsg>{introInfoMsg}</StyledErrorMsg>
            </TextContainer>
            <ProfileButton
              type='submit'
              disabled={
                userInfo.user.username.length < 2 ||
                !userInfo.user.accountname ||
                !userInfo.user.intro
              }
            >
              모아모아 시작하기
            </ProfileButton>
          </ProfileForm>
        </LoginAndJoinContainer>
      ) : (
        <LoginAndJoinContainer>
          <h2>이메일로 회원가입</h2>
          <Form onSubmit={goNext}>
            <SelectUserType>
              <h3>회원분류선택</h3>
              <SelectUserBtnContainer>
                <SelectUserBtn
                  type='button'
                  name='individual'
                  onClick={handleUserType}
                  selected={userType === 'individual'}
                >
                  일반 회원
                </SelectUserBtn>
                <SelectUserBtn
                  type='button'
                  name='organization'
                  onClick={handleUserType}
                  selected={userType === 'organization'}
                >
                  기업 및 기관
                </SelectUserBtn>
              </SelectUserBtnContainer>
            </SelectUserType>
            <CommonInput
              value={userInfo.user.email}
              onChange={handleInputChange}
              onBlur={handleEmailOnBlur}
              type='email'
              name='email'
              placeholder='이메일을 설정해 주세요.'
              required
            />
            <StyledErrorMsg>{emailError}</StyledErrorMsg>
            <CommonInput
              value={userInfo.user.password}
              onChange={handleInputChange}
              onBlur={handlePasswordValid}
              type='password'
              name='password'
              placeholder='비밀번호를 설정해 주세요.'
              required
            />
            <StyledErrorMsg>{passwordError}</StyledErrorMsg>
            <JoinBtn
              disabled={
                !userType ||
                !userInfo.user.email ||
                !userInfo.user.password ||
                emailError !== '*사용 가능한 이메일 입니다.' ||
                passwordError
              }
            >
              다음
            </JoinBtn>
          </Form>
        </LoginAndJoinContainer>
      )}
    </>
  );
};

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

const SelectUserBtn = styled(CommonBtn)`
  color: ${(props) => (props.selected ? 'white' : '#87b7e4')};
  background-color: ${(props) => (props.selected ? '#87b7e4' : 'white')};
  border: 2px solid #87b7e4;
  padding: 11px 49px;
`;

const JoinBtn = styled(CommonBtn)`
  margin: 26px 0 80px 0;
`;

// 프로필 설정
const ProfileInfo = styled.p`
  text-align: center;
  color: #767676;
  font-size: 12px;
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
  color: #767676;
  margin-bottom: 4px;

  &:nth-of-type(2),
  &:nth-of-type(3) {
    margin-top: 16px;
  }
`;

const ProfileButton = styled(CommonBtn)`
  margin: 26px 0 80px 0;
  width: 100%;
`;

export default Join;
