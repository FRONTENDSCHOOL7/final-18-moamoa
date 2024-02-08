import styled from 'styled-components';

export const HeaderContainer = styled.header`
  z-index: 10;
  display: flex;
  height: 48px;
  min-height: 48px;
  max-height: 48px;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid #dbdbdb;
  background-color: #fff;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;

  position: fixed;

  img {
    cursor: pointer;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export const UploadPostBox = styled.div`
  flex: 1;
  padding: 16px;
  position: relative;
  background-color: #fff;

  margin-top: 48px;

  @media (min-width: 768px) {
    margin-top: 80px;
    padding-left: 150px;
    padding-right: 30px;
  }

  @media (min-width: 1200px) {
    padding-left: 270px;
  }
`;

export const ProfileImg = styled.div`
  width: 4.2rem;
  height: 4.2rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%; // 원형으로 보이게 하려면 추가
  }
`;

export const TextArea = styled.div`
  padding: 10px 0;

  textarea {
    resize: none;
    box-sizing: border-box;
    width: 100%;
    border-radius: 2px;
    padding: 8px;
    overflow-y: hidden;

    border: 2px solid #2e2c39;

    font-size: 1.4rem;
  }
`;

export const ImgPre = styled.div`
  height: 228px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  margin-bottom: 10px;
`;

export const XButton = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
`;

export const InputImgIcon = styled.div`
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
