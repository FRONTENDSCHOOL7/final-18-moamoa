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
    padding: 0;
    padding-left: 150px;
    padding-right: 30px;
  }

  @media (min-width: 1200px) {
    padding-left: 270px;
  }
`;

export const ProfileTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    width: ${(props) => (props.width ? `${props.width}px` : '90px')};
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
  textarea {
    resize: none;
    box-sizing: border-box;
    width: 100%;

    overflow-y: hidden;

    border: none;
    font-size: 1.4rem;
    outline: none;
  }
`;

export const ImgPre = styled.div`
  height: 228px;
  position: relative;
  margin: 8px 0;
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

export const ImgIconBtn = styled.div`
  margin: 8px 0;
  border: 1px solid #767676;
  border-radius: 35px;
  bottom: 16px;
  width: 17rem;
  transition: all 0.2s ease-in-out;
  label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 1.4rem;
    cursor: pointer;
    padding: 5px 0;
    p {
      color: #767676;
    }

    .btnHover {
      display: none;
    }

    &:hover {
      .default {
        display: none;
      }
      .btnHover {
        display: block;
      }
    }
  }
  &:hover {
    background-color: #2e2c39;
    border: 1px solid #2e2c39;
    p {
      color: white;
    }
  }
`;
