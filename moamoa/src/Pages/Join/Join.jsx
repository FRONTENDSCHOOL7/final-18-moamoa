import React from 'react';
import { uploadImage } from '../../API/Img/UploadImageAPI';
import useJoin from '../../Hooks/Sign/useJoin.jsx';

const Join = () => {
  const {
    pageTransition,
    handleSubmit,
    imgSrc,
    setImgSrc,
    userInfo,
    userType,
    setUserInfo,
    handleInputChange,
    handleUserType,
    handleEmailOnBlur,
    goNext,
    emailError,
    passwordError,
    errorMessage,
    handlePasswordValid,
  } = useJoin();

  const handleChangeImage = async (e) => {
    const imageFile = e.target.files[0];
    const response = await uploadImage(imageFile);
    setUserInfo({ ...userInfo, user: { ...userInfo.user, image: response } });
    setImgSrc(response);
  };

  return (
    <>
      {pageTransition ? (
        <section>
          <h2>프로필 설정</h2>
          <p>나중에 언제든지 변경할 수 있습니다.</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor='profileImg'>
              <img src={imgSrc} alt='' srcSet='' id='imagePre' />
            </label>
            <input
              type='file'
              id='profileImg'
              name='image'
              accept='image/*'
              className='ir'
              onChange={handleChangeImage}
            />
            <label htmlFor='userNameInput'>사용자 이름</label>
            <input
              value={userInfo.user.username}
              onChange={handleInputChange}
              type='text'
              id='userNameInput'
              name='username'
              placeholder='2~10자 이내여야 합니다.'
            />
            <label htmlFor='userIdInput'>계정 ID</label>
            <input
              value={userInfo.user.accountname}
              onChange={handleInputChange}
              type='text'
              id='userIdInput'
              name='accountname'
              placeholder='영문, 숫자, 특수문자(,), (_)만 사용 가능합니다.'
            />
            {errorMessage === '영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.' && errorMessage}
            {errorMessage === '이미 사용중인 계정 ID입니다.' && errorMessage}
            <label htmlFor='userIntroInput'>소개</label>
            <input
              value={userInfo.user.intro}
              onChange={handleInputChange}
              type='text'
              id='userIntroInput'
              name='intro'
              placeholder={
                userType === 'organization'
                  ? '자신과 홍보할 행사에 대해 소개해 주세요.'
                  : '자신에 대해 소개해 주세요.'
              }
            />
            <button
              type='submit'
              disabled={
                !userInfo.user.username || !userInfo.user.accountname || !userInfo.user.intro
              }
            >
              모아모아 시작하기
            </button>
          </form>
        </section>
      ) : (
        <section>
          <h2>이메일로 회원가입</h2>
          <form onSubmit={goNext}>
            <h3>회원분류선택</h3>
            <div>
              <button type='button' name='individual' onClick={handleUserType}>
                일반 회원
              </button>
              <button type='button' name='organization' onClick={handleUserType}>
                기업 및 기관
              </button>
            </div>
            <input
              value={userInfo.user.email}
              onChange={handleInputChange}
              onBlur={handleEmailOnBlur}
              type='email'
              name='email'
              placeholder='이메일을 설정해 주세요.'
              required
            />
            {emailError}
            <input
              value={userInfo.user.password}
              onChange={handleInputChange}
              onBlur={handlePasswordValid}
              type='password'
              name='password'
              placeholder='비밀번호를 설정해 주세요.'
              required
            />
            {passwordError}
            <button
              disabled={
                !userType ||
                !userInfo.user.email ||
                !userInfo.user.password ||
                emailError !== '사용 가능한 이메일 입니다.' ||
                passwordError
              }
            >
              다음
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default Join;
