import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  height: 48px;
  min-height: 48px;
  max-height: 48px;
  width: 390px;
  justify-content: space-between;
  border-bottom: 1px solid #dbdbdb;
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

export const a11yHidden = `
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  width: 1px
	height: 1px;
	margin: -1px;
  overflow: hidden;
	padding: 0;
	position: absolute;
`;

export const HiddenH1 = styled.h1`
  ${a11yHidden}
`;

export const UploadPostBox = styled.div`
  flex: 1;
  padding: 16px;
  position: relative;
`;

export const ProfileImg = styled.div`
  width: 42px;
  height: 42px;

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

export const ImgPre = styled.div`
  height: 228px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
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
